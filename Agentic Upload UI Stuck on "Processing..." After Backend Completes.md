# Agentic Upload UI Stuck on "Processing..." After Backend Completes

## Problem

When using the agentic upload flow (LLM auto-classification), the UI stays stuck on the "Processing..." screen with an indeterminate progress bar, even after the backend has fully completed file saving, DB insertion, and sent the final SSE events (`result` + `done`).

The non-agentic upload flow and the chat SSE flow both work correctly.

## Root Causes

### 1. Heartbeat interval cleared AFTER `res.end()` (backend)

**File:** `app/backend/src/routes/upload.routes.ts`

The heartbeat `setInterval` was cleared in a `finally` block that ran after `sendSseDone(res)` (which calls `res.end()`). This meant:

- The heartbeat timer could fire between `sendSseEvent(res, 'result', ...)` and `sendSseDone(res)`, writing to the response during the critical final-event window.
- The active `setInterval` kept the Node.js event loop alive, which could delay the internal flush of `res.write()` buffers before `res.end()` closed the socket.
- The chat route (`chat.routes.ts`) correctly clears the heartbeat *before* `sendSseDone` -- the upload route didn't follow this pattern.

### 2. ReadableStream reader never cancelled (frontend)

**File:** `app/frontend/src/app/core/api/upload.api.ts`

After the `done` or `error` SSE event was received, the parser called `resolve(); return;` but never cancelled the `ReadableStream` reader. This left the underlying HTTP connection in a half-open state:

- The browser kept the fetch connection alive, waiting for the reader to be released.
- The server may not have seen the connection close, keeping `closed = false` on the backend.
- In environments with connection pooling or proxies (like the Angular dev server proxy), the lingering reader could prevent proper cleanup.

### 3. Silent JSON parse failures (frontend)

**File:** `app/frontend/src/app/core/api/upload.api.ts`

The SSE parser used `catch { /* skip malformed */ }` to silently drop events that failed `JSON.parse`. If the `result` event data arrived split across chunks in an unusual way, or contained unexpected content, it would be silently lost with no diagnostic information.

### 4. No idle timeout (frontend)

**File:** `app/frontend/src/app/core/api/upload.api.ts`

If the backend hung (e.g., the LLM agent never called `save_uploaded_files`, or the LLM API timed out after 5 minutes), the frontend had no mechanism to detect the stall and recover. The `reader.read()` call would block indefinitely.

### 5. Missing `res.end()` on client disconnect (backend)

**File:** `app/backend/src/routes/upload.routes.ts`

When the `closed` flag was true (client disconnected), neither `sendSseDone` nor `sendSseError` was called, and `res.end()` was never invoked. This left the server-side socket in a half-open state.

### 6. Error `.catch()` could overwrite success (frontend)

**File:** `app/frontend/src/app/state/upload.store.ts`

The promise `.catch()` handler always set `status: 'error'`, even if the upload had already succeeded (status was `'success'`). If a timeout or cleanup error occurred after a successful upload, it could flip the UI back to an error state.

## Fixes Applied

### Backend (`upload.routes.ts`)

- Clear the heartbeat interval **before** sending `result` and `done` events.
- Call `res.end()` in both the success and error paths when `closed` is true.
- Match the pattern used by `chat.routes.ts`.

### Frontend (`upload.api.ts`)

- Add a `cleanup()` helper that cancels the reader and clears timers.
- Call `cleanup()` on every exit path: `done`/`error` event, stream end, abort, and rejection.
- Add an idle timeout (90 seconds) that rejects the promise if no data arrives (heartbeat or events).
- Log SSE parse failures with `console.warn` instead of silently swallowing them.

### Frontend (`upload.store.ts`)

- Guard the `.catch()` handler with `if (store.status() === 'uploading')` so it doesn't overwrite a successful state.
- Add explicit handling for `status` events with `phase: 'complete'` (documented as a progress event for now; the real transition comes from `result`).

## Files Changed

| File | Change |
|------|--------|
| `app/backend/src/routes/upload.routes.ts` | Heartbeat cleanup ordering, `res.end()` safety nets |
| `app/frontend/src/app/core/api/upload.api.ts` | Reader cleanup, idle timeout, parse error logging |
| `app/frontend/src/app/state/upload.store.ts` | Guard `.catch()`, explicit `status:complete` handling |

## Verification

1. `npx tsc --noEmit -p backend/tsconfig.json` -- backend compiles cleanly
2. `npx ng build` (or `npx tsc --noEmit`) -- frontend compiles cleanly
3. Manual test: upload a .md file with agentic mode enabled
   - UI should transition from "Processing..." to "Upload Complete"
   - Progress log should show tool start/end events
   - Console should NOT show any `[upload-api]` warnings
4. Edge cases:
   - Cancel during upload -- should return to idle state
   - Backend timeout (>90s) -- should show error message
   - Client disconnect during processing -- server should clean up properly

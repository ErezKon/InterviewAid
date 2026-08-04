import { Router } from 'express';
import multer from 'multer';
import { uploadBodySchema } from '../types/api.types.js';
import { handleUpload } from '../services/upload.service.js';
import { initSse, sendSseEvent, sendSseDone, sendSseError, startHeartbeat } from '../services/sse.service.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('upload');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
      cb(null, true);
    } else {
      cb(new Error('Only .md files are accepted'));
    }
  },
});

export const uploadRouter = Router();

uploadRouter.post('/upload', upload.array('files', 20), async (req, res, next) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({
        error: { code: 'NO_FILES', message: 'At least one .md file is required' },
      });
      return;
    }

    const meta = uploadBodySchema.parse(req.body);
    log.info(`Upload request: type=${meta.type}, agentic=${meta.agentic}, files=${files.length}`);

    if (meta.agentic) {
      // SSE streaming for agentic flow
      initSse(res);
      const heartbeat = startHeartbeat(res);
      let closed = false;
      req.on('close', () => { closed = true; clearInterval(heartbeat); });

      try {
        const result = await handleUpload(files, meta, (event, data) => {
          if (!closed) sendSseEvent(res, event, data);
        });
        // Clear heartbeat BEFORE sending final events (match chat.routes.ts
        // pattern) — prevents the interval from keeping the event loop alive
        // and ensures no heartbeat writes race with res.end().
        clearInterval(heartbeat);
        if (!closed) {
          sendSseEvent(res, 'result', result);
          sendSseDone(res);
        } else {
          // Client disconnected during processing — end the response to
          // release the socket and prevent half-open connections.
          try { res.end(); } catch { /* already destroyed */ }
        }
      } catch (err: any) {
        clearInterval(heartbeat);
        log.error('Agentic upload failed', err);
        if (!closed) {
          sendSseError(res, err.message ?? 'Upload failed');
        } else {
          try { res.end(); } catch { /* already destroyed */ }
        }
      }
    } else {
      // Synchronous non-agentic flow
      const result = await handleUpload(files, meta);
      res.json({ data: result });
    }
  } catch (err) {
    next(err);
  }
});

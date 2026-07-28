# 2627. Debounce

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/debounce](https://leetcode.com/problems/debounce)
**Companies:** Confluent, Meta

---

## Problem Description

Implement a debounced function that delays invoking `fn` until `t` milliseconds after the last call. If called again within `t`, reset the timer.

---

## Examples

| Code | Behavior |
|------|----------|
| `const debounced = debounce(() => console.log('run'), 100);
debounced(); debounced(); setTimeout(debounced, 50);` | Only one `run` is logged ~150 ms after the first call, because the timer resets on each invocation within 100 ms. |
| `debounce(alert, 200)('hi');` | `alert('hi')` fires after 200 ms if no further calls occur. |

*Explanation:* The function returns a wrapper that clears any existing timer and starts a new one on each call.

---

## Approach

```
FUNCTION debounce(fn, t):
    timer ← NULL
    RETURN FUNCTION(...args):
        IF timer ≠ NULL:
            CLEAR_TIMEOUT(timer)
        timer ← SET_TIMEOUT(() → CALL fn WITH args, t)
```

---

## Walkthrough

1. Call `debounce` → creates `timer = NULL` and returns wrapper.
2. First invocation of wrapper:
   - `timer` is `NULL`, so no clear.
   - `SET_TIMEOUT` schedules `fn` after `t` ms, stores handle in `timer`.
3. Second invocation before `t` ms:
   - `CLEAR_TIMEOUT(timer)` cancels previous schedule.
   - New `SET_TIMEOUT` reschedules `fn` for another `t` ms from now.
4. If no further calls, the last scheduled timeout finally executes `fn`.

Thus only the last call within any `t`‑millisecond window results in execution.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) per wrapper call (clear/set timer) |
| **Space** | O(1) – only a timer handle is stored |

---

## Follow-Up Questions

* How would you implement a leading‑edge debounce (invoke immediately, then ignore calls for `t` ms)?
* How can you adapt this pattern for server‑side rate‑limiting?
* What changes are needed to support cancellation of the pending call?

---

## Key Takeaway

> **Debounce = clear + reset timer on each call. Only the last invocation within the delay window actually fires. Classic JS closure + setTimeout pattern.**

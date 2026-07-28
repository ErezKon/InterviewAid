# 359. Logger Rate Limiter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/logger-rate-limiter](https://leetcode.com/problems/logger-rate-limiter)
**Companies:** Amazon, Appfolio, Apple, Atlassian, Bloomberg, Cloudflare, Deliveroo, Docusign, Google, Grammarly, Intuit, Meta, Microsoft, Netflix, Oracle, Palo Alto Networks, Patreon, Reddit, Roblox, Verily, Waymo

---

## 1. Problem Description

Design a logger that receives messages with timestamps and returns true if the message should be printed (i.e., wasn't printed in the last 10 seconds).

---

## 2. Examples

**Example 1:**
```
logger.shouldPrintMessage(1, "foo") → true   // printed
logger.shouldPrintMessage(2, "bar") → true   // printed
logger.shouldPrintMessage(3, "foo") → false  // 3 - 1 < 10, suppressed
logger.shouldPrintMessage(11, "foo") → true  // 11 - 1 >= 10, printed again
```

**Example 2:**
```
logger.shouldPrintMessage(0, "msg") → true
logger.shouldPrintMessage(5, "msg") → false
logger.shouldPrintMessage(10, "msg") → false
logger.shouldPrintMessage(10, "other") → true
```

---

## 3. Approach: Hash Map — O(1) ✅

```text
CLASS Logger:
    CONSTRUCTOR:
        lastPrinted ← {}    // message → timestamp

    FUNCTION shouldPrintMessage(timestamp, message):
        IF message NOT IN lastPrinted OR timestamp - lastPrinted[message] >= 10:
            lastPrinted[message] ← timestamp
            RETURN true
        RETURN false
```

---

## 4. Walkthrough

1. Initialize an empty hash map `lastPrinted`.
2. For each incoming `(timestamp, message)` call:
   - If `message` is not in the map or the difference between `timestamp` and the stored timestamp is at least 10, update the map with the current timestamp and return `true` (print).
   - Otherwise, return `false` (suppress).
3. The map always holds the most recent printed timestamp for each distinct message.

---

## 5. Complexity Analysis

- **Time:** O(1) per `shouldPrintMessage` call – constant‑time hash‑map look‑up and update.
- **Space:** O(M) where M is the number of distinct messages that have been printed within the last 10 seconds (worst‑case all unique messages).

---

## 6. Follow-Up Questions

- How would you adapt the solution to limit memory usage, e.g., by discarding entries older than 10 seconds?
- Can you implement the logger using a sliding‑window queue instead of a hash map?
- How would you handle messages arriving out of order?

---

## 7. Key Takeaway

> Simple hash map stores last‑printed timestamp per message. For memory‑constrained environments, use a circular buffer or LRU cache to limit stored messages.

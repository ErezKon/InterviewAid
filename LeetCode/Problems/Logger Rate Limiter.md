# 359. Logger Rate Limiter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/logger-rate-limiter](https://leetcode.com/problems/logger-rate-limiter)
**Companies:** Amazon, Appfolio, Apple, Atlassian, Bloomberg, Cloudflare, Deliveroo, Docusign, Google, Grammarly, Intuit, Meta, Microsoft, Netflix, Oracle, Palo Alto Networks, Patreon, Reddit, Roblox, Verily, Waymo

---

## 1. Problem Description

Design a logger that receives messages with timestamps and returns true if the message should be printed (i.e., wasn't printed in the last 10 seconds).

---

## 2. Approach: Hash Map — O(1) ✅

```
CLASS Logger:
    CONSTRUCTOR:
        lastPrinted = {}    // message → timestamp

    FUNCTION shouldPrintMessage(timestamp, message):
        IF message NOT IN lastPrinted OR timestamp - lastPrinted[message] >= 10:
            lastPrinted[message] = timestamp
            RETURN true
        RETURN false
```

| Time | Space |
|------|-------|
| O(1) per call | O(M) for M unique messages |

---

## 3. Key Takeaway

> Simple hash map stores last-printed timestamp per message. For memory-constrained environments, use a circular buffer or LRU cache to limit stored messages.

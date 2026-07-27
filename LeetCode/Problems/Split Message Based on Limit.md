# 2468. Split Message Based on Limit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-message-based-on-limit](https://leetcode.com/problems/split-message-based-on-limit)
**Companies:** Amazon, Databricks, Faire, Tiktok, Uber

---

```
// Try each number of parts k = 1, 2, ...
// For k parts, suffix is "<i/k>" for each part i
// Calculate total overhead, check if message fits
// Return first valid split

FUNCTION splitMessage(message, limit):
    FOR k ← 1 TO len(message):
        overhead = SUM(len(str(i)) + len(str(k)) + 3 for i in range(1, k+1))
        IF overhead + len(message) <= limit * k:
            // Valid split, construct parts
            ...
```

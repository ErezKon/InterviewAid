# 1124. Longest Well-Performing Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-well-performing-interval](https://leetcode.com/problems/longest-well-performing-interval)
**Companies:** Infosys, Netapp

---

## 1. Problem Description

A "well-performing interval" has strictly more tiring days (hours > 8) than non-tiring days. Find the longest one.

---

## 2. Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION longestWPI(hours):
    score = 0    // +1 for tiring, -1 for non-tiring
    first = {}   // first occurrence of each score
    maxLen = 0

    FOR i ← 0 TO n - 1:
        score += 1 IF hours[i] > 8 ELSE -1
        IF score > 0:
            maxLen = i + 1
        ELSE:
            IF score - 1 IN first:
                maxLen = MAX(maxLen, i - first[score - 1])
            IF score NOT IN first:
                first[score] = i

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Convert to +1/-1 prefix sum. If sum > 0, entire prefix works. Otherwise, find earliest index where prefix sum was `score - 1` (so the subarray between has sum > 0).

# 594. Longest Harmonious Subsequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-harmonious-subsequence](https://leetcode.com/problems/longest-harmonious-subsequence)
**Companies:** Amazon, Bloomberg, Google, Liveramp, Meta, Microsoft, Zs Associates

---

## 1. Problem Description

Find the longest subsequence where `max - min = 1` (exactly).

---

## 2. Approach: Counter — O(n) ✅

```
FUNCTION findLHS(nums):
    count = Counter(nums)
    maxLen = 0
    FOR num IN count:
        IF num + 1 IN count:
            maxLen = MAX(maxLen, count[num] + count[num + 1])
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> A harmonious subsequence contains only two consecutive values. Count each value, then for each `x`, check if `x+1` exists and sum their counts.

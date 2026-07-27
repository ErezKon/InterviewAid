# 2501. Longest Square Streak in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-square-streak-in-an-array](https://leetcode.com/problems/longest-square-streak-in-an-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## 1. Problem Description

Find the longest subsequence where each element is the square of the previous one.

---

## 2. Approach: Hash Set + Chain Following — O(n log log M) ✅

```
FUNCTION longestSquareStreak(nums):
    s = SET(nums)
    maxLen = -1
    FOR num IN sorted(nums):
        curr = num; length = 0
        WHILE curr IN s:
            length += 1; curr = curr * curr
        IF length >= 2: maxLen = MAX(maxLen, length)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n log log M) | O(n) |

---

## 3. Key Takeaway

> Chain grows very fast (squaring), so each chain is at most ~5-6 elements long. Put all numbers in a set and follow the chain from each starting point.

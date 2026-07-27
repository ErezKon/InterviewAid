# 2780. Minimum Index of a Valid Split

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

An element is **dominant** if it appears more than half the time. Find the minimum split index so that the dominant element is the same in both halves.

## Approach: Boyer-Moore + Scan — O(n) ✅

```
FUNCTION minimumIndex(nums):
    // Find dominant element (Boyer-Moore)
    // Try each split point, check if dominant in both halves
    dom = majority element; total = nums.count(dom)
    left = 0
    FOR i ← 0 TO n - 2:
        IF nums[i] == dom: left += 1
        IF left * 2 > i + 1 AND (total - left) * 2 > n - i - 1:
            RETURN i
    RETURN -1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> The dominant element of the whole array must be dominant in both halves. Boyer-Moore finds it in O(n), then a single scan finds the earliest valid split.

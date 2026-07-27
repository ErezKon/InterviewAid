# 2811. Check if it is Possible to Split Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-possible-to-split-array](https://leetcode.com/problems/check-if-it-is-possible-to-split-array)
**Companies:** Moneylion

---

## 1. Problem Description

Given an array `nums` and integer `m`, you can split the array by removing a subarray of length ≥ 2 whose sum ≥ `m` (or the full array has length ≤ 2). Determine if you can split it down to single elements.

---

## 2. Key Insight

> If `n ≤ 2`, always true. Otherwise, we need at least one pair of adjacent elements with sum ≥ `m`. That pair can always be the last to split, and everything else can be peeled off one element at a time.

---

## 3. Approach: Check Adjacent Pairs — O(n) ✅

```
FUNCTION canSplitArray(nums, m):
    IF len(nums) <= 2: RETURN true
    FOR i FROM 0 TO len(nums) - 2:
        IF nums[i] + nums[i+1] >= m:
            RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> The splitting problem reduces to: does any adjacent pair sum to ≥ `m`? If so, we can always isolate elements by peeling from the ends, keeping that valid pair until last.

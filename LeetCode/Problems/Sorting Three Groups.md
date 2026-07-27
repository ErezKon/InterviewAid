# 2826. Sorting Three Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sorting-three-groups](https://leetcode.com/problems/sorting-three-groups)
**Companies:** Uipath

---

## Problem Description

Given an array `nums` where each element is 1, 2, or 3, find the minimum number of operations (change any element to 1, 2, or 3) to make the array non-decreasing.

### Examples

- **Input:** `nums = [2,1,3,2,1]` → **Output:** `3`
- **Input:** `nums = [1,3,2,1,3,3]` → **Output:** `2`

## Approach: LIS (Longest Non-Decreasing Subsequence) — O(n log n) ✅

**Key Insight:** The minimum changes = n − length of longest non-decreasing subsequence. Since values are only 1,2,3, we can use patience sorting.

```
FUNCTION minimumOperations(nums):
    // Find longest non-decreasing subsequence
    tails = []
    FOR num IN nums:
        // Binary search for first tail > num (upper bound)
        pos = upper_bound(tails, num)
        IF pos == len(tails):
            tails.APPEND(num)
        ELSE:
            tails[pos] = num
    RETURN len(nums) - len(tails)
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |

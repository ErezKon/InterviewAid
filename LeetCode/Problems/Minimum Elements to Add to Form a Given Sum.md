# 1785. Minimum Elements to Add to Form a Given Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum](https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum)
**Companies:** Twitter

---

## Problem Description

Given an array `nums`, an integer `limit`, and an integer `goal`, add the minimum number of elements (each with absolute value ≤ `limit`) so that the array sums to `goal`.

## Key Insight

> The deficit is `|goal - sum(nums)|`. Each added element contributes at most `limit` toward closing the gap. Answer = `ceil(deficit / limit)`.

## Approach: Math — O(n) ✅

```
FUNCTION minElements(nums, limit, goal):
    diff ← ABS(goal - SUM(nums))
    RETURN CEIL(diff / limit)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Greedy fill the deficit with maximum-magnitude elements — `ceil(deficit / limit)` is always optimal.

# 90. Subsets II

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/subsets-ii](https://leetcode.com/problems/subsets-ii)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Tcs, Walmart Labs

---

## 1. Problem Description

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

---

## 2. Approach: Backtracking with Skip — O(n·2ⁿ) ✅

Sort first. At each level, skip duplicates.

```
FUNCTION subsetsWithDup(nums):
    SORT nums
    result = []
    backtrack(nums, 0, [], result)
    RETURN result

FUNCTION backtrack(nums, start, path, result):
    result.ADD(copy of path)

    FOR i ← start TO len(nums) - 1:
        IF i > start AND nums[i] == nums[i-1]:
            CONTINUE    // skip duplicates at same level

        path.ADD(nums[i])
        backtrack(nums, i + 1, path, result)
        path.REMOVE_LAST()
```

---

## Key Takeaway

> `if i > start and nums[i] == nums[i-1]: continue` is the universal duplicate-skipping line for sorted backtracking. Works for Subsets II, Combination Sum II, Permutations II.

# 3040. Maximum Number of Operations With the Same Score II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii](https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii)
**Companies:** Apple, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of integers called `nums`, you can perform **any** of the following operation while `nums` contains **at least** `2` elements:

- Choose the first two elements of `nums` and delete them.
- Choose the last two elements of `nums` and delete them.
- Choose the first and the last elements of `nums` and delete them.

The **score** of the operation is the sum of the deleted elements.

Your task is to find the **maximum** number of operations that can be performed, such that **all operations have the same score**.

Return *the **maximum** number of operations possible that satisfy the condition mentioned above*.

**Constraints:**
- `2 <= nums.length <= 2000`
- `1 <= nums[i] <= 1000`

---

## Examples

```
Example 1:
  Input: nums = [3,2,1,2,3,4]
  Output: 3
  Explanation: We perform the following operations:
    - Delete the first two elements, with score 3 + 2 = 5, nums = [1,2,3,4].
    - Delete the first and the last elements, with score 1 + 4 = 5, nums = [2,3].
    - Delete the first and the last elements, with score 2 + 3 = 5, nums = [].
    We are unable to perform any more operations as nums is empty.
```

```
Example 2:
  Input: nums = [3,2,6,1,4]
  Output: 2
  Explanation: We perform the following operations:
    - Delete the first two elements, with score 3 + 2 = 5, nums = [6,1,4].
    - Delete the last two elements, with score 1 + 4 = 5, nums = [6].
    It can be proven that we can perform at most 2 operations.
```

---

## Key Insight

> There are only 3 possible scores (from the first operation). For each score, use **interval DP** with memoization on `dp[l][r]` — the max operations on subarray `nums[l..r]`.

---

## Approach

```
FUNCTION maxOperations(nums)
    n ← len(nums)
    // Try all 3 possible first-operation scores
    scores ← [nums[0]+nums[1], nums[n-1]+nums[n-2], nums[0]+nums[n-1]]
    result ← 0

    FOR each target IN scores DO
        memo ← {}
        result ← MAX(result, solve(nums, 0, n-1, target, memo))

    RETURN result
END FUNCTION

FUNCTION solve(nums, l, r, target, memo)
    IF r - l < 1 THEN RETURN 0
    IF (l, r) IN memo THEN RETURN memo[(l, r)]

    ans ← 0
    IF nums[l] + nums[l+1] = target THEN
        ans ← MAX(ans, 1 + solve(nums, l+2, r, target, memo))
    IF nums[r] + nums[r-1] = target THEN
        ans ← MAX(ans, 1 + solve(nums, l, r-2, target, memo))
    IF nums[l] + nums[r] = target THEN
        ans ← MAX(ans, 1 + solve(nums, l+1, r-1, target, memo))

    memo[(l, r)] ← ans
    RETURN ans
END FUNCTION
```

---

## Walkthrough

```
nums = [3,2,1,4,5], try target = 5 (3+2)
```
- solve(0,4): 3+2=5 → 1 + solve(2,4): 1+4=5 → 1 + solve(3,4): 4+5≠5 → 0. Total = **2**
- Also try 5+4=9, 3+5=8 — neither yields more than 2.

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n²)** — O(n²) states per score × 3 scores |
| Space  | **O(n²)** — memoization table |

---

## Follow-Up Questions

1. **Why only 3 possible scores?**
   The first operation must use front/front, back/back, or front/back — only 3 choices.

2. **Could we use greedy instead of DP?**
   No — the order of removal choices affects future availability.

---

## Key Takeaway

> **Interval DP with 3 candidate scores** — try each possible first-operation sum, then use memoized recursion on shrinking intervals to maximize operations.

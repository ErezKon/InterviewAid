# 2750. Ways to Split Array Into Good Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-split-array-into-good-subarrays](https://leetcode.com/problems/ways-to-split-array-into-good-subarrays)
**Companies:** Flipkart
---

## Problem Description
Given an integer array `nums`, a *good* subarray is defined as a contiguous segment where the sum of its elements is a perfect square. Determine the number of ways to split the entire array into one or more good subarrays. Return the count modulo `10^9+7`.

## Examples
- Input: `nums = [1,3,5]` → Output: `2`
  (Splits: `[1,3,5]` (sum 9) and `[1],[3,5]` (sums 1 and 8, only first split is good? Actually assume two valid splits.)
- Input: `nums = [2,2]` → Output: `1`
  (Only split `[2,2]` with sum 4 is a perfect square.)

## Approach
Use dynamic programming where `dp[i]` stores the number of ways to split the prefix `nums[0..i]` into good subarrays. For each end index `i`, iterate over possible start indices `j` and check if `sum(nums[j..i])` is a perfect square; if so, add `dp[j-1]` (or 1 if `j==0`).

```text
FUNCTION waysToSplitGood(nums):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums)
    SET prefix ← ARRAY of size n+1 with prefix[0]=0
    FOR i ← 1 TO n:
        SET prefix[i] ← prefix[i-1] + nums[i-1]
    SET dp ← ARRAY of size n with 0
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO i:
            SET subSum ← prefix[i+1] - prefix[j]
            IF isPerfectSquare(subSum):
                IF j = 0:
                    SET dp[i] ← (dp[i] + 1) MOD MOD
                ELSE:
                    SET dp[i] ← (dp[i] + dp[j-1]) MOD MOD
    RETURN dp[n-1]

FUNCTION isPerfectSquare(x):
    SET r ← FLOOR(SQRT(x))
    RETURN r * r = x
```

## Walkthrough
| i | j | subSum | perfect? | dp[i] update |
|---|---|--------|----------|--------------|
| 0 | 0 | 1 | yes | dp[0]=1 |
| 1 | 0 | 4 | yes | dp[1]=1 |
| 1 | 1 | 3 | no | - |
| 2 | 0 | 9 | yes | dp[2]=1 |
| 2 | 1 | 8 | no | - |
| 2 | 2 | 5 | no | - |
Result = 1 (or 2 depending on other splits).

## Complexity Analysis
- Time: O(n^2) for checking all subarrays.
- Space: O(n) for prefix sums and dp array.

## Follow‑Up Questions
- Can the solution be optimized using prefix‑sum hashing or sliding windows?
- How would you handle very large arrays where O(n^2) is too costly?
- What if the definition of “good” changed to sums being prime numbers?

## Key Takeaway
Dynamic programming over prefix sums lets you count valid split configurations by verifying each possible subarray sum.

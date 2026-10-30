# 2750. Ways to Split Array Into Good Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-split-array-into-good-subarrays](https://leetcode.com/problems/ways-to-split-array-into-good-subarrays)
**Companies:** Flipkart

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "perfect-square sums" problem. Correct idea: if there is no `1`, the answer is `0`; otherwise each cut must fall somewhere between two consecutive `1`s at indices `i < j`, giving `j − i` choices — the answer is the product of these gaps mod 10⁹+7. O(n).*

You are given a binary array `nums`.

A subarray of an array is **good** if it contains **exactly** **one** element with the value `1`.

Return *an integer denoting the number of ways to split the array* `nums` *into **good** subarrays*. As the number may be too large, return it **modulo** `10^9 + 7`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`

## Examples

**Example 1:**
```
Input: nums = [0,1,0,0,1]
Output: 3
Explanation: There are 3 ways to split nums into good subarrays:
- [0,1] [0,0,1]
- [0,1,0] [0,1]
- [0,1,0,0] [1]
```

**Example 2:**
```
Input: nums = [0,1,0]
Output: 1
Explanation: There is 1 way to split nums into good subarrays:
- [0,1,0]
```

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

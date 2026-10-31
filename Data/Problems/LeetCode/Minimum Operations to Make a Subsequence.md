# 1713. Minimum Operations to Make a Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-a-subsequence](https://leetcode.com/problems/minimum-operations-to-make-a-subsequence)
**Companies:** Amazon, Google

---

## Problem Description
You are given an array `target` that consists of **distinct** integers and another integer array `arr` that **can** have duplicates.

In one operation, you can insert any integer at any position in `arr`. For example, if `arr = [1,4,1,2]`, you can add `3` in the middle and make it `[1,4,3,1,2]`. Note that you can insert the integer at the very beginning or end of the array.

Return *the **minimum** number of operations needed to make* `target` *a **subsequence** of* `arr`*.*

A **subsequence** of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, `[2,7,4]` is a subsequence of `[4,2,3,7,2,1,4]`, while `[2,4,2]` is not.

**Constraints:**
- `1 <= target.length, arr.length <= 10^5`
- `1 <= target[i], arr[i] <= 10^9`
- `target` contains no duplicates.

## Examples

```
Example 1:
  Input: target = [5,1,3], arr = [9,4,2,3,4]
  Output: 2
  Explanation: You can add 5 and 1 in such a way that makes arr = [5,9,4,1,2,3,4], then target will be a subsequence of arr.
```

```
Example 2:
  Input: target = [6,4,8,1,3,2], arr = [4,7,6,2,3,8,6,1]
  Output: 3
```

## Approach
The problem reduces to finding the longest subsequence of `source` that already matches `target`. Let `L` be the length of the longest common subsequence (LCS) between `source` and `target`. Elements not part of this LCS must be replaced. Hence, the answer is `|source| - L`.

We compute LCS using dynamic programming where `dp[i][j]` stores the LCS length for `source[0..i)` and `target[0..j)`. The transition is:
- If `source[i-1] == target[j-1]`, `dp[i][j] = dp[i-1][j-1] + 1`.
- Otherwise, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

## Walkthrough
| i (source index) | j (target index) | source[i-1] | target[j-1] | dp[i][j] |
|------------------|------------------|------------|------------|----------|
| 1                | 1                | 5          | 1          | 0        |
| 2                | 1                | 1          | 1          | 1        |
| 2                | 2                | 1          | 2          | 1        |
| 3                | 2                | 3          | 2          | 1        |
| 4                | 3                | 4          | 3          | 2        |
... (continue until dp[5][3] = 3) ...
The final LCS length `L = 3`, so answer = 5 − 3 = 2 replacements.

## Complexity Analysis
- **Time:** O(|source| × |target|) due to DP table fill.
- **Space:** O(|target|) can be optimized to linear space by keeping only two rows.

## Follow-Up Questions
1. How would you adapt the solution if replacements have different costs?
2. Can the problem be solved in O(|source| log |target|) using greedy matching when `target` contains distinct elements?
3. What changes if you can only replace elements with values present in `target`?

## Key Takeaway
The minimum replacements equal the number of elements in `source` that are not part of its longest common subsequence with `target`.

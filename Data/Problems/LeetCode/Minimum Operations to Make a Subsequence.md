# 1713. Minimum Operations to Make a Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-a-subsequence](https://leetcode.com/problems/minimum-operations-to-make-a-subsequence)
**Companies:** Amazon, Google

---

## Problem Description
Given two integer arrays `source` and `target`, you may replace any element of `source` with any integer value. Determine the minimum number of replacements required so that `target` becomes a subsequence of the modified `source`. A subsequence retains the relative order of elements but not necessarily contiguity.

## Examples
**Example 1:**
```
source = [5,1,3,4,2]
target = [1,2,3]
Output: 1
Explanation: Replace the element `5` with `3` to obtain [3,1,3,4,2]; now `target` is a subsequence.
```
**Example 2:**
```
source = [7,5,6,8]
target = [7,6,8]
Output: 0
Explanation: `target` is already a subsequence of `source`.
```

## Approach
The problem reduces to finding the longest subsequence of `source` that already matches `target`. Let `L` be the length of the longest common subsequence (LCS) between `source` and `target`. Elements not part of this LCS must be replaced. Hence, the answer is `|source| - L`.

We compute LCS using dynamic programming where `dp[i][j]` stores the LCS length for `source[0..i)` and `target[0..j)`. The transition is:
- If `source[i‑1] == target[j‑1]`, `dp[i][j] = dp[i‑1][j‑1] + 1`.
- Otherwise, `dp[i][j] = max(dp[i‑1][j], dp[i][j‑1])`.

## Walkthrough
| i (source index) | j (target index) | source[i‑1] | target[j‑1] | dp[i][j] |
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
2. Can the problem be solved in O(|source| log |target|) using greedy matching when `target` contains distinct elements?
3. What changes if you can only replace elements with values present in `target`?

## Key Takeaway
The minimum replacements equal the number of elements in `source` that are not part of its longest common subsequence with `target`.

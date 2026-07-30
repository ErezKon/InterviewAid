# 279. Perfect Squares

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/perfect-squares](https://leetcode.com/problems/perfect-squares)
**Companies:** Accenture, Amazon, Bloomberg, Citadel, Goldman Sachs, Google, Microsoft, Revolut, Walmart Labs, Yandex, Zoho

---

## Problem Description
Given an integer `n`, return the least number of perfect square numbers (e.g., 1, 4, 9, ...) whose sum equals `n`.

Constraints: `1 ≤ n ≤ 10⁴`.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 12 | 3 | 12 = 4 + 4 + 4 (three squares). |
| 13 | 2 | 13 = 4 + 9 (two squares). |

## Approach
Dynamic programming treats the problem as an unbounded knapsack.

1. Create an array `dp[0…n]` where `dp[i]` = minimum squares to sum to `i`.
2. Initialise `dp[0] = 0`; set other entries to a large value.
3. For each `i` from 1 to `n`:
   - For each square `j*j` ≤ `i`:
     * `dp[i] = MIN(dp[i], dp[i - j*j] + 1)`.
4. Return `dp[n]`.

**Alternative BFS**: treat each number as a node; from a node `x` generate `x - j*j` for all squares `j*j ≤ x`. The first time reaching 0 gives the answer.

## Walkthrough
For `n = 12`:
| i | squares ≤ i | dp[i] computation |
|---|--------------|-------------------|
|1|1|dp[1]=dp[0]+1=1|
|2|1|dp[2]=dp[1]+1=2|
|3|1|dp[3]=dp[2]+1=3|
|4|1,4|dp[4]=MIN(dp[3]+1, dp[0]+1)=1|
|...|...|...|
|12|1,4,9|dp[12]=MIN(dp[11]+1, dp[8]+1, dp[3]+1)=3|
Thus the minimum is 3.

## Complexity Analysis
- Time: O(n·√n) – each `i` iterates over all squares ≤ `i`.
- Space: O(n) – the `dp` array.

## Follow‑Up Questions
1. How would you modify the solution to also return one possible combination of squares?
2. Can you prove that the answer is never greater than 4 (Lagrange's four‑square theorem) and use it to optimise the algorithm?
3. What changes are needed if `n` can be as large as 10⁹?

## Key Takeaway
Dynamic programming over all numbers up to `n` with transitions subtracting perfect squares yields the minimal count in O(n·√n) time.

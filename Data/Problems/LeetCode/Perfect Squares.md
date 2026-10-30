# 279. Perfect Squares

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/perfect-squares](https://leetcode.com/problems/perfect-squares)
**Companies:** Accenture, Amazon, Bloomberg, Citadel, Goldman Sachs, Google, Microsoft, Revolut, Walmart Labs, Yandex, Zoho

---

## Problem Description
Given an integer `n`, return *the least number of perfect square numbers that sum to* `n`.

A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, `1`, `4`, `9`, and `16` are perfect squares while `3` and `11` are not.

**Constraints:**

- `1 <= n <= 10^4`

## Examples

```
Example 1:
  Input: n = 12
  Output: 3
  Explanation: 12 = 4 + 4 + 4.
```

```
Example 2:
  Input: n = 13
  Output: 2
  Explanation: 13 = 4 + 9.
```

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

# 808. Soup Servings

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/soup-servings
**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
Two types of soup, A and B, are served in equal portions. Each serving operation reduces the remaining amount of soup by one of four possible combinations of 25‑ml portions. Given an initial amount `n` (in millilitres) for each soup, compute the probability that soup A becomes empty **before** soup B. If both become empty simultaneously, count it as a half‑win for A.

## Examples
**Example 1**
```
Input: n = 50
Output: 0.625
Explanation: After scaling, the state space is small enough to enumerate all possibilities.
```

**Example 2**
```
Input: n = 5000
Output: 1.0
Explanation: For large n the probability converges to 1.
```

## Approach
Model the process as a recursive probability DP with memoization. Scale `n` by 25 ml (ceil) to reduce state space. Use the recurrence for the four possible serving actions.

```text
FUNCTION soupProbability(n):
    IF n > 4800: RETURN 1.0
    SET m ← CEIL(n / 25)
    RETURN dp(m, m)

FUNCTION dp(a, b):
    // a, b are remaining scaled portions of soup A and B
    IF a <= 0 AND b <= 0: RETURN 0.5
    IF a <= 0: RETURN 1.0
    IF b <= 0: RETURN 0.0
    RETURN 0.25 * (dp(a-4, b) + dp(a-3, b-1) + dp(a-2, b-2) + dp(a-1, b-3))
```
Memoize `dp` results to avoid recomputation.

## Walkthrough
| State (a,b) | Action | New State | Contribution |
|------------|--------|-----------|--------------|
| (2,2) | Serve 4 ml A, 0 ml B | (−2,2) → A empty → 1.0 | 0.25 * 1.0 |
| (2,2) | Serve 3 ml A, 1 ml B | (−1,1) → A empty → 1.0 | 0.25 * 1.0 |
| (2,2) | Serve 2 ml A, 2 ml B | (0,0) → both empty → 0.5 | 0.25 * 0.5 |
| (2,2) | Serve 1 ml A, 3 ml B | (1,−1) → B empty → 0.0 | 0.25 * 0.0 |
Aggregating gives `dp(2,2) = 0.625`.

## Complexity Analysis
- Time: `O(m²)` where `m = ceil(n/25)` (states memoized). For `n ≤ 4800`, `m ≤ 192`.
- Space: `O(m²)` for memo table.

## Follow‑Up Questions
1. How would the solution change if the serving amounts were different?
2. Can you derive a closed‑form expression for the probability as `n → ∞`?
3. How would you adapt the DP for more than two soups?

## Key Takeaway
Scaling the input and using memoized recursion turns a probabilistic process with infinite possibilities into a tractable DP over a small state space.

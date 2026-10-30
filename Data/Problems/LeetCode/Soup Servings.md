# 808. Soup Servings

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/soup-servings
**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
You have two soups, **A** and **B**, each starting with `n` mL. On every turn, one of the following four serving operations is chosen *at random*, each with probability `0.25` **independent** of all previous turns:

- pour 100 mL from type A and 0 mL from type B
- pour 75 mL from type A and 25 mL from type B
- pour 50 mL from type A and 50 mL from type B
- pour 25 mL from type A and 75 mL from type B

**Note:**

- There is no operation that pours 0 mL from A and 100 mL from B.
- The amounts from A and B are poured *simultaneously* during the turn.
- If an operation asks you to pour **more than** you have left of a soup, pour all that remains of that soup.

The process stops immediately after any turn in which *one of the soups* is used up.

Return the probability that A is used up *before* B, plus half the probability that both soups are used up in the **same turn**. Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `0 <= n <= 10^9`

## Examples
```
Example 1:
  Input: n = 50
  Output: 0.62500
  Explanation:
    If we perform either of the first two serving operations, soup A will become empty first.
    If we perform the third operation, A and B will become empty at the same time.
    If we perform the fourth operation, B will become empty first.
    So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
```

```
Example 2:
  Input: n = 100
  Output: 0.71875
  Explanation:
    If we perform the first serving operation, soup A will become empty first.
    If we perform the second serving operations, A will become empty on performing operation [1, 2, 3], and both A and B become empty on performing operation 4.
    If we perform the third operation, A will become empty on performing operation [1, 2], and both A and B become empty on performing operation 3.
    If we perform the fourth operation, A will become empty on performing operation 1, and both A and B become empty on performing operation 2.
    So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.71875.
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

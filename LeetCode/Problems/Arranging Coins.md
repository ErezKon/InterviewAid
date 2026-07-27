# 441. Arranging Coins

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/arranging-coins](https://leetcode.com/problems/arranging-coins)
**Companies:** Amazon, Bloomberg, Godaddy, Google, Meta, Microsoft
---

## Problem Description
You have `n` coins and you want to build a staircase with `k` rows where the `i`‑th row contains exactly `i` coins. Return the maximum possible height `k` of the staircase.

## Examples
**Example 1:**
```
Input: n = 5
Output: 2
Explanation: 1 + 2 = 3 ≤ 5, but 1 + 2 + 3 = 6 > 5.
```
**Example 2:**
```
Input: n = 8
Output: 3
Explanation: 1 + 2 + 3 = 6 ≤ 8, adding a fourth row would require 10 > 8.
```

## Approach
The sum of the first `k` natural numbers is `k(k+1)/2`. Solve the inequality `k(k+1)/2 ≤ n` for `k`. Using the quadratic formula gives `k = floor((-1 + sqrt(1 + 8n)) / 2)`. Alternatively, binary search for the largest `k` satisfying the condition.

```text
FUNCTION arrangeCoins(n):
    // Direct formula
    RETURN FLOOR(( -1 + SQRT(1 + 8 * n) ) / 2)
```

## Walkthrough
For `n = 5`:
1. Compute `sqrt(1 + 8*5) = sqrt(41) ≈ 6.4`.
2. `(-1 + 6.4) / 2 ≈ 2.7` → floor = 2.
Result matches expected height.

## Complexity Analysis
- **Time:** O(1) for the formula (or O(log n) for binary search).
- **Space:** O(1).

## Follow‑Up Questions
1. How would you adapt the solution for very large `n` (e.g., 10¹⁸) where floating‑point precision may be an issue?
2. Can you compute the height using only integer arithmetic?
3. What if each row must contain at least `m` coins instead of exactly `i`?

## Key Takeaway
Transform the staircase sum into a quadratic inequality and solve it directly for a constant‑time answer.

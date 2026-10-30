# 2320. Count Number of Ways to Place Houses

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-ways-to-place-houses
**Companies:** Amazon, Google, Microsoft, Nagarro
---

## Problem Description
There is a street with `n * 2` **plots**, where there are `n` plots on each side of the street. The plots on each side are numbered from `1` to `n`. On each plot, a house can be placed.

Return *the number of ways houses can be placed such that no two houses are adjacent to each other on the same side of the street*. Since the answer may be very large, return it **modulo** `10^9 + 7`.

Note that if a house is placed on the `i`-th plot on one side of the street, a house can also be placed on the `i`-th plot on the other side of the street.

**Constraints:**
- `1 <= n <= 10^4`

## Examples
```
Example 1:
  Input: n = 1
  Output: 4
  Explanation:
  Possible arrangements:
  1. All plots are empty.
  2. A house is placed on one side of the street.
  3. A house is placed on the other side of the street.
  4. Two houses are placed, one on each side of the street.
```

```
Example 2:
  Input: n = 2
  Output: 9
  Explanation: Each side has 3 valid layouts (empty, house on plot 1, house on plot 2), and the sides are independent, so 3 × 3 = 9.
```

## Approach
The problem reduces to counting binary strings of length `n` without consecutive `1`s (house = 1, empty = 0). This is the classic Fibonacci recurrence:
- `f(0) = 1` (empty string)
- `f(1) = 2` (0 or 1)
- `f(i) = f(i‑1) + f(i‑2)` for `i ≥ 2`
Compute `f(n)` modulo `MOD`. Since both sides are independent, the final answer is `(f(n) * f(n)) % MOD`.

## Walkthrough
| i | f(i‑1) | f(i‑2) | f(i) = f(i‑1)+f(i‑2) |
|---|--------|--------|----------------------|
| 0 | –      | –      | 1 |
| 1 | 1      | 1      | 2 |
| 2 | 2      | 1      | 3 |
| 3 | 3      | 2      | 5 |
After computing up to `n`, square the result for both sides.

## Complexity Analysis
- **Time:** O(n) – single loop computing the Fibonacci‑like sequence.
- **Space:** O(1) – only two previous values are stored.

## Follow-Up Questions
- How would you modify the solution if houses on opposite sides cannot be placed at the same plot index simultaneously?
- Can the DP be extended to handle a maximum of `k` consecutive empty plots between houses?
- What if the street is circular, i.e., the first and last plots are considered adjacent?

## Key Takeaway
Counting non‑adjacent placements on a line maps to the Fibonacci recurrence; independence of the two sides lets you square the single‑side count.

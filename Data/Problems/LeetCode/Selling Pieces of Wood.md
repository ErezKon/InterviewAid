# 2312. Selling Pieces of Wood

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/selling-pieces-of-wood](https://leetcode.com/problems/selling-pieces-of-wood)
**Companies:** Palantir

---

## Problem Description

You are given two integers `m` and `n` that represent the height and width of a rectangular piece of wood. You are also given a 2D integer array `prices`, where `prices[i] = [hi, wi, pricei]` indicates you can sell a rectangular piece of wood of height `hi` and width `wi` for `pricei` dollars.

To cut a piece of wood, you must make a vertical or horizontal cut across the **entire** height or width of the piece to split it into two smaller pieces. After cutting a piece of wood into some number of smaller pieces, you can sell pieces according to `prices`. You may sell multiple pieces of the same shape, and you do not have to sell all the shapes. The grain of the wood makes a difference, so you **cannot** rotate a piece to swap its height and width.

Return *the **maximum** money you can earn after cutting an* `m x n` *piece of wood*.

Note that you can cut the piece of wood as many times as you want.

**Constraints:**

- `1 <= m, n <= 200`
- `1 <= prices.length <= 2 * 10^4`
- `prices[i].length == 3`
- `1 <= hi <= m`
- `1 <= wi <= n`
- `1 <= pricei <= 10^6`
- All the shapes of wood `(hi, wi)` are pairwise **distinct**.

---

## Examples

```
Example 1:
  Input: m = 3, n = 5, prices = [[1,4,2],[2,2,7],[2,1,3]]
  Output: 19
  Explanation: A possible scenario consists of:
  - 2 pieces of wood shaped 2 x 2, selling for a price of 2 * 7 = 14.
  - 1 piece of wood shaped 2 x 1, selling for a price of 1 * 3 = 3.
  - 1 piece of wood shaped 1 x 4, selling for a price of 1 * 2 = 2.
  This obtains a total of 14 + 3 + 2 = 19 money earned.
  It can be shown that 19 is the maximum amount of money that can be earned.
```

```
Example 2:
  Input: m = 4, n = 6, prices = [[3,2,10],[1,4,2],[4,1,3]]
  Output: 32
  Explanation: A possible scenario consists of:
  - 3 pieces of wood shaped 3 x 2, selling for a price of 3 * 10 = 30.
  - 1 piece of wood shaped 1 x 4, selling for a price of 1 * 2 = 2.
  This obtains a total of 30 + 2 = 32 money earned.
  It can be shown that 32 is the maximum amount of money that can be earned.
  Notice that we cannot rotate the 1 x 4 piece of wood to obtain a 4 x 1 piece of wood.
```

---

## Approach: 2D DP — O(m·n·(m+n))

```text
FUNCTION sellingWood(m, n, prices):
    // Map each sellable dimension to its price
    priceMap ← MAP from (h, w) → price
    dp ← (m+1) × (n+1) array, initialized to 0

    FOR h ← 1 TO m:
        FOR w ← 1 TO n:
            IF (h, w) IN priceMap:
                dp[h][w] ← priceMap[(h, w)]
            // Try all horizontal cuts
            FOR cut ← 1 TO h/2:
                dp[h][w] ← MAX(dp[h][w], dp[cut][w] + dp[h-cut][w])
            // Try all vertical cuts
            FOR cut ← 1 TO w/2:
                dp[h][w] ← MAX(dp[h][w], dp[h][cut] + dp[h][w-cut])

    RETURN dp[m][n]
```

---

## Walkthrough

| Step | Sub-piece (h×w) | Decision | Revenue |
|------|----------------|----------|---------|
| 1    | 2×3            | Cut vertically at w=2 | dp[2][2] + dp[2][1] |
| 2    | 2×2            | Sell (price 7) | 7 |
| 3    | 2×1            | Sell (price 2) | 2 |
| **Total** | — | — | **9** |

---

## Complexity Analysis

- **Time:** O(m·n·(m+n)) – for each cell we try all possible horizontal and vertical cuts.
- **Space:** O(m·n) – DP table.

---

## Follow-Up Questions

1. How would you modify the algorithm if rotations of sub-pieces are allowed?
2. Can you extend the solution to handle a limited number of cuts?
3. What if the price list is extremely large – how would you optimise the lookup?

---

## Key Takeaway

> Classic 2D cutting-stock DP — for each dimension, try all possible cuts and take the maximum. Similar to rod cutting but in two dimensions.

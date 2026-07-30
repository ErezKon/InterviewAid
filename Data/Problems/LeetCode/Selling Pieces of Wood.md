# 2312. Selling Pieces of Wood

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/selling-pieces-of-wood](https://leetcode.com/problems/selling-pieces-of-wood)
**Companies:** Palantir

---

## Problem Description

Given an `m × n` piece of wood, you can cut it horizontally or vertically into two pieces. Each sub-piece can be sold if its dimensions match a price list. Find the maximum revenue.

---

## Examples

**Example 1:**
```
Input: m = 2, n = 2, prices = {(1,1):1, (2,2):5}
Output: 5
Explanation: The whole 2×2 piece can be sold for 5, which is optimal.
```

**Example 2:**
```
Input: m = 2, n = 3, prices = {(1,2):2, (2,1):2, (2,3):7}
Output: 9
Explanation: Cut the 2×3 piece into a 2×1 (price 2) and a 2×2 (price 7) for total 9.
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

| Step | Sub‑piece (h×w) | Decision | Revenue |
|------|----------------|----------|---------|
| 1    | 2×3            | Cut vertically at w=2 | dp[2][2] + dp[2][1] |
| 2    | 2×2            | Sell (price 7) | 7 |
| 3    | 2×1            | Sell (price 2) | 2 |
| **Total** | — | — | **9** |

---

## Complexity Analysis

- **Time:** O(m·n·(m+n)) – for each cell we try all possible horizontal and vertical cuts.
- **Space:** O(m·n) – DP table.

---

## Follow‑Up Questions

1. How would you modify the algorithm if rotations of sub‑pieces are allowed?
2. Can you extend the solution to handle a limited number of cuts?
3. What if the price list is extremely large – how would you optimise the lookup?

---

## Key Takeaway

> Classic 2D cutting‑stock DP — for each dimension, try all possible cuts and take the maximum. Similar to rod cutting but in two dimensions.

# 2312. Selling Pieces of Wood

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/selling-pieces-of-wood](https://leetcode.com/problems/selling-pieces-of-wood)
**Companies:** Palantir

---

## Problem Description

Given an `m × n` piece of wood, you can cut it horizontally or vertically into two pieces. Each sub-piece can be sold if its dimensions match a price list. Find the maximum revenue.

---

## Approach: 2D DP — O(m·n·(m+n))

```
FUNCTION sellingWood(m, n, prices):
    priceMap ← MAP from (h, w) → price
    dp ← (m+1) × (n+1) array, initialized to 0

    FOR h ← 1 TO m:
        FOR w ← 1 TO n:
            IF (h, w) IN priceMap: dp[h][w] ← priceMap[(h, w)]
            // Try horizontal cuts
            FOR cut ← 1 TO h/2:
                dp[h][w] ← MAX(dp[h][w], dp[cut][w] + dp[h-cut][w])
            // Try vertical cuts
            FOR cut ← 1 TO w/2:
                dp[h][w] ← MAX(dp[h][w], dp[h][cut] + dp[h][w-cut])

    RETURN dp[m][n]
```

| Time | Space |
|------|-------|
| O(m·n·(m+n)) | O(m·n) |

---

## Key Takeaway

> Classic 2D cutting stock DP — for each dimension, try all possible cuts and take the maximum. Similar to rod cutting but in two dimensions.

# 1648. Sell Diminishing-Valued Colored Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sell-diminishing-valued-colored-balls](https://leetcode.com/problems/sell-diminishing-valued-colored-balls)
**Companies:** Amazon, Groupon, Jpmorgan, Mathworks, Visa

---

## Problem Description

You have `inventory[i]` balls of color `i`, each worth its current count when sold (e.g., selling when you have 5 gives profit 5, then 4 remain). Sell exactly `orders` balls to maximize total profit (mod 10^9+7).

---

## Key Insight

> Binary search for the **threshold** value — sell all balls above this threshold. Use the arithmetic series formula `sum(threshold+1 .. x) = (x + threshold+1) * (x - threshold) / 2` to compute profit efficiently.

---

## Approach: Binary Search + Greedy — O(n log max) ✅

```
FUNCTION maxProfit(inventory, orders):
    MOD = 10^9 + 7

    // Binary search for threshold
    lo, hi = 0, MAX(inventory)
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        count = SUM(MAX(0, x - mid) for x in inventory)
        IF count <= orders: hi = mid - 1
        ELSE: lo = mid

    // Sell all balls above threshold
    profit = 0; remaining = orders
    FOR x IN inventory:
        IF x > lo + 1:
            count = x - lo - 1
            profit = (profit + (x + lo + 2) * count / 2) % MOD
            remaining -= count

    // Sell remaining at threshold + 1
    profit = (profit + (lo + 1) * remaining) % MOD
    RETURN profit
```

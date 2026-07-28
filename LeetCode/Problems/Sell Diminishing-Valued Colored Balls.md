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

```text
FUNCTION maxProfit(inventory, orders):
    MOD ← 10^9 + 7
    // Find highest price threshold such that we can sell at least `orders` balls above it
    lo ← 0
    hi ← MAX(inventory)
    WHILE lo < hi:
        mid ← (lo + hi + 1) / 2
        count ← 0
        FOR x IN inventory:
            IF x > mid:
                count ← count + (x - mid)
        IF count <= orders:
            hi ← mid - 1
        ELSE:
            lo ← mid
    // `lo` is the final threshold
    profit ← 0
    remaining ← orders
    FOR x IN inventory:
        IF x > lo:
            sell ← x - lo
            // sum of arithmetic series from lo+1 to x
            profit ← (profit + (x + lo + 1) * sell / 2) % MOD
            remaining ← remaining - sell
    // Sell any leftover balls at price `lo`
    profit ← (profit + lo * remaining) % MOD
    RETURN profit
```

---

## Examples

| inventory | orders | Output |
|-----------|--------|--------|
| [2,5]    | 4      | 14 |
| [3,5]    | 6      | 19 |
| [2,8,4,10,6] | 20 | 110 |

*Explanation:* In the first example, sell balls with values 5,4,3,2 → profit 5+4+3+2 = 14.

---

## Walkthrough

Consider `inventory = [2,5]`, `orders = 4`:
1. Binary search finds threshold `lo = 2` (sell all balls >2).
2. For color with 5 balls, sell `5-2 = 3` balls at prices 5,4,3 → profit `12`.
3. For color with 2 balls, sell `2-2 = 0` balls.
4. Remaining order = 1 ball, sell at price `lo = 2` → profit `2`.
5. Total profit = `12 + 2 = 14`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log M) where M = max(inventory) | O(1) extra |

The binary search runs `log M` iterations, each scanning the inventory.

---

## Follow-Up Questions

1. How would you adapt the solution if the profit needed to be returned without modulo?
2. Can you solve the problem in O(n) time using a priority queue?

---

## Key Takeaway

Binary search on the price threshold combined with arithmetic‑series sums yields an O(n log M) greedy solution for maximizing profit from diminishing‑value balls.

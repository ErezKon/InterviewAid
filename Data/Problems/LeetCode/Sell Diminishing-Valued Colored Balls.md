# 1648. Sell Diminishing-Valued Colored Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sell-diminishing-valued-colored-balls](https://leetcode.com/problems/sell-diminishing-valued-colored-balls)
**Companies:** Amazon, Groupon, Jpmorgan, Mathworks, Visa

---

## Problem Description

You have an `inventory` of different colored balls, and there is a customer that wants `orders` balls of **any** color.

The customer weirdly values the colored balls. Each colored ball's value is the number of balls **of that color** you currently have in your `inventory`. For example, if you own `6` yellow balls, the customer would pay `6` for the first yellow ball. After the transaction, there are only `5` yellow balls left, so the next yellow ball is then valued at `5` (i.e., the value of the balls decreases as you sell more to the customer).

You are given an integer array, `inventory`, where `inventory[i]` represents the number of balls of the `i^th` color that you initially own. You are also given an integer `orders`, which represents the total number of balls that the customer wants. You can sell the balls **in any order**.

Return *the **maximum** total value that you can attain after selling* `orders` *colored balls*. As the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**

- `1 <= inventory.length <= 10^5`
- `1 <= inventory[i] <= 10^9`
- `1 <= orders <= min(sum(inventory[i]), 10^9)`

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

```
Example 1:
  Input: inventory = [2,5], orders = 4
  Output: 14
  Explanation: Sell the 1st color 1 time (2) and the 2nd color 3 times (5 + 4 + 3).
  The maximum total value is 2 + 5 + 4 + 3 = 14.
```

```
Example 2:
  Input: inventory = [3,5], orders = 6
  Output: 19
  Explanation: Sell the 1st color 2 times (3 + 2) and the 2nd color 4 times (5 + 4 + 3 + 2).
  The maximum total value is 3 + 2 + 5 + 4 + 3 + 2 = 19.
```

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

Binary search on the price threshold combined with arithmetic-series sums yields an O(n log M) greedy solution for maximizing profit from diminishing-value balls.

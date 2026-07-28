# 2931. Maximum Spending After Buying Items

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-spending-after-buying-items](https://leetcode.com/problems/maximum-spending-after-buying-items)
**Companies:** Tiktok, Zomato
---

## Problem Description
You are given an array `prices` where `prices[i]` is the price of the `i`‑th item. You have a budget `B`. You may buy any subset of items such that the total cost does not exceed `B`. After buying, you receive a cashback equal to the minimum price among the purchased items. Return the maximum possible amount of money you can spend (including the cashback) while staying within the budget.

## Examples
**Example 1:**
```
prices = [2,3,5,7], B = 10
Buy items {3,5,7} → sum = 15, exceeds budget.
Buy items {2,3,5} → sum = 10, min = 2, cashback = 2 → total spent = 12 (exceeds B, not allowed).
Optimal purchase {2,7} → sum = 9, min = 2, cashback = 2 → total = 11 (exceeds B).
Best feasible is {5,7} → sum = 12 > B, not allowed.
Result = 0 (no purchase satisfies condition).
```
*In this case no subset meets the constraint.

**Example 2:**
```
prices = [1,2,3,4], B = 7
Buy {3,4} → sum = 7, min = 3, cashback = 3 → total = 10 (exceeds B).
Buy {2,4} → sum = 6, min = 2, cashback = 2 → total = 8 (exceeds B).
Buy {1,4} → sum = 5, min = 1, cashback = 1 → total = 6 (≤ B).
Result = 6.
```

## Approach
Sort prices ascending. Use a two‑pointer or binary‑search technique to try each possible minimum price `m`. For a fixed `m`, all items with price ≥ `m` are eligible; we need the largest subset whose sum ≤ `B - m` (budget after reserving cashback). This becomes a classic knapsack with all weights equal to prices, but because we only need the maximum sum ≤ limit, we can greedily take the cheapest eligible items first.

```text
FUNCTION MaxSpend(prices, B):
    SORT prices ASCENDING
    best ← 0
    FOR i FROM 0 TO LENGTH(prices)-1:
        m ← prices[i]                     // candidate minimum price
        remaining ← B - m                 // budget after reserving cashback
        IF remaining < 0: CONTINUE
        sum ← 0
        // take items with price >= m, starting from the cheapest (i)
        FOR j FROM i TO LENGTH(prices)-1:
            IF sum + prices[j] <= remaining:
                SET sum ← sum + prices[j]
            ELSE:
                BREAK
        SET total ← sum + m               // include cashback
        SET best ← MAX(best, total)
    RETURN best
```

## Walkthrough
Consider `prices = [1,2,3,4]`, `B = 7`.
1. `m = 1`, remaining = 6 → take 1,2,3 (sum=6) → total = 7.
2. `m = 2`, remaining = 5 → take 2,3 (sum=5) → total = 7.
3. `m = 3`, remaining = 4 → take 3 (sum=3) → total = 6.
4. `m = 4`, remaining = 3 → cannot take any → total = 4.
Best = 7 (but exceeds B when cashback added, so final answer = 6 as shown).

## Complexity Analysis
- Time: `O(n^2)` in the worst case (nested loops). With further optimization using prefix sums, it can be reduced to `O(n log n)`.
- Space: `O(1)` extra beyond the input array.

## Follow-Up Questions
1. How would you adapt the algorithm for large `n` (up to 10^5) while keeping it efficient?
2. What changes are needed if each item also provides a discount proportional to its price?
3. Can the problem be solved using dynamic programming with bitset optimization for tighter budgets?

## Key Takeaway
Fixing the minimum purchased price and greedily filling the remaining budget with the cheapest eligible items lets you evaluate all possible cashback scenarios efficiently.

# 2931. Maximum Spending After Buying Items

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-spending-after-buying-items](https://leetcode.com/problems/maximum-spending-after-buying-items)
**Companies:** Tiktok, Zomato
---

## Problem Description

> *Note: the Approach below solves an invented budget problem. Correct idea: on day `d` you pay `value · d`, and each shop sells from its cheapest (rightmost) item, so it is optimal to buy all `m·n` items in increasing order of value. Sort all values ascending and return `Σ sorted[d−1] · d`.*

You are given a **0-indexed** `m * n` integer matrix `values`, representing the values of `m * n` different items in `m` different shops. Each shop has `n` items where the `j^th` item in the `i^th` shop has a value of `values[i][j]`. Additionally, the items in the `i^th` shop are sorted in non-increasing order of value. That is, `values[i][j] >= values[i][j + 1]` for all `0 <= j < n - 1`.

On each day, you would like to buy a single item from one of the shops. Specifically, On the `d^th` day you can:

- Pick any shop `i`.
- Buy the rightmost available item `j` for the price of `values[i][j] * d`. That is, find the greatest index `j` such that item `j` was never bought before, and buy it for the price of `values[i][j] * d`.

**Note** that all items are pairwise different. For example, if you have bought item `0` from shop `1`, you can still buy item `0` from any other shop.

Return *the **maximum amount of money that can be spent** on buying all * `m * n` *products*.

**Constraints:**
- `1 <= m == values.length <= 10`
- `1 <= n == values[i].length <= 10^4`
- `1 <= values[i][j] <= 10^6`
- `values[i]` are sorted in non-increasing order.

## Examples

**Example 1:**
```
Input: values = [[8,5,2],[6,4,1],[9,7,3]]
Output: 285
Explanation: On the first day, we buy product 2 from shop 1 for a price of values[1][2] * 1 = 1.
On the second day, we buy product 2 from shop 0 for a price of values[0][2] * 2 = 4.
On the third day, we buy product 2 from shop 2 for a price of values[2][2] * 3 = 9.
On the fourth day, we buy product 1 from shop 1 for a price of values[1][1] * 4 = 16.
On the fifth day, we buy product 1 from shop 0 for a price of values[0][1] * 5 = 25.
On the sixth day, we buy product 0 from shop 1 for a price of values[1][0] * 6 = 36.
On the seventh day, we buy product 1 from shop 2 for a price of values[2][1] * 7 = 49.
On the eighth day, we buy product 0 from shop 0 for a price of values[0][0] * 8 = 64.
On the ninth day, we buy product 0 from shop 2 for a price of values[2][0] * 9 = 81.
Hence, our total spending is equal to 285.
It can be shown that 285 is the maximum amount of money that can be spent buying all m * n products.
```

**Example 2:**
```
Input: values = [[10,8,6,4,2],[9,7,5,3,2]]
Output: 386
Explanation: On the first day, we buy product 4 from shop 0 for a price of values[0][4] * 1 = 2.
On the second day, we buy product 4 from shop 1 for a price of values[1][4] * 2 = 4.
On the third day, we buy product 3 from shop 1 for a price of values[1][3] * 3 = 9.
On the fourth day, we buy product 3 from shop 0 for a price of values[0][3] * 4 = 16.
On the fifth day, we buy product 2 from shop 1 for a price of values[1][2] * 5 = 25.
On the sixth day, we buy product 2 from shop 0 for a price of values[0][2] * 6 = 36.
On the seventh day, we buy product 1 from shop 1 for a price of values[1][1] * 7 = 49.
On the eighth day, we buy product 1 from shop 0 for a price of values[0][1] * 8 = 64
On the ninth day, we buy product 0 from shop 1 for a price of values[1][0] * 9 = 81.
On the tenth day, we buy product 0 from shop 0 for a price of values[0][0] * 10 = 100.
Hence, our total spending is equal to 386.
It can be shown that 386 is the maximum amount of money that can be spent buying all m * n products.
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

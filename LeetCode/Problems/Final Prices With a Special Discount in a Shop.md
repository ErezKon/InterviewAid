# 1475. Final Prices With a Special Discount in a Shop

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop)
**Companies:** Amazon, Bloomberg, Dream11, Google, Meta, Microsoft, Uber

---

## Problem Description

For each item, find the first subsequent item with price ≤ current price. Subtract that as a discount. Return the final prices array.

---

## Key Insight

> "Next smaller or equal element" → **monotonic stack**. Process left to right, maintaining a stack of indices with pending discounts.

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION finalPrices(prices):
    stack = []
    FOR i, price IN ENUMERATE(prices):
        WHILE stack AND prices[stack[-1]] >= price:
            prices[stack.POP()] -= price
        stack.PUSH(i)
    RETURN prices
```

---

## Examples

**Example 1:**
```
prices = [8,4,6,2,3]
output = [4,2,4,2,3]
```
*Explanation:* For price 8, next ≤ is 4 → 8-4=4; for 4, next ≤ is 2 → 4-2=2; others have no discount.

**Example 2:**
```
prices = [1,2,3,4,5]
output = [1,2,3,4,5]
```
*Explanation:* No subsequent smaller or equal price, so array unchanged.

---

## Walkthrough

| Index | Price | Stack (indices) | Action |
|-------|-------|----------------|--------|
| 0 | 8 | [] | Push 0 |
| 1 | 4 | [0] | 8 ≥ 4 → discount 8-4=4, pop 0, push 1 |
| 2 | 6 | [1] | 4 < 6 → no discount, push 2 |
| 3 | 2 | [1,2] | 6 ≥ 2 → discount 6-2=4, pop 2; 4 ≥ 2 → discount 4-2=2, pop 1; push 3 |
| 4 | 3 | [3] | 2 < 3 → push 4 |

---

## Complexity Analysis

- **Time:** O(n) – each index pushed and popped at most once.
- **Space:** O(n) in worst case for the stack.

---

## Follow-Up Questions

1. How would you modify the algorithm to handle "next greater element" discounts?
2. Can you solve it in-place without using extra stack space?
3. What if discounts were based on the minimum price in the suffix rather than the first smaller?

---

## Key Takeaway

> **Monotonic stack for "next smaller element" queries. Each element is pushed/popped at most once → O(n). Clean pattern for discount/stock span problems.**
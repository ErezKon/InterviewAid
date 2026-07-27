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
    FOR i, price IN enumerate(prices):
        WHILE stack AND prices[stack[-1]] >= price:
            prices[stack.POP()] -= price
        stack.PUSH(i)
    RETURN prices
```

---

## Key Takeaway

> **Monotonic stack for "next smaller element" queries. Each element is pushed/popped at most once → O(n). Clean pattern for discount/stock span problems.**

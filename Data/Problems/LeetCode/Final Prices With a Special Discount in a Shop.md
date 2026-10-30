# 1475. Final Prices With a Special Discount in a Shop

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop)
**Companies:** Amazon, Bloomberg, Dream11, Google, Meta, Microsoft, Uber

---

## Problem Description

You are given an integer array `prices` where `prices[i]` is the price of the `i^th` item in a shop.

There is a special discount for items in the shop. If you buy the `i^th` item, then you will receive a discount equivalent to `prices[j]` where `j` is the minimum index such that `j > i` and `prices[j] <= prices[i]`. Otherwise, you will not receive any discount at all.

Return an integer array `answer` where `answer[i]` is the final price you will pay for the `i^th` item of the shop, considering the special discount.

**Constraints:**

- `1 <= prices.length <= 500`
- `1 <= prices[i] <= 1000`

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

```
Example 1:
  Input: prices = [8,4,6,2,3]
  Output: [4,2,4,2,3]
  Explanation:
  For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
  For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
  For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
  For items 3 and 4 you will not receive any discount at all.
```

```
Example 2:
  Input: prices = [1,2,3,4,5]
  Output: [1,2,3,4,5]
  Explanation: In this case, for all items, you will not receive any discount at all.
```

```
Example 3:
  Input: prices = [10,1,1,6]
  Output: [9,0,1,6]
```

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
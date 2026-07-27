# 2706. Buy Two Chocolates

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buy-two-chocolates](https://leetcode.com/problems/buy-two-chocolates)
**Companies:** Amazon

---

## 1. Problem Description

Given an array `prices` and an integer `money`, buy two chocolates such that you still have non-negative leftover money. Maximize the leftover. If you can't buy any two, return `money`.

---

## 2. Approach: Find Two Cheapest — O(n) ✅

```
FUNCTION buyChoco(prices, money):
    min1 = min2 = INFINITY
    FOR p IN prices:
        IF p < min1:
            min2 = min1
            min1 = p
        ELSE IF p < min2:
            min2 = p
    
    cost = min1 + min2
    RETURN money - cost IF cost <= money ELSE money
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> To minimize spend, find the two smallest elements in one pass using two tracking variables.

# 2706. Buy Two Chocolates

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buy-two-chocolates](https://leetcode.com/problems/buy-two-chocolates)
**Companies:** Amazon

---

## 1. Problem Description

Given an array `prices` and an integer `money`, buy two chocolates such that you still have non-negative leftover money. Maximize the leftover. If you can't buy any two, return `money`.

---

## Examples

| prices | money | output |
|--------|-------|--------|
| [1,2,2] | 3 | 0 |
| [3,2,3] | 3 | 3 |
| [1,1,1,1] | 2 | 0 |

*Explanation:* In the first example, buying chocolates priced 1 and 2 uses all money, leaving 0. In the second, no two chocolates can be bought within 3, so leftover remains 3.

---

## Approach: Find Two Cheapest — O(n) ✅

```text
FUNCTION buyChoco(prices, money):
    SET min1 ← INFINITY
    SET min2 ← INFINITY
    FOR p IN prices:
        IF p < min1:
            SET min2 ← min1
            SET min1 ← p
        ELSE IF p < min2:
            SET min2 ← p
    SET cost ← min1 + min2
    RETURN money - cost IF cost <= money ELSE money
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Walkthrough

Consider `prices = [1,2,2]`, `money = 3`.
1. Initialize `min1 = INF`, `min2 = INF`.
2. Iterate: p=1 → `min1=1`, `min2=INF`.
3. p=2 → `min2=2` (since 2 < INF).
4. p=2 → no change.
5. After loop, `cost = 1 + 2 = 3`.
6. `cost <= money`, so return `3 - 3 = 0`.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the price list.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you modify the solution if you needed to buy *k* chocolates instead of two?
2. What if each chocolate could be bought at most once and you must maximize the leftover while buying exactly two?
3. How would you handle the case where prices can be negative (e.g., discounts)?

---

## Key Takeaway

> To minimize spend, find the two smallest elements in one pass using two tracking variables.

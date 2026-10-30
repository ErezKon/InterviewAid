# 2706. Buy Two Chocolates

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buy-two-chocolates](https://leetcode.com/problems/buy-two-chocolates)
**Companies:** Amazon

---

## 1. Problem Description

You are given an integer array `prices` representing the prices of various chocolates in a store. You are also given a single integer `money`, which represents your initial amount of money.

You must buy **exactly** two chocolates in such a way that you still have some **non-negative** leftover money. You would like to minimize the sum of the prices of the two chocolates you buy.

Return *the amount of money you will have leftover after buying the two chocolates*. If there is no way for you to buy two chocolates without ending up in debt, return `money`. Note that the leftover must be non-negative.

**Constraints:**
- `2 ≤ prices.length ≤ 50`
- `1 ≤ prices[i] ≤ 100`
- `1 ≤ money ≤ 100`

---

## Examples

```
Example 1:
  Input: prices = [1,2,2], money = 3
  Output: 0
  Explanation: Purchase the chocolates priced at 1 and 2 units respectively. You will have 3 - 3 = 0 units of money afterwards. Thus, we return 0.

Example 2:
  Input: prices = [3,2,3], money = 3
  Output: 3
  Explanation: You cannot buy 2 chocolates without going in debt, so we return 3.
```

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

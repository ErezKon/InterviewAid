# 638. Shopping Offers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shopping-offers](https://leetcode.com/problems/shopping-offers)
**Companies:** Adobe, Airbnb, Amazon, Coupang, Google, Mathworks

---

## Problem Description

Given item prices, special bundle offers, and your needs, find the minimum cost to buy exactly what you need. You can use each offer unlimited times.

---

## Approach: DFS + Memoization ✅

```
FUNCTION shoppingOffers(price, special, needs):
    memo = {}

    FUNCTION dfs(needs):
        key = tuple(needs)
        IF key IN memo: RETURN memo[key]

        // Buy everything individually
        cost = SUM(price[i] * needs[i] for i)

        // Try each offer
        FOR offer IN special:
            newNeeds = [needs[i] - offer[i] for i in range(len(needs))]
            IF all(n >= 0 for n in newNeeds):
                cost = MIN(cost, offer[-1] + dfs(newNeeds))

        memo[key] = cost
        RETURN cost

    RETURN dfs(needs)
```

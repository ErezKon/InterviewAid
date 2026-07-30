# 638. Shopping Offers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shopping-offers](https://leetcode.com/problems/shopping-offers)
**Companies:** Adobe, Airbnb, Amazon, Coupang, Google, Mathworks

---

## Problem Description

Given item prices, special bundle offers, and your needs, find the minimum cost to buy exactly what you need. You can use each offer unlimited times.

---

## Approach: DFS + Memoization ✅

```text
FUNCTION shoppingOffers(price, special, needs):
    memo ← {}

    FUNCTION dfs(needs):
        key ← TUPLE(needs)
        IF key IN memo: RETURN memo[key]

        // Buy everything individually
        cost ← SUM(price[i] * needs[i] FOR i ← 0 TO LEN(needs)-1)

        // Try each offer
        FOR offer IN special:
            newNeeds ← []
            FOR i ← 0 TO LEN(needs)-1:
                newNeeds.APPEND(needs[i] - offer[i])
            IF ALL(n ≥ 0 FOR n IN newNeeds):
                cost ← MIN(cost, offer[-1] + dfs(newNeeds))

        memo[key] ← cost
        RETURN cost

    RETURN dfs(needs)
```

## Examples

**Example 1:**
```
price = [2,5]
special = [[3,0,5],[1,2,10]]
needs = [3,2]
```
Minimum cost is **14**.

**Example 2:**
```
price = [2,3,4]
special = [[1,1,0,5],[2,2,1,10]]
needs = [1,2,1]
```
Minimum cost is **13**.

## Walkthrough

For Example 1:
1. Start with needs **[3,2]**.
2. Try offer **[3,0,5]** → new needs **[0,2]**, cost **5 + dfs([0,2])**.
3. For **[0,2]**, buying individually costs **2*5 = 10**. No offer fits, so total **5+10 = 15**.
4. Try offer **[1,2,10]** directly → new needs **[2,0]**, cost **10 + dfs([2,0])**.
5. **[2,0]** can be satisfied by two copies of first offer (**2 * 5 = 10**) or buying individually (**2*2 = 4**). Choose **4**.
6. Total cost **10 + 4 = 14**, which is optimal.

## Complexity Analysis

- **Time:** O(N × M × K) where *N* is number of distinct need states, *M* number of offers, *K* number of items (bounded by small constants). Memoization ensures each state is computed once.
- **Space:** O(N) for memoization table plus recursion stack depth ≤ K.

## Follow-Up Questions

1. How would you modify the solution if each special offer could be used at most once?
2. Can you extend the approach to handle fractional quantities or discounts?
3. What if the number of items is large (e.g., 100) – which data structure would improve state lookup?

## Key Takeaway

Use DFS with memoization to explore all combinations of special offers, treating each unique need vector as a sub‑problem. This transforms an exponential search into a tractable DP solution.

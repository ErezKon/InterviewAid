# 638. Shopping Offers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shopping-offers](https://leetcode.com/problems/shopping-offers)
**Companies:** Adobe, Airbnb, Amazon, Coupang, Google, Mathworks

---

## Problem Description

In LeetCode Store, there are `n` items to sell. Each item has a price. However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price.

You are given an integer array `price` where `price[i]` is the price of the `i^th` item, and an integer array `needs` where `needs[i]` is the number of pieces of the `i^th` item you want to buy.

You are also given an array `special` where `special[i]` is of size `n + 1` where `special[i][j]` is the number of pieces of the `j^th` item in the `i^th` offer and `special[i][n]` (i.e., the last integer in the array) is the price of the `i^th` offer.

Return *the lowest price you have to pay for exactly certain items as given, where you could make optimal use of the special offers*. You are not allowed to buy more items than you want, even if that would lower the overall price. You could use any of the special offers as many times as you want.

**Constraints:**

- `n == price.length == needs.length`
- `1 <= n <= 6`
- `0 <= price[i], needs[i] <= 10`
- `1 <= special.length <= 100`
- `special[i].length == n + 1`
- `0 <= special[i][j] <= 50`
- The input is generated that at least one of `special[i][j]` is non-zero for `0 <= j <= n - 1`.

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

```
Example 1:
  Input: price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
  Output: 14
  Explanation: There are two kinds of items, A and B. Their prices are $2 and $5 respectively.
  In special offer 1, you can pay $5 for 3A and 0B
  In special offer 2, you can pay $10 for 1A and 2B.
  You need to buy 3A and 2B, so you may pay $10 for 1A and 2B (special offer #2), and $4 for 2A.
```

```
Example 2:
  Input: price = [2,3,4], special = [[1,1,0,4],[2,2,1,9]], needs = [1,2,1]
  Output: 11
  Explanation: The price of A is $2, and $3 for B, $4 for C.
  You may pay $4 for 1A and 1B, and $9 for 2A ,2B and 1C.
  You need to buy 1A ,2B and 1C, so you may pay $4 for 1A and 1B (special offer #1), and $3 for 1B, $4 for 1C.
  You cannot add more items, though only $9 for 2A ,2B and 1C.
```

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

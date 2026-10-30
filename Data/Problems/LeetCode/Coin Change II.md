# 518. Coin Change II

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/coin-change-ii](https://leetcode.com/problems/coin-change-ii)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Mastercard, Meta, Microsoft, Morgan Stanley, Pornhub, Salesforce, Tiktok, Zoho

---

## 1. Problem Description

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The **final** answer is **guaranteed** to fit into a signed **32-bit** integer.

**Constraints:**
- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All the values of `coins` are **unique**.
- `0 <= amount <= 5000`

---

## 2. Approach: DP (Unbounded Knapsack) — O(amount × n) ✅

```text
FUNCTION change(amount, coins):
    dp = array of (amount + 1) zeros
    dp[0] = 1

    FOR coin IN coins:               // coins in outer loop → combinations
        FOR j ← coin TO amount:
            dp[j] += dp[j - coin]

    RETURN dp[amount]
```

### Why coins in the outer loop?

If amount is in the outer loop, we count **permutations** (order matters). Coins in outer loop counts **combinations** (each coin sequence counted once).

| Time | Space |
|------|-------|
| O(amount × n) | O(amount) |

---

## 3. Examples

```
Example 1:
  Input: amount = 5, coins = [1,2,5]
  Output: 4
  Explanation: there are four ways to make up the amount:
    5=5
    5=2+2+1
    5=2+1+1+1
    5=1+1+1+1+1
```
```
Example 2:
  Input: amount = 3, coins = [2]
  Output: 0
  Explanation: the amount of 3 cannot be made up just with coins of 2.
```
```
Example 3:
  Input: amount = 10, coins = [10]
  Output: 1
```

---

## 4. Walkthrough

Consider `coins = [1,2,5]`, `amount = 5`.

1. Initialize `dp[0]=1`, others `0`.
2. Process `coin = 1`:
   - Update `dp[1] … dp[5]` adding `dp[j-1]` each time → `dp = [1,1,1,1,1,1]`.
3. Process `coin = 2`:
   - For `j=2`: `dp[2] += dp[0] → 2`.
   - `j=3`: `dp[3] += dp[1] → 2`.
   - `j=4`: `dp[4] += dp[2] → 3`.
   - `j=5`: `dp[5] += dp[3] → 3`.
   Resulting `dp = [1,1,2,2,3,3]`.
4. Process `coin = 5`:
   - `j=5`: `dp[5] += dp[0] → 4`.
5. Final `dp[5] = 4` → four combinations.

---

## 5. Complexity Analysis

- **Time:** O(amount × n) where `n` is number of coin types.
- **Space:** O(amount) for the DP array.

---

## 6. Follow-Up Questions

- How would you modify the solution to return the actual combinations instead of just the count?
- What if each coin could be used at most once (0/1 knapsack variant)?
- How does the solution change if you need the minimum number of coins for each amount?

---

## Key Takeaway

> Coin Change I minimizes coins (use `min`). Coin Change II counts combinations (use `+=`). The loop order (coins outer vs inner) determines combinations vs permutations.

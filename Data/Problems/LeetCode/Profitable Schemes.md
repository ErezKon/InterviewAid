# 879. Profitable Schemes

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google
---

## Problem Description
Given `n` members, a minimum profit `minProfit`, and two arrays `group` and `profit` where `group[i]` is the number of members required for the `i`‑th crime and `profit[i]` is the profit earned, return the number of schemes that generate at least `minProfit` profit using at most `n` members. The answer should be modulo `10^9 + 7`.

## Examples
| n | minProfit | group | profit | Output |
|---|-----------|-------|--------|--------|
| 5 | 3 | [2,2] | [2,3] | 2 |
| 10 | 5 | [2,3,5] | [6,7,8] | 7 |

## Approach
Use dynamic programming where `dp[j][k]` stores the number of ways to achieve profit `k` (capped at `minProfit`) using `j` members.
```
FUNCTION profitableSchemes(n, minProfit, group, profit):
    MOD ← 1_000_000_007
    dp ← MATRIX (n+1) × (minProfit+1) FILLED WITH 0
    dp[0][0] ← 1
    FOR i ← 0 TO LEN(group)-1:
        FOR j ← n DOWNTO group[i]:
            FOR k ← minProfit DOWNTO 0:
                SET newProfit ← MIN(k + profit[i], minProfit)
                dp[j][newProfit] ← (dp[j][newProfit] + dp[j - group[i]][k]) MOD MOD
    RETURN SUM(dp[j][minProfit] FOR j ← 0 TO n) MOD MOD
```
The loops iterate crimes, members (descending to avoid reuse), and profit (capped).

## Walkthrough
Consider `n=5`, `minProfit=3`, `group=[2,2]`, `profit=[2,3]`.
1. Initialise `dp[0][0]=1`.
2. Process first crime (`group=2`, `profit=2`): update states where using 2 members yields profit 2.
3. Process second crime (`group=2`, `profit=3`): combine with previous states, capping profit at 3.
4. Sum `dp[j][3]` for all `j≤5` → 2 schemes.

## Complexity Analysis
- Time: O(C * n * minProfit) where C is number of crimes.
- Space: O(n * minProfit).

## Follow‑Up Questions
- How to extend the solution to also limit the total number of crimes?
- Can the DP be optimized to use a 1‑D array?
- What changes are needed if profits can be negative?

## Key Takeaway
A 2‑dimensional DP over members and profit, iterating crimes in reverse member order, efficiently counts feasible profit schemes.

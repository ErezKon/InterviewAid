# 879. Profitable Schemes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/profitable-schemes](https://leetcode.com/problems/profitable-schemes)
**Companies:** Amazon, Google

---

## Problem Description

There is a group of `n` members, and a list of various crimes they could commit. The `i`th crime generates a `profit[i]` and requires `group[i]` members to participate in it. If a member participates in one crime, that member can't participate in another crime.

Let's call a **profitable scheme** any subset of these crimes that generates at least `minProfit` profit, and the total number of members participating in that subset of crimes is at most `n`.

Return the number of schemes that can be chosen. Since the answer may be very large, **return it modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 100`
- `0 <= minProfit <= 100`
- `1 <= group.length <= 100`
- `1 <= group[i] <= 100`
- `profit.length == group.length`
- `0 <= profit[i] <= 100`

## Examples

**Example 1:**
```
Input: n = 5, minProfit = 3, group = [2,2], profit = [2,3]
Output: 2
Explanation: To make a profit of at least 3, the group could either commit crimes 0 and 1, or just crime 1.
In total, there are 2 schemes.
```

**Example 2:**
```
Input: n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
Output: 7
Explanation: To make a profit of at least 5, the group could commit any crimes, as long as they commit one.
There are 7 possible schemes: (0), (1), (2), (0,1), (0,2), (1,2), and (0,1,2).
```

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

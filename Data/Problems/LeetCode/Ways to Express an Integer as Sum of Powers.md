# 2787. Ways to Express an Integer as Sum of Powers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers](https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-ppowers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given two integers `n` and `x`, count the number of ways to represent `n` as a sum of distinct integer powers `a^x` (where `a` is a positive integer). Each power may be used at most once. Return the count modulo `10^9+7`.

## Examples
- Input: `n = 10, x = 2` → Output: `2` (10 = 1^2 + 3^2, 10 = 10^1? actually 10 = 3^2 + 1^2). 
-  
-  

## Approach
Use a 0‑1 knapsack DP where each possible power `a^x` (≤ n) is an item with weight equal to its value. Iterate powers and update `dp[j]` backwards.

```text
FUNCTION numberOfWays(n, x):
    SET MOD ← 1_000_000_007
    SET dp ← ARRAY of size n+1 filled with 0
    SET dp[0] ← 1
    SET base ← 1
    WHILE base^x ≤ n:
        SET power ← base^x
        FOR j ← n DOWN TO power:
            SET dp[j] ← (dp[j] + dp[j - power]) MOD MOD
        SET base ← base + 1
    RETURN dp[n]
```

## Walkthrough 
| base | power | dp[10] after update |
|------|-------|----------------------|
| 1    | 1^x   | ... |
| 2    | 2^x   | ... |
| …    | …     | ... |

## Complexity 
- Time: O(m · n) where m is number of powers ≤ n.
- Space: O(n).

## Follow‑Up 
- How would you adapt the DP for unlimited use of each power?
- Can the solution be optimized using combinatorial formulas?
- What changes if `x` is large (e.g., 10) making few powers available?

## Key Takeaway
Treat each admissible power as a 0‑1 knapsack item and use backward DP to count distinct‑sum combinations.

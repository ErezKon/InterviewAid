# 3441. Minimum Cost Good Caption

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-cost-good-caption
**Companies:** Fractal Analytics, Tiktok

---
## Problem Description
Given a string `s` consisting of lowercase English letters, you may change any character at a cost of 1 per change. A *good caption* is a string where every maximal group of consecutive identical characters has length at least 3. Compute the minimum total cost to transform `s` into a good caption.

## Examples
**Example 1**
Input: s = "aaabbb"
Output: 0
Explanation: The string already satisfies the condition; each group ("aaa", "bbb") has length ≥ 3.

**Example 2**
Input: s = "abac"
Output: 2
Explanation: Change to "aaabb" (cost 2) or any other valid configuration.

## Approach
**Algorithm:** DP over positions and ending character
We process the string left‑to‑right. `dp[i][c]` stores the minimum cost to make the prefix `s[0..i]` valid and end with a run of character `c` whose length is at least 3. For each position we consider extending the current run or starting a new run of length ≥ 3, updating costs accordingly. The state space is `O(26·n)`.

```text
FUNCTION minCostGoodCaption(s):
    n ← LEN(s)
    INF ← LARGE_NUMBER
    dp ← MATRIX (n+1) × 26, filled with INF
    // Base: no characters processed
    FOR c ← 0 TO 25:
        dp[0][c] ← 0
    
    FOR i ← 1 TO n:
        FOR curChar ← 0 TO 25:
            // cost to make s[i-1] become curChar
            changeCost ← 0 IF ORD(s[i-1]) - ORD('a') = curChar ELSE 1
            // Extend previous run of same character
            dp[i][curChar] ← MIN(dp[i][curChar], dp[i-1][curChar] + changeCost)
            // Start a new run of length ≥3 ending at i
            // Look back at positions i-3, i-2, i-1 to form a new run of curChar
            IF i ≥ 3:
                runCost ← 0
                FOR k ← i-3 TO i-1:
                    runCost ← runCost + (0 IF ORD(s[k]) - ORD('a') = curChar ELSE 1)
                // previous state must end with a different character
                minPrev ← MIN(dp[i-3][prev] FOR prev ≠ curChar)
                dp[i][curChar] ← MIN(dp[i][curChar], minPrev + runCost)
    
    RETURN MIN(dp[n][c] FOR c ← 0 TO 25)
```

## Walkthrough
Consider `s = "abac"` (n=4).
1. Initialize `dp[0][*] = 0`.
2. Process each position, updating costs for extending runs or starting new runs of length 3.
3. After processing all characters, the minimum across all ending characters yields 2, matching the optimal cost.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(26·n) – linear in string length with constant factor 26 |
| Space  | O(26·n) for the DP matrix (can be reduced to O(26) with rolling rows) |

## Follow‑Up Questions
1. How would the solution change if the minimum run length were a variable `k` instead of 3?
2. Can you adapt the DP to also output one possible transformed string achieving the minimum cost?
3. What is the impact on complexity if the alphabet size were large (e.g., Unicode characters)?

## Key Takeaway
By modeling the problem as a DP over the last character and ensuring runs reach the required length before closing, we obtain an optimal O(26·n) solution for minimizing the cost of a good caption.

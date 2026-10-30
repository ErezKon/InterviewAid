# 3441. Minimum Cost Good Caption

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-cost-good-caption
**Companies:** Fractal Analytics, Tiktok

---
## Problem Description
You are given a string `caption` of length `n`. A **good** caption is a string where **every** character appears in groups of **at least 3** consecutive occurrences.

For example:
- `"aaabbb"` and `"aaaaccc"` are **good** captions.
- `"aabbb"` and `"ccccd"` are **not** good captions.

You can perform the following operation **any** number of times:

Choose an index `i` (where `0 <= i < n`) and change the character at that index to either:
- The character immediately **before** it in the alphabet (if `caption[i] != 'a'`).
- The character immediately **after** it in the alphabet (if `caption[i] != 'z'`).

Your task is to convert the given `caption` into a **good** caption using the **minimum** number of operations, and return it. If there are **multiple** possible good captions, return the **lexicographically smallest** one among them. If it is **impossible** to create a good caption, return an empty string `""`.

**Constraints:**
- `1 <= caption.length <= 5 * 10⁴`
- `caption` consists only of lowercase English letters.

## Examples

```
Example 1:
  Input: caption = "cdcd"
  Output: "cccc"
  Explanation: It can be shown that the given caption cannot be transformed into a good caption with fewer than 2 operations. The possible good captions that can be created using exactly 2 operations are:
  - "dddd": Change caption[0] and caption[2] to their next character 'd'.
  - "cccc": Change caption[1] and caption[3] to their previous character 'c'.
  Since "cccc" is lexicographically smaller than "dddd", return "cccc".
```

```
Example 2:
  Input: caption = "aca"
  Output: "aaa"
  Explanation: It can be proven that the given caption requires at least 2 operations to be transformed into a good caption. The only good caption that can be obtained with exactly 2 operations is as follows:
  - Operation 1: Change caption[1] to 'b'. caption = "aba".
  - Operation 2: Change caption[1] to 'a'. caption = "aaa".
  Thus, return "aaa".
```

```
Example 3:
  Input: caption = "bc"
  Output: ""
  Explanation: It can be shown that the given caption cannot be converted to a good caption by using any number of operations.
```

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

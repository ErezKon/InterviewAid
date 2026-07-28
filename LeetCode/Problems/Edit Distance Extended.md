# String DP Patterns

Related: #72 Edit Distance, #1143 LCS, #516 LPS, #115 Distinct Subseq, #10 Regex, #44 Wildcard

---

## Problem Description
Many string problems can be expressed as a dynamic programming (DP) table where `dp[i][j]` represents the answer for the prefixes `s1[0..i-1]` and `s2[0..j-1]`. Typical examples include Edit Distance, Longest Common Subsequence, and Distinct Subsequences. The challenge is to define the transition based on character matches and mismatches.

## Examples
- **Edit Distance** between "horse" and "ros" → 3 operations.
- **LCS** of "abcde" and "ace" → length 3.
- **Distinct Subseq** counting "rabbbit" → 3 ways to form "rabbit".

## Approach
Use a 2‑D DP table initialized for empty prefixes. Fill row‑wise using the recurrence:

```text
FUNCTION TwoStringDP(s1, s2):
    SET m ← LENGTH(s1)
    SET n ← LENGTH(s2)
    CREATE dp[0..m][0..n]
    FOR i ← 0 TO m:
        dp[i][0] ← baseCase(i, 0)
    FOR j ← 0 TO n:
        dp[0][j] ← baseCase(0, j)
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF s1[i-1] == s2[j-1]:
                dp[i][j] ← matchTransition(dp, i, j)
            ELSE:
                dp[i][j] ← mismatchTransition(dp, i, j)
    RETURN dp[m][n]
```
`matchTransition` and `mismatchTransition` are problem‑specific (e.g., add 1 for edit, take max for LCS).

## Walkthrough
Consider Edit Distance for "int" → "sint" (insert 's'):
| i | j | s1[i‑1] | s2[j‑1] | dp[i][j] |
|---|---|--------|--------|----------|
|0|0| – | – |0|
|1|1| i | s | dp[0][1]+1 =1 |
|1|2| i | i | dp[0][1] (match) =0 |
|2|3| n | n | dp[1][2] (match) =0 |
|3|4| t | t | dp[2][3] (match) =0 |
Result dp[3][4] = 1 insertion.

## Complexity Analysis
- **Time:** O(m·n) – fill each cell once.
- **Space:** O(m·n) for the table (can be reduced to O(min(m,n)) with rolling arrays).

## Follow-Up Questions
1. How can you optimize space for large strings?
2. How would you adapt the template for three‑string DP problems like "Longest Common Subsequence of three strings"?
3. Can you convert the DP to a recursive memoization solution?

## Key Takeaway
A unified two‑string DP template lets you solve a family of string alignment problems by customizing the match and mismatch transitions.

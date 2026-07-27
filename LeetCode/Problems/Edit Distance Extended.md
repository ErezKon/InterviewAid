# String DP Patterns

Related: #72 Edit Distance, #1143 LCS, #516 LPS, #115 Distinct Subseq, #10 Regex, #44 Wildcard

---

## Two-String DP Template

```
dp[i][j] = answer for s1[0..i-1] and s2[0..j-1]

FOR i ← 0 TO m:
    FOR j ← 0 TO n:
        IF s1[i-1] == s2[j-1]:
            dp[i][j] = f(dp[i-1][j-1])        // characters match
        ELSE:
            dp[i][j] = g(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])  // don't match
```

### Instantiations

| Problem | Match | No Match |
|---------|-------|----------|
| Edit Distance | `dp[i-1][j-1]` | `1 + min(insert, delete, replace)` |
| LCS | `dp[i-1][j-1] + 1` | `max(dp[i-1][j], dp[i][j-1])` |
| Distinct Subseq | `dp[i-1][j-1] + dp[i-1][j]` | `dp[i-1][j]` |

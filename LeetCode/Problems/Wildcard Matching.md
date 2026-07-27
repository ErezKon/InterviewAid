# 44. Wildcard Matching

**Difficulty:** 🔴 Hard
**Acceptance:** 27.0%
**LeetCode:** [https://leetcode.com/problems/wildcard-matching](https://leetcode.com/problems/wildcard-matching)
**Companies:** Amazon, Atlassian, Bloomberg, Coupang, De Shaw, Google, Infosys, Instacart, Meta, Microsoft, Oracle, Snapchat, Tiktok, Twitter, Two Sigma, Walmart Labs, Zoho

---

## 1. Problem Description

Given a string `s` and a pattern `p`, implement wildcard matching: `?` matches any single character, `*` matches any sequence (including empty).

---

## 2. Approach: DP — O(m·n) ✅

```
FUNCTION isMatch(s, p):
    m, n = len(s), len(p)
    dp = (m+1) × (n+1) boolean matrix
    dp[0][0] = true

    FOR j ← 1 TO n:
        IF p[j-1] == '*': dp[0][j] = dp[0][j-1]

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF p[j-1] == s[i-1] OR p[j-1] == '?':
                dp[i][j] = dp[i-1][j-1]
            ELSE IF p[j-1] == '*':
                dp[i][j] = dp[i-1][j] OR dp[i][j-1]
                // dp[i-1][j]: * matches current char (consume one more)
                // dp[i][j-1]: * matches empty sequence

    RETURN dp[m][n]
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Unlike regex matching (#10), `*` here independently matches any sequence — simpler DP with two cases: consume a character or match empty.

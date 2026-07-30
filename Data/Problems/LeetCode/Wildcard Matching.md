# 44. Wildcard Matching

**Difficulty:** 🔴 Hard
**Acceptance:** 27.0%
**LeetCode:** [https://leetcode.com/problems/wildcard-matching](https://leetcode.com/problems/wildcard-matching)
**Companies:** Amazon, Atlassian, Bloomberg, Coupang, De Shaw, Google, Infosys, Instacart, Meta, Microsoft, Oracle, Snapchat, Tiktok, Twitter, Two Sigma, Walmart Labs, Zoho

---

## 1. Problem Description

Given a string `s` and a pattern `p`, implement wildcard matching: `?` matches any single character, `*` matches any sequence (including empty).

---

## 2. Examples

| s | p | Output |
|---|---|--------|
| "aa" | "a" | false |
| "aa" | "*" | true |
| "cb" | "?a" | false |
| "adceb" | "*a*b" | true |

---

## 3. Approach

Dynamic Programming (DP) – build a table `dp[i][j]` indicating whether `s[0..i-1]` matches `p[0..j-1]`.

```text
FUNCTION isMatch(s, p):
    SET m ← LENGTH(s)
    SET n ← LENGTH(p)
    CREATE dp (m+1) × (n+1) boolean matrix
    SET dp[0][0] ← true
    FOR j ← 1 TO n:
        IF p[j-1] == '*':
            SET dp[0][j] ← dp[0][j-1]
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF p[j-1] == s[i-1] OR p[j-1] == '?':
                SET dp[i][j] ← dp[i-1][j-1]
            ELSE IF p[j-1] == '*':
                SET dp[i][j] ← dp[i-1][j] OR dp[i][j-1]
    RETURN dp[m][n]
```

---

## 4. Walkthrough

Consider `s = "adceb"`, `p = "*a*b"`.

| i (s) | j (p) | dp[i][j] | Reason |
|-------|-------|----------|--------|
| 0 | 0 | true | empty matches empty |
| 0 | 1 | true | `*` can match empty |
| 1 (a) | 2 (a) | true | characters equal |
| 5 (b) | 5 (b) | true | final match via `*` handling |

The table shows a true value at `dp[5][5]`, so the strings match.

---

## 5. Complexity Analysis

- **Time:** O(m·n) where *m* = len(s), *n* = len(p).
- **Space:** O(m·n) for the DP matrix (can be optimized to O(n)).

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to support `+` (one or more characters) as a wildcard?
- Can you achieve O(1) extra space by using two rolling arrays?
- What changes are needed for case‑insensitive matching?

---

## Key Takeaway

> Wildcard matching reduces to a DP table with two cases for `*`: consume a character or match an empty sequence.

# 10. Regular Expression Matching

**Difficulty:** 🔴 Hard
**Acceptance:** 28.0%
**LeetCode:** [https://leetcode.com/problems/regular-expression-matching](https://leetcode.com/problems/regular-expression-matching)
**Companies:** Accenture, Airbnb, Amazon, Apple, Bloomberg, Bytedance, Cockroach Labs, Coupang, Google, Infosys, Meta, Microsoft, Netskope, Oracle, Phonepe, Rokt, Snowflake, Sprinklr, Tcs, Tiktok, Twitter, Uber, Waymo, Worldquant, Zoho

---

## 1. Problem Description

Given a string `s` and a pattern `p`, implement regular expression matching with support for `.` (matches any single character) and `*` (matches zero or more of the preceding element).

The matching should cover the **entire** input string.

---

## 2. Examples

```
Example 1: s = "aa", p = "a"     → false
Example 2: s = "aa", p = "a*"    → true
Example 3: s = "ab", p = ".*"    → true
```

---

## 3. Approach: DP — O(m·n) ✅

`dp[i][j]` = does `s[0..i-1]` match `p[0..j-1]`?

```
FUNCTION isMatch(s, p):
    m, n = len(s), len(p)
    dp = (m+1) × (n+1) boolean matrix, all false
    dp[0][0] = true

    // Base case: patterns like "a*b*c*" can match empty string
    FOR j ← 1 TO n:
        IF p[j-1] == '*':
            dp[0][j] = dp[0][j-2]

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF p[j-1] == s[i-1] OR p[j-1] == '.':
                dp[i][j] = dp[i-1][j-1]
            ELSE IF p[j-1] == '*':
                // Zero occurrences of preceding element
                dp[i][j] = dp[i][j-2]
                // One or more occurrences (if preceding matches current char)
                IF p[j-2] == s[i-1] OR p[j-2] == '.':
                    dp[i][j] = dp[i][j] OR dp[i-1][j]

    RETURN dp[m][n]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) |
| **Space** | O(m·n) |

---

## 5. Follow-Up Questions

### 5.1 Wildcard Matching (LeetCode #44)?

`?` matches one char, `*` matches any sequence (including empty). Simpler DP — `*` doesn't depend on the preceding element.

### 5.2 Can this be solved with actual regex engines?

Yes, but Thompson's NFA-based approach is O(m·n). Backtracking-based engines (like Perl/Python) can be exponential on adversarial patterns.

---

## Key Takeaway

> The `*` operator is the tricky part — it can match **zero** (skip the `x*` pair → `dp[i][j-2]`) or **one or more** (if `x` matches current char → `dp[i-1][j]`, allowing the `*` to consume another character). This DP is a classic that appears in many string matching variants.

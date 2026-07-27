# 2430. Maximum Deletions on a String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-deletions-on-a-string](https://leetcode.com/problems/maximum-deletions-on-a-string)
**Companies:** De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP + LCP — O(n²)](#approach-dp--lcp--on²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, repeatedly delete the longest prefix that equals the following substring of the same length. Maximize the number of deletions.

**Constraints:**
- `1 ≤ n ≤ 4000`

---

## Key Insight

> `dp[i]` = max deletions starting from index i. For each length `len` (1 to remaining/2), check if `s[i..i+len-1] == s[i+len..i+2*len-1]`. If so, `dp[i] = max(dp[i], dp[i+len] + 1)`. Precompute LCP (Longest Common Prefix) to speed up equality checks.

---

## Approach: DP + LCP — O(n²) ✅

```
FUNCTION deleteString(s):
    n = len(s)
    // Precompute LCP[i][j] = length of longest common prefix of s[i:] and s[j:]
    lcp = (n+1) × (n+1) of 0
    FOR i ← n - 1 DOWNTO 0:
        FOR j ← n - 1 DOWNTO 0:
            IF s[i] == s[j]:
                lcp[i][j] = lcp[i+1][j+1] + 1

    dp = [1] * n    // base: delete entire remaining string
    FOR i ← n - 1 DOWNTO 0:
        FOR length ← 1 TO (n - i) / 2:
            IF lcp[i][i + length] >= length:
                dp[i] = MAX(dp[i], dp[i + length] + 1)

    RETURN dp[0]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP + LCP | **O(n²)** | O(n²) |

---

## Key Takeaway

> **Precompute LCP array to enable O(1) substring equality checks.** Then DP from right to left, trying all valid prefix lengths.

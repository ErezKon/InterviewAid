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
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
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

```text
FUNCTION deleteString(s):
    n ← LENGTH(s)
    // Precompute LCP[i][j] = length of longest common prefix of s[i:] and s[j:]
    lcp ← MATRIX(n+1, n+1) FILLED WITH 0
    FOR i ← n - 1 DOWNTO 0:
        FOR j ← n - 1 DOWNTO 0:
            IF s[i] = s[j]:
                lcp[i][j] ← lcp[i+1][j+1] + 1
    dp ← ARRAY(n) FILLED WITH 1    // base: delete entire remaining string
    FOR i ← n - 1 DOWNTO 0:
        FOR length ← 1 TO (n - i) / 2:
            IF lcp[i][i + length] ≥ length:
                dp[i] ← MAX(dp[i], dp[i + length] + 1)
    RETURN dp[0]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP + LCP | **O(n²)** | O(n²) |

---

## Examples

**Example 1:**
```
Input:  s = "abcabcabc"
Output: 3
Explanation:
- Delete prefix "abc" (matches next "abc"), string becomes "abcabc".
- Delete prefix "abc" again, string becomes "abc".
- Delete remaining "abc".
Total deletions = 3.
```

**Example 2:**
```
Input:  s = "aaaa"
Output: 2
Explanation:
- Delete prefix "aa" (matches next "aa"), string becomes "aa".
- Delete remaining "aa".
Total deletions = 2.
```

---

## Walkthrough

Consider the first example `"abcabcabc"`:
| Step | Remaining String | Action |
|------|------------------|--------|
| 1 | abcabcabc | Prefix `"abc"` equals next `"abc"` → delete first 3 chars |
| 2 | abcabc | Prefix `"abc"` equals next `"abc"` → delete first 3 chars |
| 3 | abc | No further equal prefix, delete whole string |
The DP computes the optimal deletions by checking all possible prefix lengths using the pre‑computed LCP table.

---

## Follow-Up Questions
- How would the solution change if deletions could be performed on any equal substring, not just prefixes?
- Can the LCP pre‑computation be optimized to O(n) using suffix arrays or Z‑algorithm?
- How would you adapt the algorithm for a streaming input where the string is received character by character?

---

## Key Takeaway

> **Precompute LCP array to enable O(1) substring equality checks.** Then DP from right to left, trying all valid prefix lengths.

# 2955. Number of Same-End Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-same-end-substrings](https://leetcode.com/problems/number-of-same-end-substrings)
**Companies:** Google, Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Count per Character — O(n + 26q)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Answer queries: for substring `s[l..r]`, count substrings where the first and last character are the same.

---

## Examples

**Example 1:**
```
Input: s = "abcab", queries = [[0,4],[1,3]]
Output: [7,3]
Explanation:
- For range [0,4] ("abcab"), same‑end substrings are: a, b, c, a, b, aa, bb → 7.
- For range [1,3] ("bca"), they are: b, c, a → 3.
```
---

## Walkthrough

For the whole string, build a prefix count for each of the 26 letters.
- `prefix[c][i]` = occurrences of character `c` in `s[0..i-1]`.
When answering a query `[l,r]`, for each character `c` compute `k = prefix[c][r+1] - prefix[c][l]`. The contribution is `k*(k+1)/2` (single letters + pairs). Sum over all characters.
---

## 2. Key Insight

> For each character `c`, count its occurrences `k` in the range. It contributes `k + C(k,2)` = `k*(k+1)/2` same‑end substrings (single chars + pairs). Use prefix sums per character.

---

## 3. Approach: Prefix Count per Character — O(n + 26q) ✅

```text
FUNCTION sameEndSubstringCount(s, queries):
    n ← LENGTH(s)
    // 1. Build prefix counts for each character
    prefix ← MATRIX[26][n+1] initialized to 0
    FOR i ← 0 TO n-1:
        FOR c ← 0 TO 25:
            prefix[c][i+1] ← prefix[c][i]
        idx ← ASCII(s[i]) - ASCII('a')
        prefix[idx][i+1] ← prefix[idx][i+1] + 1

    // 2. Answer each query
    result ← []
    FOR [l, r] IN queries:
        total ← 0
        FOR c ← 0 TO 25:
            k ← prefix[c][r+1] - prefix[c][l]
            total ← total + k * (k + 1) / 2
        result.APPEND(total)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(26·n + 26·q) |
| **Space** | O(26·n) |

---

## Follow-Up Questions

- How would you handle Unicode characters beyond the English alphabet?
- Can you answer queries online as the string is updated (dynamic updates)?

---

## 5. Key Takeaway

> **Per‑character prefix sums.** For each character in a range, `k` occurrences contribute `k*(k+1)/2` same‑end substrings. Sum over all 26 characters.

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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a **0-indexed** string `s`, and a 2D array of integers `queries`, where `queries[i] = [l_i, r_i]` indicates a substring of `s` starting from the index `l_i` and ending at the index `r_i` (both **inclusive**), i.e. `s[l_i..r_i]`.

Return *an array *`ans`* where* `ans[i]` *is the number of **same-end** substrings of* `queries[i]`.

A **0-indexed** string `t` of length `n` is called **same-end** if it has the same character at both of its ends, i.e., `t[0] == t[n - 1]`.

A **substring** is a contiguous non-empty sequence of characters within a string.

**Constraints:**
- `2 <= s.length <= 3 * 10^4`
- `s` consists only of lowercase English letters.
- `1 <= queries.length <= 3 * 10^4`
- `queries[i] = [l_i, r_i]`
- `0 <= l_i <= r_i < s.length`

---

## Examples

**Example 1:**
```
Input: s = "abcaab", queries = [[0,0],[1,4],[2,5],[0,5]]
Output: [1,5,5,10]
Explanation: Here is the same-end substrings of each query:
1^st query: s[0..0] is "a" which has 1 same-end substring: "a".
2^nd query: s[1..4] is "bcaa" which has 5 same-end substrings: "bcaa", "bcaa", "bcaa", "bcaa", "bcaa".
3^rd query: s[2..5] is "caab" which has 5 same-end substrings: "caab", "caab", "caab", "caab", "caab".
4^th query: s[0..5] is "abcaab" which has 10 same-end substrings: "abcaab", "abcaab", "abcaab", "abcaab", "abcaab", "abcaab", "abcaab", "abcaab", "abcaab", "abcaab".
```

**Example 2:**
```
Input: s = "abcd", queries = [[0,3]]
Output: [4]
Explanation: The only query is s[0..3] which is "abcd". It has 4 same-end substrings: "abcd", "abcd", "abcd", "abcd".
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

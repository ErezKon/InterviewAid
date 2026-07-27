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

## 2. Key Insight

> For each character `c`, count its occurrences `k` in the range. It contributes `k + C(k,2)` = `k*(k+1)/2` same-end substrings (single chars + pairs). Use prefix sums per character.

---

## 3. Approach: Prefix Count per Character — O(n + 26q) ✅

```
FUNCTION sameEndSubstringCount(s, queries):
    n = len(s)
    prefix = [[0]*(n+1) for _ in range(26)]
    FOR i ← 0 TO n-1:
        FOR c ← 0 TO 25:
            prefix[c][i+1] = prefix[c][i]
        prefix[ord(s[i])-ord('a')][i+1] += 1

    result = []
    FOR [l, r] IN queries:
        total = 0
        FOR c ← 0 TO 25:
            k = prefix[c][r+1] - prefix[c][l]
            total += k * (k + 1) / 2
        result.ADD(total)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(26n + 26q) |
| **Space** | O(26n) |

---

## 5. Key Takeaway

> **Per-character prefix sums.** For each character in a range, `k` occurrences contribute `k*(k+1)/2` same-end substrings. Sum over all 26 characters.

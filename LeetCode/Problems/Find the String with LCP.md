# 2573. Find the String with LCP

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-string-with-lcp](https://leetcode.com/problems/find-the-string-with-lcp)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Construction + Validation — O(n²) ✅](#3-approach-greedy-construction--validation--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `n × n` LCP matrix where `lcp[i][j]` is the longest common prefix of `s[i..]` and `s[j..]`, construct the lexicographically smallest string `s` that produces this LCP matrix, or return empty if impossible.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Key Insight

> Use Union-Find: if `lcp[i][j] > 0`, positions `i` and `j` must share the same character. Greedily assign the smallest character to each group. Then validate the constructed string against the LCP matrix.

---

## 3. Approach: Greedy Construction + Validation — O(n²) ✅

```
FUNCTION findTheString(lcp):
    n ← LENGTH(lcp)
    s ← ['\0'] * n; c ← 'a'

    FOR i ← 0 TO n - 1 DO
        IF s[i] != '\0' THEN CONTINUE
        IF c > 'z' THEN RETURN ""
        FOR j ← i TO n - 1 DO
            IF lcp[i][j] > 0 THEN s[j] ← c
        c += 1

    // Validate: rebuild LCP and check it matches
    FOR i ← n-1 DOWNTO 0 DO
        FOR j ← n-1 DOWNTO 0 DO
            IF s[i] == s[j] THEN
                expected ← (1 + lcp[i+1][j+1]) if i+1<n and j+1<n else 1
            ELSE expected ← 0
            IF expected != lcp[i][j] THEN RETURN ""

    RETURN s
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Greedy character assignment** using the LCP matrix constraints, followed by O(n²) validation. The key is that `lcp[i][j] > 0` implies `s[i] == s[j]`.

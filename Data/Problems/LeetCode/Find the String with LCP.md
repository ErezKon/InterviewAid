# 2573. Find the String with LCP

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-string-with-lcp](https://leetcode.com/problems/find-the-string-with-lcp)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy Construction + Validation — O(n²) ✅](#3-approach-greedy-construction--validation--on²-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an `n × n` LCP matrix where `lcp[i][j]` is the longest common prefix of `s[i..]` and `s[j..]`, construct the lexicographically smallest string `s` that produces this LCP matrix, or return empty if impossible.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Examples

| Input | Output |
|-------|--------|
| `[[0,1,0],[1,0,1],[0,1,0]]` | `"aba"` |
| `[[0,2,1],[2,0,2],[1,2,0]]` | `""` |

*Explanation*: The first matrix can be satisfied by `"aba"`; the second violates LCP properties, so no string exists.

---

## 3. Approach: Greedy Construction + Validation — O(n²) ✅

```text
FUNCTION findTheString(lcp):
    n ← LENGTH(lcp)
    s ← ['\0'] * n; c ← 'a'

    FOR i ← 0 TO n - 1 DO
        IF s[i] != '\0' THEN CONTINUE
        IF c > 'z' THEN RETURN ""
        FOR j ← i TO n - 1 DO
            IF lcp[i][j] > 0 THEN s[j] ← c
        c ← NEXT_CHAR(c)

    // Validate: rebuild LCP and compare
    FOR i ← n-1 DOWNTO 0 DO
        FOR j ← n-1 DOWNTO 0 DO
            IF s[i] == s[j] THEN
                expected ← 1 + (lcp[i+1][j+1] IF i+1<n AND j+1<n ELSE 0)
            ELSE expected ← 0
            IF expected != lcp[i][j] THEN RETURN ""

    RETURN JOIN(s)
```

---

## 4. Walkthrough

Consider `n = 3` with the first example matrix.
1. Start with `i = 0`, assign `'a'` to positions where `lcp[0][j] > 0` → `s = [a, a, \0]`.
2. Move to `i = 1`, `'b'` is the next unused character, assign to `j = 1,2` where `lcp[1][j] > 0` → `s = [a, b, b]`.
3. Validation recomputes LCP from `s = "abb"` and matches the original matrix, confirming correctness.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) – greedy assignment + validation |
| **Space** | O(n) – result string and temporary variables |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm if the alphabet size were larger than 26?
- Can the validation step be optimized to O(n) using prefix hashes?
- What changes are needed if the LCP matrix is not guaranteed to be symmetric?

---

## 7. Key Takeaway

> **Greedy character assignment** using the LCP matrix constraints, followed by O(n²) validation. The key is that `lcp[i][j] > 0` implies `s[i] == s[j]`.

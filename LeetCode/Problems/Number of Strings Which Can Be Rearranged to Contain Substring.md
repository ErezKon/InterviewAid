# 2930. Number of Strings Which Can Be Rearranged to Contain Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring](https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring)
**Companies:** Meesho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Inclusion-Exclusion — O(log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count length-`n` lowercase strings that can be rearranged to contain "leet" as a substring. Return mod 10⁹+7.

---

## 2. Key Insight

> A string contains "leet" as a rearranged substring iff it has ≥1 'l', ≥2 'e', ≥1 't'. Use inclusion-exclusion: total - (missing 'l' OR missing enough 'e' OR missing 't').

---

## 3. Approach: Inclusion-Exclusion — O(log n) ✅

```
FUNCTION stringCount(n):
    MOD = 10^9 + 7
    // Total = 26^n
    // Subtract strings missing l, missing 2 e's, or missing t
    // Add back double-missing, subtract triple-missing
    // Use inclusion-exclusion with fast modular exponentiation
    total = 26^n
    // ... inclusion-exclusion terms with 25^n, 24^n, etc.
    RETURN (total - bad + MOD) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — modular exponentiation |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Inclusion-exclusion on character requirements.** Count strings missing each required character, combine with inclusion-exclusion. Only O(log n) via modular exponentiation.

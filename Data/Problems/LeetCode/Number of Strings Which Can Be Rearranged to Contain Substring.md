# 2930. Number of Strings Which Can Be Rearranged to Contain Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring](https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring)
**Companies:** Meesho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Inclusion-Exclusion — O(log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count length‑`n` lowercase strings that can be rearranged to contain the substring "leet". Return the count modulo 10⁹+7.

---

## 2. Examples

| n | Output | Explanation |
|---|--------|-------------|
| 4 | 1 | Only the string "leet" itself satisfies the requirement. |
| 5 | 26 | Any string that contains the multiset {l, e, e, t} plus one arbitrary letter (26 choices). |
| 2 | 0 | Too short to hold "leet" after any rearrangement. |

---

## 3. Key Insight

> A string can be rearranged to contain "leet" iff it has at least one `'l'`, at least two `'e'`s, and at least one `'t'`. Use inclusion‑exclusion on the sets of strings missing each required character.

---

## 4. Approach: Inclusion-Exclusion — O(log n) ✅

```text
FUNCTION countStrings(n):
    SET MOD ← 1_000_000_007
    // total strings of length n
    SET total ← pow(26, n) MOD MOD
    // strings missing 'l'
    SET missL ← pow(25, n) MOD MOD
    // strings missing at least two 'e's (i.e., <2 e's) – treat as missing one 'e' then adjust
    SET missE1 ← pow(25, n) MOD MOD   // missing at least one 'e'
    SET missE2 ← pow(24, n) MOD MOD   // missing at least two 'e's (both e's absent)
    // strings missing 't'
    SET missT ← pow(25, n) MOD MOD
    // double‑missing combinations
    SET missL_E1 ← pow(24, n) MOD MOD
    SET missL_T  ← pow(24, n) MOD MOD
    SET missE1_T ← pow(24, n) MOD MOD
    // triple‑missing (missing l, at least one e, and t)
    SET missAll ← pow(23, n) MOD MOD
    // Inclusion‑exclusion: good = total - (missL + missE2 + missT) + (missL_E1 + missL_T + missE1_T) - missAll
    SET good ← (total - (missL + missE2 + missT) + (missL_E1 + missL_T + missE1_T) - missAll) MOD MOD
    RETURN good
```

---

## 5. Walkthrough

**Example:** `n = 5`

1. **Total strings:** `26⁵ = 11,881,376`
2. **Missing `'l'`:** `25⁵ = 9,765,625`
3. **Missing at least two `'e'`:** `24⁵ = 7,962,624`
4. **Missing `'t'`:** `25⁵ = 9,765,625`
5. **Double‑missing (`'l'` & at least one `'e'`):** `24⁵ = 7,962,624`
6. **Double‑missing (`'l'` & `'t'`):** `24⁵ = 7,962,624`
7. **Double‑missing (one `'e'` & `'t'`):** `24⁵ = 7,962,624`
8. **Triple‑missing:** `23⁵ = 6,436,343`
9. **Apply inclusion‑exclusion:**
   `good = total - (missL + missE2 + missT) + (missL_E1 + missL_T + missE1_T) - missAll`
   `good = 11,881,376 - (9,765,625 + 7,962,624 + 9,765,625) + (7,962,624*3) - 6,436,343 = 26`
Thus there are 26 valid strings of length 5.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) – fast exponentiation for each power term |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the required substring were of length k with arbitrary character multiplicities?
2. Can you derive a formula that works without modular exponentiation for very small `n`?
3. How would you extend the approach to count strings that must contain multiple distinct substrings after rearrangement?

---

## 8. Key Takeaway

> **Inclusion‑exclusion on character requirements** lets you count strings that can be rearranged to contain a target substring in logarithmic time via modular exponentiation.

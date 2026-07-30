# 1071. Greatest Common Divisor of Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/greatest-common-divisor-of-strings](https://leetcode.com/problems/greatest-common-divisor-of-strings)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: GCD of Lengths — O(n) ✅](#3-approach-gcd-of-lengths--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Find the largest string `x` such that `x` divides both `str1` and `str2` (i.e., both are formed by concatenating `x`).

---

## 2. Key Insight

> If `str1 + str2 == str2 + str1`, they share a GCD string of length `GCD(len1, len2)`. Otherwise, no common divisor exists.

---

## 3. Approach: GCD of Lengths — O(n) ✅

```text
FUNCTION gcdOfStrings(str1, str2):
    IF str1 + str2 != str2 + str1:
        RETURN ""
    g ← GCD(LENGTH(str1), LENGTH(str2))
    RETURN SUBSTRING(str1, 0, g)
```

---

## 4. Examples

| str1 | str2 | Output |
|------|------|--------|
| "ABCABC" | "ABC" | "ABC" |
| "ABABAB" | "ABAB" | "AB" |
| "LEET" | "CODE" | "" |

---

## 5. Walkthrough

1. Check if `str1 + str2` equals `str2 + str1`. If not, return empty string.
2. Compute `g = GCD(LENGTH(str1), LENGTH(str2))`.
3. Return the prefix of `str1` with length `g` as the GCD string.

---

## 6. Complexity Analysis

- **Time:** O(n) where n is the total length of the two strings (for the concatenation check and GCD computation).
- **Space:** O(1) extra space besides the input strings.

---

## 7. Key Takeaway

> The **commutativity check** (`s1+s2 == s2+s1`) proves a common pattern exists. Its length = GCD of the two string lengths.

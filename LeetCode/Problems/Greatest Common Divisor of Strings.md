# 1071. Greatest Common Divisor of Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/greatest-common-divisor-of-strings](https://leetcode.com/problems/greatest-common-divisor-of-strings)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: GCD of Lengths — O(n) ✅](#3-approach-gcd-of-lengths--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Find the largest string `x` such that `x` divides both `str1` and `str2` (i.e., both are formed by concatenating `x`).

---

## 2. Key Insight

> If `str1 + str2 == str2 + str1`, they share a GCD string of length `GCD(len1, len2)`. Otherwise, no common divisor exists.

---

## 3. Approach: GCD of Lengths — O(n) ✅

```
FUNCTION gcdOfStrings(str1, str2):
    IF str1 + str2 != str2 + str1:
        RETURN ""
    g = GCD(len(str1), len(str2))
    RETURN str1[:g]
```

---

## 4. Key Takeaway

> The **commutativity check** (`s1+s2 == s2+s1`) proves a common pattern exists. Its length = GCD of the two string lengths.

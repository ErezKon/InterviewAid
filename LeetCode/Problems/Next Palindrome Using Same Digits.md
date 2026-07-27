# 1842. Next Palindrome Using Same Digits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/next-palindrome-using-same-digits](https://leetcode.com/problems/next-palindrome-using-same-digits)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Next Permutation on Half — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a palindrome string of digits, find the **next** palindrome using the same digits. Return empty string if not possible.

**Constraints:**
- `1 <= num.length <= 10⁵`

---

## 2. Key Insight

> A palindrome is determined by its first half. Apply **Next Permutation** to the first half of the digits. If no next permutation exists, return "". Otherwise, mirror the first half to get the full palindrome.

---

## 3. Approach: Next Permutation on Half — O(n) ✅

```
FUNCTION nextPalindrome(num):
    n = len(num)
    half = list(num[:n // 2])

    // Apply next permutation to half
    IF NOT nextPermutation(half): RETURN ""

    // Mirror: construct palindrome
    IF n % 2 == 1:
        RETURN JOIN(half) + num[n//2] + JOIN(REVERSE(half))
    ELSE:
        RETURN JOIN(half) + JOIN(REVERSE(half))
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Palindrome = determined by first half.** Apply next permutation to the half, then mirror. Elegant reduction of a hard problem to a known algorithm.

# 3646. Next Special Palindrome Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/next-special-palindrome-number](https://leetcode.com/problems/next-special-palindrome-number)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Construct Palindrome Candidates — O(√n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Find the next **special palindrome** greater than `n`. A special palindrome has at most 2 distinct digits and is a palindrome.

---

## 2. Key Insight

> Generate palindrome candidates with at most 2 distinct digits. For each digit length, enumerate possible first-halves using 1-2 distinct digits, mirror to form palindromes, and find the smallest one > n.

---

## 3. Approach: Construct Palindrome Candidates — O(√n) ✅

```
FUNCTION nextSpecialPalindrome(n):
    // Generate all special palindromes near n
    // For each digit count d:
    //   For each pair of digits (a, b):
    //     Generate first half with a and b
    //     Mirror to palindrome
    //     Track smallest > n
    RETURN smallest candidate > n
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d · 10²) where d = digit count |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Construct don't search.** Generate candidate palindromes from digit constraints rather than checking every number. Palindrome structure + digit restriction limits the search space dramatically.

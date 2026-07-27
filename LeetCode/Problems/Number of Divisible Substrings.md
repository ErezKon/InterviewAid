# 2950. Number of Divisible Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-divisible-substrings](https://leetcode.com/problems/number-of-divisible-substrings)
**Companies:** Amdocs, Ibm, Paytm, Wayfair

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Map each character to a digit (a-c→1, d-f→2, ..., y-z→9). Count substrings where the sum of mapped digits is divisible by the substring length.

---

## 2. Key Insight

> Enumerate all substrings, maintain running sum. Check if sum is divisible by length at each extension.

---

## 3. Approach: Brute Force — O(n²) ✅

```
FUNCTION countDivisibleSubstrings(word):
    // Map each char to a digit (a-c→1, d-f→2, ..., y-z→9)
    // Count substrings where sum of digits is divisible by length
    count = 0
    FOR i ← 0 TO len(word) - 1:
        s = 0
        FOR j ← i TO len(word) - 1:
            s += digitOf(word[j])
            IF s % (j - i + 1) == 0: count += 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Running sum with divisibility check per extension.** Map letters to digits first, then standard substring enumeration with prefix sum.

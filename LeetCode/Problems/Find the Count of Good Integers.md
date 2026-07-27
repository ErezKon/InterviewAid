# 3272. Find the Count of Good Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-count-of-good-integers](https://leetcode.com/problems/find-the-count-of-good-integers)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Palindromes + Permutation Counting ✅](#3-approach-enumerate-palindromes--permutation-counting-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given integers `n` and `k`, count the number of `n`-digit integers that are "good" — meaning some permutation of their digits forms a palindrome divisible by `k`. No leading zeros allowed.

**Constraints:**
- `1 <= n <= 10`
- `1 <= k <= 9`

---

## 2. Key Insight

> Enumerate all `n`-digit palindromes divisible by `k`, then for each, count how many distinct digit permutations form valid `n`-digit numbers (no leading zero). Use a set of sorted digit tuples to avoid double-counting.

---

## 3. Approach: Enumerate Palindromes + Permutation Counting ✅

```
FUNCTION countGoodIntegers(n, k):
    seen ← SET()
    result ← 0
    // Enumerate all n-digit palindromes by generating the first half
    FOR each first_half of appropriate length DO
        palindrome ← mirror(first_half, n)
        IF palindrome % k == 0 THEN
            digits ← SORTED(digits of palindrome)
            IF digits NOT IN seen THEN
                seen.ADD(digits)
                // Count permutations without leading zeros
                result += countValidPermutations(digits, n)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(10^(n/2) · n) — enumerate half-palindromes |
| **Space** | O(10^(n/2)) — seen set |

---

## 5. Key Takeaway

> **Enumerate palindromes by half, check divisibility, count permutations** — this avoids iterating over all n-digit numbers by exploiting palindrome structure (only ~10^(n/2) candidates).

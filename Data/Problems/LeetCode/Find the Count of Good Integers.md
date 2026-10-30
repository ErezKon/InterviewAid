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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two **positive** integers `n` and `k`.

An integer `x` is called **k-palindromic** if:

- `x` is a palindrome.
- `x` is divisible by `k`.

An integer is called **good** if its digits can be *rearranged* to form a **k-palindromic** integer. For example, for `k = 2`, 2020 can be rearranged to form the *k-palindromic* integer 2002, whereas 1010 cannot be rearranged to form a *k-palindromic* integer.

Return the count of **good** integers containing `n` digits.

**Note** that *any* integer must **not** have leading zeros, **neither** before **nor** after rearrangement. For example, 1010 *cannot* be rearranged to form 101.

**Constraints:**
- `1 <= n <= 10`
- `1 <= k <= 9`

---

## 2. Key Insight

> Enumerate all `n`-digit palindromes divisible by `k`, then for each, count how many distinct digit permutations form valid `n`-digit numbers (no leading zero). Use a set of sorted digit tuples to avoid double‑counting.

---

## 3. Approach: Enumerate Palindromes + Permutation Counting ✅

```text
FUNCTION countGoodIntegers(n, k):
    seen ← SET()
    result ← 0
    // Enumerate all n‑digit palindromes by generating the first half
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
| **Time** | O(10^(n/2) · n) — enumerate half‑palindromes |
| **Space** | O(10^(n/2)) — seen set |

---

## 5. Examples

```
Example 1:
  Input: n = 3, k = 5
  Output: 27
  Explanation: Some of the good integers are:
    - 551 because it can be rearranged to form 515.
    - 525 because it is already k-palindromic.

Example 2:
  Input: n = 1, k = 4
  Output: 2
  Explanation: The two good integers are 4 and 8.

Example 3:
  Input: n = 5, k = 6
  Output: 2468
```

---

## 6. Walkthrough

Consider `n = 3, k = 2`.
1. Generate first half length `⌈3/2⌉ = 2`. Possible first halves: 10‑99.
2. Mirror to form palindromes: 101, 111, 121, …, 999.
3. Check divisibility by 2: only 101, 111, 121, 131 are even? Actually none are even; we instead count those whose palindrome is divisible by 2 → only palindromes ending with an even digit qualify (e.g., 202, 212, …). After filtering, we obtain the four good numbers listed.
4. For each palindrome, sort its digits and ensure we count each unique digit multiset once.
5. Compute valid permutations without leading zero for each multiset and sum them.

---

## 7. Follow-Up Questions

1. How would the solution change if leading zeros were allowed?
2. Can the algorithm be adapted to count numbers whose permutations form a *strictly* increasing sequence?
3. What if `k` could be up to 10⁹ – would a modular‑arithmetic optimization be needed?

---

## 8. Key Takeaway

> **Enumerate palindromes by half, check divisibility, count permutations** — this avoids iterating over all n‑digit numbers by exploiting palindrome structure (only ~10^(n/2) candidates).

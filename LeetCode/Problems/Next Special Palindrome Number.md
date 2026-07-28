# 3646. Next Special Palindrome Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/next-special-palindrome-number](https://leetcode.com/problems/next-special-palindrome-number)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Construct Palindrome Candidates — O(√n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Find the next **special palindrome** greater than `n`. A special palindrome has at most 2 distinct digits and is a palindrome.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 123` | `131` | `131` is a palindrome using digits `1` and `3` only, and it is the smallest such number > 123. |
| `n = 999` | `1001` | `1001` uses digits `0` and `1` and is the next palindrome after 999. |
| `n = 8080` | `8088` | `8088` contains digits `0` and `8` and is the minimal special palindrome greater than 8080. |

---

## 3. Approach: Construct Palindrome Candidates — O(√n) ✅

```text
FUNCTION nextSpecialPalindrome(n):
    SET length ← NUMBER_OF_DIGITS(n)
    SET best ← INFINITY
    FOR d FROM length TO length + 1: // consider same or next digit length
        FOR each pair of digits (a, b) where a ≠ 0:
            // generate all possible first halves of length ceil(d/2)
            FOR each combination of a and b filling the half:
                SET firstHalf ← generated combination
                SET palindrome ← MIRROR(firstHalf, d is odd)
                IF palindrome > n AND palindrome < best:
                    SET best ← palindrome
    RETURN best
```

---

## 4. Walkthrough

**Example:** `n = 123`

1. `length = 3`. We examine 3‑digit and 4‑digit candidates.
2. Pair of digits `(1,3)` generates first halves:
   - For 3‑digit: firstHalf = `13` → palindrome `131`.
3. `131 > 123` and is currently the smallest candidate.
4. No 3‑digit candidate with a smaller value exists, and 4‑digit candidates start at `1001` which is larger.
5. Return `131`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d · 10²) where d = digit count (generating at most 10² combos per length) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you adapt the algorithm if the palindrome may contain up to **k** distinct digits?
2. Can you compute the **k‑th** special palindrome greater than `n` without enumerating all candidates?
3. How would the solution change if the input range includes very large numbers (e.g., up to 10¹⁸)?

---

## 7. Key Takeaway

> **Construct don't search.** Generate candidate palindromes from digit constraints rather than checking every number. Palindrome structure + digit restriction limits the search space dramatically.

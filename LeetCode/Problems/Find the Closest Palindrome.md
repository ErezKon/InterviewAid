# 564. Find the Closest Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-closest-palindrome](https://leetcode.com/problems/find-the-closest-palindrome)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Uber, Yelp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Generate Candidates — O(len) ✅](#4-approach-generate-candidates--olen-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `n` representing an integer, find the **closest palindrome** (as a string) to `n`. "Closest" means smallest absolute difference; if tied, return the smaller one. The answer cannot be `n` itself.

**Constraints:**
- `1 <= n.length <= 18`
- `n` does not have leading zeros (except "0" itself).

---

## 2. Examples

```
Example 1:
  Input:  n = "123"
  Output: "121"
  Reason: |121 - 123| = 2, closest palindrome.

Example 2:
  Input:  n = "1"
  Output: "0"
  Reason: |0 - 1| = 1, the closest palindrome to 1.
```

---

## 3. Key Insight

> The closest palindrome is always one of **at most 5 candidates**: mirror the first half with prefix ± 1 or ± 0, plus boundary palindromes (all 9s one digit shorter, or 10...01 one digit longer). Generate all, pick the closest.

---

## 4. Approach: Generate Candidates — O(len) ✅

```
FUNCTION nearestPalindromic(n):
    length = len(n)
    candidates = set()

    // Edge cases
    candidates.ADD(10^(length-1) - 1)    // 999...9 (one digit shorter)
    candidates.ADD(10^length + 1)         // 100...01 (one digit longer)

    // Mirror first half
    prefix = int(n[:(length+1)/2])
    FOR delta IN [-1, 0, 1]:
        newPrefix = str(prefix + delta)
        IF length % 2 == 0:
            palindrome = newPrefix + REVERSE(newPrefix)
        ELSE:
            palindrome = newPrefix + REVERSE(newPrefix[:-1])
        candidates.ADD(int(palindrome))

    candidates.DISCARD(int(n))    // can't be itself

    RETURN str(MIN(candidates, key=lambda x: (ABS(x - int(n)), x)))
```

Generate 5 candidates by mirroring the first half with -1/0/+1 modifications, plus edge cases.

---

## 5. Walkthrough

```
n = "123", length = 3

Edge cases: 99 (10² - 1), 1001 (10³ + 1)

prefix = int("12") = 12

delta=-1: newPrefix="11" → palindrome = "11" + reverse("") = "111" → 111
delta= 0: newPrefix="12" → palindrome = "12" + reverse("") = "121" → 121
delta=+1: newPrefix="13" → palindrome = "13" + reverse("") = "131" → 131

candidates = {99, 1001, 111, 121, 131} (discard 123 if present — it's not)

Distances from 123:
  99 → |24|, 111 → |12|, 121 → |2|, 131 → |8|, 1001 → |878|

Closest: 121 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(len) — string operations on the prefix |
| **Space** | O(len) — candidate palindromes |

---

## 7. Follow-Up Questions

### 7.1 Why do we need the edge cases (99..9 and 100..01)?

When the prefix changes digit count (e.g., prefix = 10, delta = -1 → 9), the mirrored palindrome may have fewer digits. The boundary palindromes cover these transitions.

### 7.2 Why only 5 candidates?

The closest palindrome either has the same digit count (mirrored with delta -1, 0, or +1) or differs by one digit (the two edge cases). No other palindrome can be closer.

### 7.3 What about single-digit numbers?

For n = "1", candidates include 0 (from 10⁰ - 1 = 0) and 11, so the answer is "0".

---

## 8. Key Takeaway

> **Generate a small candidate set** rather than searching all palindromes. Mirror the first half with prefix ± 1 plus digit-count boundaries — this covers all possible closest palindromes in O(len).

# 1704. Determine if String Halves Are Alike

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/determine-if-string-halves-are-alike](https://leetcode.com/problems/determine-if-string-halves-are-alike)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Vowel Counting](#approach-vowel-counting)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` of **even length**, split it into two halves: `a = s[0..n/2-1]` and `b = s[n/2..n-1]`. The halves are **alike** if they have the **same number of vowels** (`a`, `e`, `i`, `o`, `u` — case-insensitive).

Return `true` if the halves are alike, `false` otherwise.

**Constraints:**
- `2 <= s.length <= 1000`
- `s.length` is even.
- `s` consists of uppercase and lowercase letters.

---

## Examples

**Example 1:**
```
Input: s = "book"
Output: true
Explanation: a = "bo" (1 vowel: o), b = "ok" (1 vowel: o) → equal ✅
```

**Example 2:**
```
Input: s = "textbook"
Output: false
Explanation: a = "text" (1 vowel: e), b = "book" (2 vowels: o, o) → not equal ✗
```

---

## Key Insight

> Simply count vowels in each half and compare. A single-pass approach can increment a counter for the first half and decrement for the second half, returning whether the counter is zero at the end.

---

## Approach: Vowel Counting ✅

```
FUNCTION halvesAreAlike(s):
    vowels ← {'a','e','i','o','u','A','E','I','O','U'}
    mid ← length(s) / 2
    count ← 0

    FOR i ← 0 TO length(s) - 1 DO
        IF s[i] IN vowels THEN
            IF i < mid THEN
                count ← count + 1
            ELSE
                count ← count - 1
    END FOR

    RETURN count = 0
END FUNCTION
```

---

## Walkthrough

```
s = "textbook",  mid = 4
```

| i | char | Vowel? | Half  | count |
|---|------|--------|-------|-------|
| 0 | t    | ✗      | first | 0     |
| 1 | e    | ✅      | first | 1     |
| 2 | x    | ✗      | first | 1     |
| 3 | t    | ✗      | first | 1     |
| 4 | b    | ✗      | second| 1     |
| 5 | o    | ✅      | second| 0     |
| 6 | o    | ✅      | second| -1    |
| 7 | k    | ✗      | second| -1    |

`count = -1 ≠ 0` → return `false` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass through string |
| **Space** | O(1) | Only a counter and vowel set |

---

## Key Takeaway

> **When comparing counts between two halves, use a single counter — increment for one half, decrement for the other, and check if it's zero at the end.**

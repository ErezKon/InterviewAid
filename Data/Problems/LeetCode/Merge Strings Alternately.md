# 1768. Merge Strings Alternately

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/merge-strings-alternately](https://leetcode.com/problems/merge-strings-alternately)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft, Oracle, Uber, Wells Fargo, Zoho

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two strings `word1` and `word2`. Merge the strings by adding letters in alternating order, starting with `word1`. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return *the merged string.*

**Constraints:**
- `1 ≤ word1.length, word2.length ≤ 100`
- `word1` and `word2` consist of lowercase English letters.

---

## Examples

```
Example 1:
  Input: word1 = "abc", word2 = "pqr"
  Output: "apbqcr"
  Explanation: The merged string will be merged as so:
  word1:  a   b   c
  word2:    p   q   r
  merged: a p b q c r
```

```
Example 2:
  Input: word1 = "ab", word2 = "pqrs"
  Output: "apbqrs"
  Explanation: Notice that as word2 is longer, "rs" is appended to the end.
  word1:  a   b
  word2:    p   q   r   s
  merged: a p b q   r   s
```

```
Example 3:
  Input: word1 = "abcd", word2 = "pq"
  Output: "apbqcd"
  Explanation: Notice that as word1 is longer, "cd" is appended to the end.
  word1:  a   b   c   d
  word2:    p   q
  merged: a p b q c   d
```

---

## Key Insight

> Two pointers, one per string. Alternate adding characters. When one runs out, append the rest of the other.

---

## Approach

```
FUNCTION mergeAlternately(word1, word2):
    result ← []
    i ← 0
    j ← 0
    WHILE i < LEN(word1) OR j < LEN(word2) DO
        IF i < LEN(word1) THEN result.ADD(word1[i]); i ← i + 1
        IF j < LEN(word2) THEN result.ADD(word2[j]); j ← j + 1
    RETURN JOIN(result)
```

---

## Walkthrough

```
word1 = "ab", word2 = "pqrs"

i=0,j=0: add 'a', add 'p' → "ap"
i=1,j=1: add 'b', add 'q' → "apbq"
i=2,j=2: i≥2 skip, add 'r' → "apbqr"
i=2,j=3: i≥2 skip, add 's' → "apbqrs"

Return "apbqrs" ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two pointers | **O(n + m)** | **O(n + m)** |

---

## Key Takeaway

> **Interleave with two pointers** — alternate from each source, handle remaining elements naturally when one exhausts.

---

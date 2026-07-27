# 1641. Count Sorted Vowel Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-sorted-vowel-strings](https://leetcode.com/problems/count-sorted-vowel-strings)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer `n`, return the number of strings of length `n` that consist only of vowels (`a, e, i, o, u`) and are **lexicographically sorted** (each character is ≥ the previous one).

**Constraints:**
- `1 <= n <= 50`

---

## Examples

**Example 1:**
- **Input:** `n = 1`
- **Output:** `5`
- **Explanation:** "a", "e", "i", "o", "u".

**Example 2:**
- **Input:** `n = 2`
- **Output:** `15`
- **Explanation:** "aa", "ae", "ai", ..., "uu" — all non-decreasing pairs.

---

## Key Insight

A sorted string of length `n` from 5 vowels is equivalent to choosing `n` items from 5 categories with repetition (multiset). By **stars and bars**: the answer is `C(n + 4, 4) = (n+1)(n+2)(n+3)(n+4) / 24`.

---

## Approach

**Math (O(1)):**
```
FUNCTION countVowelStrings(n):
    RETURN (n+1)*(n+2)*(n+3)*(n+4) / 24
```

**DP alternative:**
```
FUNCTION countVowelStrings(n):
    dp = [1, 1, 1, 1, 1]   // 5 vowels, each has 1 way for length 1
    FOR length ← 2 TO n DO
        FOR i ← 1 TO 4 DO
            dp[i] += dp[i-1]   // prefix sum = ways to end at vowel i or earlier
    RETURN SUM(dp)
```

---

## Walkthrough

**Input:** `n = 2`

```
Stars and bars: C(2+4, 4) = C(6, 4) = 15 ✅

DP:
  Length 1: dp = [1, 1, 1, 1, 1], sum = 5
  Length 2: dp = [1, 2, 3, 4, 5], sum = 15 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for math, O(5n) for DP |
| **Space** | O(1) for math, O(5) for DP |

---

## Follow-Up Questions

**Q1: Why does stars and bars apply?**
Choosing a non-decreasing sequence of length `n` from 5 symbols is the same as distributing `n` identical items into 5 bins. Stars and bars gives `C(n+k-1, k-1)` where `k=5`.

**Q2: How does the DP work?**
`dp[i]` = ways to form a string of current length ending at vowel `i`. At each new length, take prefix sums: `dp[i] += dp[i-1]` means "can extend any string ending at vowel ≤ i."

**Q3: What if the alphabet had k characters instead of 5?**
The formula generalizes to `C(n+k-1, k-1)`.

---

## Key Takeaway

> **Counting sorted strings from a fixed alphabet is a combinatorial stars-and-bars problem: C(n+k−1, k−1). The DP approach with prefix sums achieves the same result iteratively.**

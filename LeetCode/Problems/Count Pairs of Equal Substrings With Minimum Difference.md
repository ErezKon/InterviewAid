# 1794. Count Pairs of Equal Substrings With Minimum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-pairs-of-equal-substrings-with-minimum-difference](https://leetcode.com/problems/count-pairs-of-equal-substrings-with-minimum-difference)
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

Given two strings `firstString` and `secondString` of equal length, find the number of index quadruples `(i, j, a, b)` such that:
- `firstString[i..j] == secondString[a..b]`
- `j - a` is minimized (the gap between the end of the first substring and the start of the second)
- We count all quadruples achieving this minimum `j - a`

In practice, for equal single characters this simplifies: find pairs where `firstString[i] == secondString[j]` with `i - j` minimized.

**Constraints:**
- `1 <= firstString.length, secondString.length <= 2 × 10^5`

---

## Examples

**Example 1:**
- **Input:** `firstString = "abcd", secondString = "bccda"`
- **Output:** `1`
- **Explanation:** The optimal pair uses matching character with minimum gap.

---

## Key Insight

For each character `c` (a–z), the best pair is: the **earliest occurrence** of `c` in `firstString` matched with the **latest occurrence** of `c` in `secondString`. This minimizes `i - j` (or equivalently `j - a` for single-char substrings). Among all 26 characters, pick the ones achieving the global minimum difference.

---

## Approach

```
FUNCTION countPairs(firstString, secondString):
    // For each char, find first occurrence in firstString
    firstOccurrence = {}
    FOR i ← 0 TO LENGTH(firstString) - 1 DO
        IF firstString[i] NOT IN firstOccurrence THEN
            firstOccurrence[firstString[i]] = i

    // For each char, find last occurrence in secondString
    lastOccurrence = {}
    FOR j ← 0 TO LENGTH(secondString) - 1 DO
        lastOccurrence[secondString[j]] = j

    // Find minimum difference and count
    minDiff = INFINITY
    count = 0
    FOR each char c in 'a'..'z' DO
        IF c IN firstOccurrence AND c IN lastOccurrence THEN
            diff = firstOccurrence[c] - lastOccurrence[c]
            IF diff < minDiff THEN
                minDiff = diff
                count = 1
            ELSE IF diff == minDiff THEN
                count += 1

    RETURN count
```

---

## Walkthrough

**Input:** `firstString = "abcd", secondString = "bccda"`

```
firstOccurrence: a→0, b→1, c→2, d→3
lastOccurrence:  b→0, c→2, d→3, a→4

Differences per char:
  a: 0 - 4 = -4
  b: 1 - 0 = 1
  c: 2 - 2 = 0
  d: 3 - 3 = 0

Minimum difference = -4, count = 1 (char 'a')
```

**Result:** `1` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) where n, m are string lengths |
| **Space** | O(26) = O(1) for character maps |

---

## Follow-Up Questions

**Q1: Why first occurrence in firstString and last occurrence in secondString?**
We want to minimize `i - j`. Smaller `i` and larger `j` give the smallest difference.

**Q2: What if we need to match substrings longer than 1?**
The optimal answer always involves single-character matches since longer substrings have `j ≥ i` and `a ≤ b`, making `j - a ≥ i - b` which is at least as large as the single-char case.

**Q3: Can the difference be negative?**
Yes — it means the matched position in `secondString` comes after the one in `firstString`.

---

## Key Takeaway

> **When minimizing a gap between matched substrings, reduce to single-character matches and use earliest/latest occurrence maps for O(n) time. The optimal match always comes from the extreme positions.**

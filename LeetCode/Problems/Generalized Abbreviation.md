# 320. Generalized Abbreviation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/generalized-abbreviation](https://leetcode.com/problems/generalized-abbreviation)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(2ⁿ) ✅](#3-approach-backtracking--o2n-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Generate all possible generalized abbreviations of a word. Each position can either keep the letter or abbreviate (collapse consecutive letters into a number).

**Example:** `"word"` → `["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", ...]`

---

## 2. Key Insight

> At each character, choose to either keep it (append letter) or abbreviate (increment a counter). When keeping a letter, flush any accumulated count first.

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```
FUNCTION generateAbbreviations(word):
    result ← []
    FUNCTION backtrack(pos, current, count):
        IF pos == LENGTH(word) THEN
            IF count > 0 THEN current += str(count)
            result.ADD(current)
            RETURN
        // Option 1: abbreviate (increment count)
        backtrack(pos + 1, current, count + 1)
        // Option 2: keep letter (flush count first)
        prefix ← str(count) IF count > 0 ELSE ""
        backtrack(pos + 1, current + prefix + word[pos], 0)
    backtrack(0, "", 0)
    RETURN result
```

---

## 4. Key Takeaway

> Each position has 2 choices → 2ⁿ abbreviations. Backtrack with a running count for consecutive abbreviations.

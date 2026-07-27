# 1178. Number of Valid Words for Each Puzzle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-words-for-each-puzzle](https://leetcode.com/problems/number-of-valid-words-for-each-puzzle)
**Companies:** Dropbox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask Subset Enumeration — O(W + P · 2⁷)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A word is valid for a puzzle if it contains the puzzle's first letter and every letter in the word is in the puzzle. Count valid words per puzzle.

---

## 2. Key Insight

> Represent each word as a bitmask. For each puzzle, enumerate all submasks of the puzzle's 7 letters (at most 2⁷ = 128). Each submask must include the first letter. Look up count in a precomputed map.

---

## 3. Approach: Bitmask Subset Enumeration — O(W + P · 2⁷) ✅

```
FUNCTION findNumOfValidWords(words, puzzles):
    wordMasks = Counter(bitmask(w) for w in words)
    result = []
    FOR puzzle IN puzzles:
        mask = bitmask(puzzle)
        first = bit of puzzle[0]
        count = 0
        // Enumerate submasks of mask that include first
        sub = mask
        WHILE sub > 0:
            IF sub & first:
                count += wordMasks[sub]
            sub = (sub - 1) & mask
        result.ADD(count)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(W + P · 2⁷) |
| **Space** | O(W) for word mask counter |

---

## 5. Key Takeaway

> **Bitmask + submask enumeration.** Puzzles have exactly 7 unique letters → only 128 submasks. Enumerate submasks containing the first letter and look up word counts.

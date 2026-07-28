# 1178. Number of Valid Words for Each Puzzle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-words-for-each-puzzle](https://leetcode.com/problems/number-of-valid-words-for-each-puzzle)
**Companies:** Dropbox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#examples)
3. [Approach: Bitmask Subset Enumeration — O(W + P · 2⁷)](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## 1. Problem Description

A word is valid for a puzzle if it contains the puzzle's first letter and every letter in the word is in the puzzle. Count valid words per puzzle.

---

## Examples

**Example 1:**
```
words = ["aaaa","asas","able","ability","actt"]
 puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz"]
```
**Output:** `[1,1,3,2,4]`
- For puzzle "aboveyz", only "aaaa" is valid because it contains the first letter 'a' and all its letters are in the puzzle.
- For puzzle "actresz", the valid words are "aaaa", "asas", "actt", and "able".

**Example 2:**
```
words = ["apple","pleas","please"]
 puzzles = ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
```
**Output:** `[0,1,3,2,0]`

---

## Approach: Bitmask Subset Enumeration — O(W + P · 2⁷)

```text
FUNCTION findNumOfValidWords(words, puzzles):
    // Build a frequency map of word bitmasks
    wordMasks ← Counter(bitmask(w) for w in words)
    result ← []
    FOR puzzle IN puzzles:
        mask ← bitmask(puzzle)               // 26‑bit integer
        firstBit ← 1 << (puzzle[0] - 'a')    // bit of the first letter
        count ← 0
        submask ← mask
        WHILE submask > 0:
            IF submask & firstBit != 0:
                count ← count + wordMasks[submask]
            submask ← (submask - 1) & mask   // next submask
        result.APPEND(count)
    RETURN result
```

---

## Walkthrough

Consider the first example puzzle "aboveyz":
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Convert puzzle to bitmask | `mask = 0b...` representing letters a,b,o,v,e,y,z |
| 2 | Identify first‑letter bit | `firstBit` corresponds to 'a' |
| 3 | Enumerate submasks (≤128) | Loop over all subsets of the 7 letters |
| 4 | Check inclusion of first bit | Only submasks containing 'a' are considered |
| 5 | Look up submask in `wordMasks` | Only submask representing "aaaa" exists, count = 1 |
The same process repeats for each puzzle, yielding the final output `[1,1,3,2,4]`.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(W + P · 2⁷) – building word masks plus enumerating at most 128 submasks per puzzle |
| **Space** | O(W) for the word‑mask frequency map |

---

## Follow-Up Questions

1. How would the solution change if puzzles could contain up to 10 letters?
2. Can you adapt the algorithm to return the actual list of valid words for each puzzle instead of just the count?
3. What alternative data structures (e.g., Trie) could be used to solve this problem, and what trade‑offs would they introduce?

---

## Key Takeaway

> **Bitmask + submask enumeration.** Puzzles have exactly 7 unique letters → only 128 submasks. Enumerate submasks containing the first letter and look up word counts.

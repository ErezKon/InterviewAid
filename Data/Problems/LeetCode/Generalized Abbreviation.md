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

A word's **generalized abbreviation** can be constructed by taking any number of **non-overlapping** and **non-adjacent** substrings and replacing them with their respective lengths.

- For example, `"abcde"` can be abbreviated into:
  - `"a3e"` (`"bcd"` turned into `"3"`)
  - `"1bcd1"` (`"a"` and `"e"` both turned into `"1"`)
  - `"5"` (`"abcde"` turned into `"5"`)
  - `"abcde"` (no substrings replaced)
- However, these abbreviations are **invalid**:
  - `"23"` (`"ab"` turned into `"2"` and `"cde"` turned into `"3"`) is invalid as the substrings chosen are adjacent.
  - `"22de"` (`"ab"` turned into `"2"` and `"bc"` turned into `"2"`) is invalid as the substring chosen overlap.

Given a string `word`, return *a list of all the possible **generalized abbreviations** of* `word`. Return the answer in **any order**.

**Constraints:**
- `1 <= word.length <= 15`
- `word` consists of only lowercase English letters.

## 2. Examples

```
Example 1:
  Input: word = "word"
  Output: ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]
```
```
Example 2:
  Input: word = "a"
  Output: ["1","a"]
```

## 3. Walkthrough

**Example "word":**
1. Start at position 0 with empty current string and count 0.
2. Choose to abbreviate → count 1, move to position 1.
3. At position 1, either continue abbreviating (count 2) or keep the letter (flush count 1 then add `'w'`).
4. Recursively explore all choices; when reaching the end, append any remaining count.
5. Collect each fully built string into the result list.

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```text
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

## Complexity

- **Time:** O(2ⁿ) – each character has two choices (abbreviate or keep).
- **Space:** O(n) – recursion stack depth and current string building.

## Follow-Up Questions

- How would you modify the algorithm to generate abbreviations in lexicographic order?
- Can you extend this to handle a list of words and generate combined abbreviations?

## Key Takeaway

> Each position has 2 choices → 2ⁿ abbreviations. Backtrack with a running count for consecutive abbreviations.

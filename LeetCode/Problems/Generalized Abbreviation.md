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

**Example:** `"word"` → `["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1o2", "2o1", "3d", "4"]`

## 2. Examples

| word | abbreviations |
|------|----------------|
| "word" | `["word","1ord","w1rd","wo1d","wor1","2rd","w2d","wo2","1o1d","1o2","2o1","3d","4"]` |
| "a"   | `["a","1"]` |

## 3. Walkthrough

**Example "word":**
1. Start at position 0 with empty current string and count 0.
2. Choose to abbreviate → count 1, move to position 1.
3. At position 1, either continue abbreviating (count 2) or keep the letter (flush count 1 then add `'w'`).
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

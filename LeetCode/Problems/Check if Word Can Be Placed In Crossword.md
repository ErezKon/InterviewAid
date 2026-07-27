# 2018. Check if Word Can Be Placed In Crossword

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword](https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword)
**Companies:** Google

---

## 1. Problem Description

Given an `m × n` crossword board with `'#'` (blocked), `' '` (empty), and lowercase letters, check if a given `word` can be placed horizontally or vertically. The word must fit exactly in a slot bounded by `'#'` or edges, matching existing letters and filling blanks.

---

## 2. Approach: Enumerate Slots — O(m × n × L) ✅

```
FUNCTION placeWordInCrossword(board, word):
    words = [word, word[::-1]]    // try both directions
    FOR w IN words:
        // Check horizontal slots
        FOR row IN board:
            FOR slot IN split(row, '#'):
                IF len(slot) == len(w) AND all(s==' ' or s==c for s,c in zip(slot,w)):
                    RETURN true
        // Check vertical slots (transpose board)
        FOR col IN transpose(board):
            FOR slot IN split(col, '#'):
                IF len(slot) == len(w) AND matches: RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(m × n × L) | O(m × n) |

---

## Key Takeaway

> Enumerate all horizontal and vertical slots (split by `'#'`), try the word in both directions. A slot matches if same length and all non-blank cells agree with the word.

# 2018. Check if Word Can Be Placed In Crossword

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword](https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword)
**Companies:** Google

---

## 1. Problem Description

Given an `m × n` crossword board with `'#'` (blocked), `' '` (empty), and lowercase letters, check if a given `word` can be placed horizontally or vertically. The word must fit exactly in a slot bounded by `'#'` or edges, matching existing letters and filling blanks.

---

## 2. Approach: Enumerate Slots — O(m × n × L) ✅

```text
FUNCTION placeWordInCrossword(board, word):
    candidates ← [word, REVERSE(word)]
    FOR w IN candidates:
        // Horizontal scan
        FOR each row IN board:
            slots ← SPLIT(row, '#')
            FOR slot IN slots:
                IF LENGTH(slot) == LENGTH(w) AND ALL(slot[i] == ' ' OR slot[i] == w[i] FOR i FROM 0 TO LENGTH(w)-1):
                    RETURN true
        // Vertical scan (transpose)
        FOR each column IN TRANSPOSE(board):
            slots ← SPLIT(column, '#')
            FOR slot IN slots:
                IF LENGTH(slot) == LENGTH(w) AND ALL(slot[i] == ' ' OR slot[i] == w[i] FOR i FROM 0 TO LENGTH(w)-1):
                    RETURN true
    RETURN false
```

---

## 3. Examples

**Example 1**
```
board = [["#"," ","#"],
         [" "," "," "],
         ["#"," ","#"]]
word = "abc"
```
The word can be placed vertically in the middle column filling the blanks. **Output:** `true`

**Example 2**
```
board = [["#","a","#"],
         ["#"," ","#"]]
word = "a"
```
The single cell already contains `a` and is bounded by `#`. **Output:** `true`

---

## 4. Walkthrough

Consider Example 1. The middle column after transposition is `[" "," "," "]`. Splitting by `'#'` yields a single slot `"   "` of length 3, matching the word length. Each character in the slot is a space, so the condition `slot[i] == ' ' OR slot[i] == w[i]` holds for all positions, allowing placement.

---

## 5. Complexity Analysis

- **Time:** For each of the two word directions we scan every row and column, splitting by `'#'` and checking slots of length L (word length). This yields `O(m·n·L)`.
- **Space:** The board and a few auxiliary lists for slots are stored, resulting in `O(m·n)`.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to allow the word to be placed in reverse order without explicitly reversing it?
2. Can the solution be extended to support diagonal placements?
3. What if the board size is very large—how would you reduce memory usage?

---

## Key Takeaway

> Enumerate all horizontal and vertical slots (split by `'#'`), try the word in both forward and reverse directions. A slot matches if its length equals the word and every non‑blank cell already contains the correct letter.

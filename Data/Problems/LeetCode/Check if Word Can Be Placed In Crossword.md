# 2018. Check if Word Can Be Placed In Crossword

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword](https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword)
**Companies:** Google

---

## 1. Problem Description

You are given an `m x n` matrix `board`, representing the **current** state of a crossword puzzle. The crossword contains lowercase English letters (from solved words), `' '` to represent any **empty** cells, and `'#'` to represent any **blocked** cells.

A word can be placed **horizontally** (left to right **or** right to left) or **vertically** (top to bottom **or** bottom to top) in the board if:

- It does not occupy a cell containing the character `'#'`.
- The cell each letter is placed in must either be `' '` (empty) or **match** the letter already on the `board`.
- There must not be any empty cells `' '` or other lowercase letters **directly left or right** of the word if the word was placed **horizontally**.
- There must not be any empty cells `' '` or other lowercase letters **directly above or below** the word if the word was placed **vertically**.

Given a string `word`, return `true` *if* `word` *can be placed in* `board`*, or* `false` ***otherwise***.

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m * n <= 2 * 10^5`
- `board[i][j]` will be `' '`, `'#'`, or a lowercase English letter.
- `1 <= word.length <= max(m, n)`
- `word` will contain only lowercase English letters.

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

```
Example 1:
  Input: board = [["#", " ", "#"],
                  [" ", " ", "#"],
                  ["#", "c", " "]], word = "abc"
  Output: true
  Explanation: The word "abc" can be placed top to bottom in the middle column.
```

```
Example 2:
  Input: board = [[" ", "#", "a"],
                  [" ", "#", "c"],
                  [" ", "#", "a"]], word = "ac"
  Output: false
  Explanation: It is impossible to place the word because there will always be a space/letter above or below it.
```

```
Example 3:
  Input: board = [["#", " ", "#"],
                  [" ", " ", "#"],
                  ["#", " ", "c"]], word = "ca"
  Output: true
  Explanation: The word "ca" can be placed right to left in the bottom row.
```

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

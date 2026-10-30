# 36. Valid Sudoku

**Difficulty:** 🟡 Medium
**Acceptance:** 61.0%
**LeetCode:** [https://leetcode.com/problems/valid-sudoku](https://leetcode.com/problems/valid-sudoku)
**Companies:** Amazon, Apple, Autodesk, Bloomberg, Confluent, Earnin, Geico, Goldman Sachs, Google, Karat, Linkedin, Meta, Microsoft, Oracle, Paypal, Samsara, Snapchat, Tiktok, Uber, Udemy, Upstart, Verkada, Walmart Labs, Zoho

---

## 1. Problem Description

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

- Each row must contain the digits `1-9` without repetition.
- Each column must contain the digits `1-9` without repetition.
- Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

**Constraints:**
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`.

---

## 2. Approach: Hash Sets — O(81) = O(1) ✅

```text
FUNCTION isValidSudoku(board):
    // Initialize sets for rows, columns, and 3×3 boxes
    SET rows ← ARRAY[9] OF EMPTY SETS
    SET cols ← ARRAY[9] OF EMPTY SETS
    SET boxes ← ARRAY[9] OF EMPTY SETS

    FOR r ← 0 TO 8:
        FOR c ← 0 TO 8:
            SET val ← board[r][c]
            IF val == '.':
                CONTINUE

            // Compute index of the 3×3 sub-box
            SET boxIdx ← (r DIV 3) * 3 + (c DIV 3)

            IF val IN rows[r] OR val IN cols[c] OR val IN boxes[boxIdx]:
                RETURN false

            ADD val TO rows[r]
            ADD val TO cols[c]
            ADD val TO boxes[boxIdx]

    RETURN true
```

---

## 3. Examples

**Example 1:**
```
Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

**Example 2:**
```
Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```

---

## 4. Walkthrough

Consider the invalid board where the first column contains two `8`s:

1. Process cell (0,0) = `8` → add to `rows[0]`, `cols[0]`, `boxes[0]`.
2. Process cell (1,0) = `6` → add to `rows[1]`, `cols[0]`, `boxes[0]`.
3. … continue until reaching cell (3,0) = `8`.
4. `8` is already present in `cols[0]` (from step 1), so the function returns **false** immediately.

---

## 5. Complexity Analysis

- **Time:** O(81) → O(1) because the board size is fixed (9×9).
- **Space:** O(1) → three arrays of 9 sets each, holding at most 81 entries.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm to solve a partially filled board (i.e., actually solve Sudoku)?
- Can you extend this validation to support larger Sudoku variants (e.g., 16×16) while preserving O(N²) time?
- What data structures could replace the sets to improve constant‑factor performance?

---

## Key Takeaway

> Use three groups of hash sets (rows, columns, boxes) and a simple index formula `(r/3)*3 + (c/3)` to detect duplicates in O(1) time for a fixed‑size Sudoku board.

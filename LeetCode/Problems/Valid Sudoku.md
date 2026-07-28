# 36. Valid Sudoku

**Difficulty:** 🟡 Medium
**Acceptance:** 61.0%
**LeetCode:** [https://leetcode.com/problems/valid-sudoku](https://leetcode.com/problems/valid-sudoku)
**Companies:** Amazon, Apple, Autodesk, Bloomberg, Confluent, Earnin, Geico, Goldman Sachs, Google, Karat, Linkedin, Meta, Microsoft, Oracle, Paypal, Samsara, Snapchat, Tiktok, Uber, Udemy, Upstart, Verkada, Walmart Labs, Zoho

---

## 1. Problem Description

Determine if a 9×9 Sudoku board is valid. Only filled cells need to be validated: each row, column, and 3×3 sub-box must contain digits 1-9 without repetition.

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

| Board (partial) | Valid? |
|-----------------|--------|
| `[["5","3",".",...], ["6",".",".",...], ...]` | true |
| `[["8","3",".",...], ["6",".",".",...], ...]` | false (duplicate `8` in first column) |

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

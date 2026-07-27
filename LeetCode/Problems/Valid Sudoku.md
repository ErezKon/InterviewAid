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

```
FUNCTION isValidSudoku(board):
    rows = 9 empty sets
    cols = 9 empty sets
    boxes = 9 empty sets

    FOR r ← 0 TO 8:
        FOR c ← 0 TO 8:
            val = board[r][c]
            IF val == '.': CONTINUE

            boxIdx = (r / 3) * 3 + (c / 3)

            IF val IN rows[r] OR val IN cols[c] OR val IN boxes[boxIdx]:
                RETURN false

            rows[r].ADD(val)
            cols[c].ADD(val)
            boxes[boxIdx].ADD(val)

    RETURN true
```

| Time | Space |
|------|-------|
| O(1) — fixed 81 cells | O(1) — at most 81 entries |

---

## Key Takeaway

> The box index formula `(r/3)*3 + (c/3)` maps each cell to its 3×3 sub-box (0-8). Three sets per unit (row/col/box) give O(1) duplicate detection.

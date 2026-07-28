# 1861. Rotating the Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotating-the-box](https://leetcode.com/problems/rotating-the-box)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Roblox, Sig, Square, Uber, Visa

---

## Problem Description

Given a box represented as an `m × n` matrix with stones (`#`), obstacles (`*`), and empty spaces (`.`), simulate **gravity** (stones fall right) and then **rotate the box 90° clockwise**. Return the resulting matrix after both operations.

---

## Examples

| box | Output |
|-----|--------|
| `[["#",".","*"],[".","#","."]]` | `[[".","#"],["*","."],["#","."]]` |
| `[["#","#","*"],["#",".","."]]` | `[[".","#"],[".","#"],["*","."]]` |

*Explanation*: In each row, stones fall to the rightmost empty cell before any obstacle, then the matrix is rotated clockwise.

---

## Approach

```
FUNCTION rotateTheBox(box):
    // 1. Apply gravity within each row (stones fall right)
    FOR each row IN box:
        SET empty ← index of rightmost column
        FOR col FROM rightmost TO leftmost:
            IF row[col] == '*':
                SET empty ← col - 1
            ELSE IF row[col] == '#':
                SET row[col] ← '.'
                SET row[empty] ← '#'
                SET empty ← empty - 1
    // 2. Rotate the matrix 90° clockwise
    SET m ← number of rows, n ← number of columns
    CREATE result matrix of size n × m
    FOR r FROM 0 TO m - 1:
        FOR c FROM 0 TO n - 1:
            SET result[c][m - 1 - r] ← box[r][c]
    RETURN result
```

First simulate gravity, then rotate. Both steps are linear in the matrix size.

---

## Walkthrough

Consider `box = [["#",".","*"],[".","#","."]]`.
1. **Gravity**:
   - Row 0: start `empty = 2`. At col 2 (`*`), set `empty = 1`. At col 0 (`#`), move stone to `empty=1`. Row becomes `[".","#","*"]`.
   - Row 1: start `empty = 2`. No obstacles. Stone at col 1 moves to `empty=2`. Row becomes `[".",".","#"]`.
2. **Rotation** (90° clockwise):
   - Result[0][1] = box[0][0] = '.'
   - Result[0][0] = box[1][0] = '.'
   - Result[1][1] = box[0][1] = '#'
   - Result[1][0] = box[1][1] = '.'
   - Result[2][1] = box[0][2] = '*'
   - Result[2][0] = box[1][2] = '#'
   Final matrix: `[[".","#"],["*","."],["#","."]]`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

Both gravity simulation and rotation traverse each cell once; the result matrix requires additional O(m·n) space.

---

## Follow-Up Questions

1. How would you modify the algorithm to rotate the box counter‑clockwise?
2. Can you perform the rotation in‑place without allocating a new matrix?

---

## Key Takeaway

> Apply gravity before rotation: stones settle to the rightmost available positions in each row, then a simple 90° clockwise rotation yields the final configuration.

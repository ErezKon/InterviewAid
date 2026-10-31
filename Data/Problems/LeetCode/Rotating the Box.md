# 1861. Rotating the Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotating-the-box](https://leetcode.com/problems/rotating-the-box)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Roblox, Sig, Square, Uber, Visa

---

## Problem Description

You are given an `m x n` matrix of characters `boxGrid` representing a side-view of a box. Each cell of the box is one of the following:

- A stone `'#'`
- A stationary obstacle `'*'`
- Empty `'.'`

The box is rotated **90 degrees clockwise**, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity **does not** affect the obstacles' positions, and the inertia from the box's rotation **does not** affect the stones' horizontal positions.

It is **guaranteed** that each stone in `boxGrid` rests on an obstacle, another stone, or the bottom of the box.

Return *an* `n x m` *matrix representing the box after the rotation described above*.

**Constraints:**
- `m == boxGrid.length`
- `n == boxGrid[i].length`
- `1 <= m, n <= 500`
- `boxGrid[i][j]` is either `'#'`, `'*'`, or `'.'`.

---

## Examples

**Example 1:**
```
Input: boxGrid = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
```

**Example 2:**
```
Input: boxGrid = [["#",".","*","."],
                  ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
```

**Example 3:**
```
Input: boxGrid = [["#","#","*",".","*","."],
                  ["#","#","#","*",".","."],
                  ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
```

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

Example 2: `boxGrid = [["#",".","*","."],["#","#","*","."]]` (m = 2, n = 4).
1. **Gravity**:
   - Row 0: start `empty = 3`. col 3 `.` skip. col 2 `*` → `empty = 1`. col 1 `.` skip. col 0 `#` → move stone to col 1, `empty = 0`. Row becomes `[".","#","*","."]`.
   - Row 1: start `empty = 3`. col 3 `.` skip. col 2 `*` → `empty = 1`. col 1 `#` stays at col 1, `empty = 0`. col 0 `#` stays at col 0. Row stays `["#","#","*","."]`.
2. **Rotation** (90° clockwise, `result[c][m-1-r] = box[r][c]`, so row 1 becomes result column 0 and row 0 becomes result column 1):
   - result[0] = [box[1][0], box[0][0]] = ["#","."]
   - result[1] = [box[1][1], box[0][1]] = ["#","#"]
   - result[2] = [box[1][2], box[0][2]] = ["*","*"]
   - result[3] = [box[1][3], box[0][3]] = [".","."]
   Final matrix: `[["#","."],["#","#"],["*","*"],[".","."]]`, matching the expected output.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

Both gravity simulation and rotation traverse each cell once; the result matrix requires additional O(m·n) space.

---

## Follow-Up Questions

1. How would you modify the algorithm to rotate the box counter-clockwise?
2. Can you perform the rotation in-place without allocating a new matrix?

---

## Key Takeaway

> Apply gravity before rotation: stones settle to the rightmost available positions in each row, then a simple 90° clockwise rotation yields the final configuration.

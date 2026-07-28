# 2326. Spiral Matrix IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iv](https://leetcode.com/problems/spiral-matrix-iv)
**Companies:** Docusign, Google, Meta, Microsoft

---

## Problem Description
Given the dimensions `m` (rows) and `n` (columns) of an empty matrix and the head of a singly‑linked list, fill the matrix in a clockwise spiral order starting at the top‑left cell. Insert each node’s value into the matrix as you traverse; if the list ends before the matrix is full, fill remaining cells with `-1`. Return the completed matrix.

## Examples
- **Input:** `m = 3, n = 3, head = [3→0→2→5→4]`
  **Output:** `[[3,0,2],[5,4,-1],[-1,-1,-1]]`
  *Explanation:* Values are placed in spiral order until the list is exhausted, then `-1` fills the rest.
- **Input:** `m = 1, n = 4, head = [1→2→3]`
  **Output:** `[[1,2,3,-1]]`

## Approach
Simulate spiral traversal using direction vectors and boundaries. At each step, place the current node’s value (or `-1` if the list is exhausted) into the matrix, then move to the next cell. When hitting a boundary or a filled cell, turn clockwise.

```text
FUNCTION spiralMatrix(m, n, head):
    SET matrix ← 2‑D ARRAY of size m×n filled with -1
    SET dirs ← [(0,1), (1,0), (0,-1), (-1,0)]  // right, down, left, up
    SET r ← 0
    SET c ← 0
    SET d ← 0
    SET node ← head
    WHILE matrix[r][c] == -1:
        IF node IS NOT NULL:
            SET matrix[r][c] ← node.val
            SET node ← node.next
        ELSE:
            SET matrix[r][c] ← -1
        SET nr ← r + dirs[d][0]
        SET nc ← c + dirs[d][1]
        IF NOT (0 ≤ nr < m AND 0 ≤ nc < n AND matrix[nr][nc] == -1):
            SET d ← (d + 1) MOD 4
            SET nr ← r + dirs[d][0]
            SET nc ← c + dirs[d][1]
        SET r ← nr
        SET c ← nc
    RETURN matrix
```

## Walkthrough
For `m=3, n=3` with list `[3,0,2,5,4]`:
| Step | Position `(r,c)` | Action | Matrix cell |
|------|------------------|--------|-------------|
| 1 | (0,0) | place 3 | 3 |
| 2 | (0,1) | place 0 | 0 |
| 3 | (0,2) | place 2 | 2 |
| 4 | turn down → (1,2) | place 5 | 5 |
| 5 | (2,2) | place 4 | 4 |
| 6 | turn left → (2,1) | list empty → -1 |
| … | continue filling remaining cells with -1 |

## Complexity Analysis
- **Time:** Each cell is visited once → `O(m·n)`.
- **Space:** The output matrix → `O(m·n)` auxiliary space.

## Follow‑Up Questions
1. How would you adapt the algorithm for a counter‑clockwise spiral?
2. Can you fill the matrix in‑place if the list length equals `m·n`?
3. What modifications are needed to start the spiral from a different corner?

## Key Takeaway
A simple direction‑vector simulation with boundary checks lets you fill a matrix in spiral order while handling a possibly shorter linked list.

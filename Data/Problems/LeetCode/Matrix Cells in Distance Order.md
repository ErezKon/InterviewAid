# 1030. Matrix Cells in Distance Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-cells-in-distance-order](https://leetcode.com/problems/matrix-cells-in-distance-order)
**Companies:** Yahoo

---

## 1. Problem Description

You are given four integers `row`, `cols`, `rCenter`, and `cCenter`. There is a `rows x cols` matrix and you are on the cell with the coordinates `(rCenter, cCenter)`.

Return *the coordinates of all cells in the matrix, sorted by their **distance** from* `(rCenter, cCenter)` *from the smallest distance to the largest distance*. You may return the answer in **any order** that satisfies this condition.

The **distance** between two cells `(r1, c1)` and `(r2, c2)` is `|r1 - r2| + |c1 - c2|`.

**Constraints:**

- `1 <= rows, cols <= 100`
- `0 <= rCenter < rows`
- `0 <= cCenter < cols`

---

## 2. Examples

```
Example 1:
  Input: rows = 1, cols = 2, rCenter = 0, cCenter = 0
  Output: [[0,0],[0,1]]
  Explanation: The distances from (0, 0) to other cells are: [0,1]
```

```
Example 2:
  Input: rows = 2, cols = 2, rCenter = 0, cCenter = 1
  Output: [[0,1],[0,0],[1,1],[1,0]]
  Explanation: The distances from (0, 1) to other cells are: [0,1,1,2]
  The answer [[0,1],[1,1],[0,0],[1,0]] would also be accepted as correct.
```

```
Example 3:
  Input: rows = 2, cols = 3, rCenter = 1, cCenter = 2
  Output: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
  Explanation: The distances from (1, 2) to other cells are: [0,1,1,2,2,3]
  There are other answers that would also be accepted as correct, such as [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]].
```

---

## 3. Approach: BFS or Sort — O(m·n·log(m·n)) ✅

```text
FUNCTION allCellsDistOrder(rows, cols, rCenter, cCenter):
    cells ← []
    FOR r ← 0 TO rows‑1:
        FOR c ← 0 TO cols‑1:
            APPEND (r, c) TO cells
    SORT cells BY ABS(r‑rCenter) + ABS(c‑cCenter)
    RETURN cells
```

| Time | Space |
|------|-------|
| O(m·n·log(m·n)) | O(m·n) |

---

## 4. Walkthrough

Consider the 2×2 matrix with center (0,1).

| Step | Cells collected | Reason |
|------|----------------|--------|
| 1 | [(0,1)] | Distance 0 |
| 2 | [(0,0), (1,1)] | Distance 1 |
| 3 | [(1,0)] | Distance 2 |

The algorithm first generates all nine coordinate pairs, then sorts them by Manhattan distance, yielding the ordered list shown in the example.

---

## 5. Complexity Analysis

- **Time**: Generating all \(m·n\) cells takes O(m·n). Sorting them costs O(m·n·log(m·n)).
- **Space**: Storing the list of cells requires O(m·n) additional space.

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to return cells in **spiral order** around the center?
- Can you generate the ordering **without sorting**, using a BFS expansion from the center?
- How would the solution change if the distance metric were **Euclidean** instead of Manhattan?

---

## Key Takeaway

> Simple sort by Manhattan distance solves the problem efficiently; a BFS from the center can produce the same order without an explicit sort.

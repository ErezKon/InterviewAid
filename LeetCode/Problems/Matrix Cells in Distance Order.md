# 1030. Matrix Cells in Distance Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-cells-in-distance-order](https://leetcode.com/problems/matrix-cells-in-distance-order)
**Companies:** Yahoo

---

## 1. Problem Description

Return all cells in a matrix sorted by Manhattan distance from a given center cell.

---

## 2. Examples

| rows | cols | rCenter | cCenter | Output |
|------|------|----------|----------|--------|
| 1 | 2 | 0 | 0 | [[0,0],[0,1]] |
| 2 | 2 | 0 | 1 | [[0,1],[0,0],[1,1],[1,0]] |
| 3 | 3 | 1 | 1 | [[1,1],[0,1],[1,0],[1,2],[2,1],[0,0],[0,2],[2,0],[2,2]] |

*Explanation*: Cells are listed from smallest to largest Manhattan distance \(|r‑rCenter| + |c‑cCenter|\).

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

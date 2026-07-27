# 1030. Matrix Cells in Distance Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-cells-in-distance-order](https://leetcode.com/problems/matrix-cells-in-distance-order)
**Companies:** Yahoo

---

## 1. Problem Description

Return all cells in a matrix sorted by Manhattan distance from a given center cell.

---

## 2. Approach: BFS or Sort — O(m·n·log(m·n)) ✅

```
FUNCTION allCellsDistOrder(rows, cols, rCenter, cCenter):
    cells = [(r, c) for r in range(rows) for c in range(cols)]
    SORT cells by |r - rCenter| + |c - cCenter|
    RETURN cells
```

| Time | Space |
|------|-------|
| O(m·n·log(m·n)) | O(m·n) |

---

## 3. Key Takeaway

> Simple sort by Manhattan distance. Alternatively, BFS from center gives cells in distance order naturally.

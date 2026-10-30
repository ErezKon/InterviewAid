# 1970. Last Day Where You Can Still Cross

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/last-day-where-you-can-still-cross](https://leetcode.com/problems/last-day-where-you-can-still-cross)
**Companies:** Amazon, Atlassian, Google, Meta

---

## 1. Problem Description

There is a **1-based** binary matrix where `0` represents land and `1` represents water. You are given integers `row` and `col` representing the number of rows and columns in the matrix, respectively.

Initially on day `0`, the **entire** matrix is **land**. However, each day a new cell becomes flooded with **water**. You are given a **1-based** 2D array `cells`, where `cells[i] = [r_i, c_i]` represents that on the `i`-th day, the cell on the `r_i`-th row and `c_i`-th column (**1-based** coordinates) will be covered with **water** (i.e., changed to `1`).

You want to find the **last** day that it is possible to walk from the **top** to the **bottom** by only walking on land cells. You can start from **any** cell in the top row and end at **any** cell in the bottom row. You can only travel in the **four** cardinal directions (left, right, up, and down).

Return *the **last** day where it is possible to walk from the **top** to the **bottom** by only walking on land cells*.

**Constraints:**
- `2 <= row, col <= 2 * 10^4`
- `4 <= row * col <= 2 * 10^4`
- `cells.length == row * col`
- `1 <= r_i <= row`
- `1 <= c_i <= col`
- All the values of `cells` are **unique**.

---

## 2. Examples

```
Example 1:
  Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
  Output: 2
  Explanation: Day 1 floods (1,1), day 2 floods (2,1); column 2 is still all land, so you can still cross.
  Day 3 floods (1,2), blocking every path. The last day where it is possible to cross from top to bottom is on day 2.
```

```
Example 2:
  Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
  Output: 1
  Explanation: After day 1 only (1,1) is water, so (1,2) -> (2,2) works. On day 2 the whole top row is water.
  The last day where it is possible to cross from top to bottom is on day 1.
```

```
Example 3:
  Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
  Output: 3
  Explanation: The last day where it is possible to cross from top to bottom is on day 3.
```

---

## 2. Approach: Binary Search + BFS — O(mn log(mn)) ✅

Binary search on day. For each candidate, check if a land path exists from top to bottom.

```text
FUNCTION latestDayToCross(row, col, cells):
    lo ← 1
    hi ← LENGTH(cells)
    WHILE lo < hi:
        mid ← (lo + hi + 1) / 2
        IF canCross(row, col, cells[0:mid]):
            lo ← mid
        ELSE:
            hi ← mid - 1
    RETURN lo

FUNCTION canCross(row, col, waterCells):
    // Build grid, mark water cells
    grid ← MATRIX(row, col, LAND)
    FOR (r, c) IN waterCells:
        grid[r-1][c-1] ← WATER
    // BFS from any land cell in top row
    queue ← NEW_QUEUE()
    visited ← SET()
    FOR c ← 0 TO col-1:
        IF grid[0][c] = LAND:
            ENQUEUE(queue, (0, c))
            ADD visited, (0, c)
    WHILE queue NOT EMPTY:
        (r, c) ← DEQUEUE(queue)
        IF r = row-1: RETURN TRUE
        FOR (nr, nc) IN NEIGHBORS(r, c):
            IF IN_BOUNDS(nr, nc) AND grid[nr][nc] = LAND AND (nr, nc) NOT IN visited:
                ENQUEUE(queue, (nr, nc))
                ADD visited, (nr, nc)
    RETURN FALSE
```

---

## 3. Walkthrough

| Day | Flooded Cells | Path Exists? |
|-----|---------------|--------------|
| 1   | (1,1)         | Yes (via bottom row) |
| 2   | (1,1),(2,1)   | No – top row blocked |

Binary search probes day 2, sees no path, then checks day 1 and confirms a path, returning 2 as the last feasible day.

---

## 4. Complexity Analysis

- **Time:** O(m·n·log(m·n)) – each BFS is O(m·n) and binary search adds a log factor.
- **Space:** O(m·n) for the grid and visited set.

---

## 5. Follow-Up Questions

1. How would you solve the problem using Union‑Find by adding cells in reverse order?
2. Can the solution be adapted for diagonal movement instead of 4‑directional?
3. What if the flood order is unknown and you must determine the worst‑case day?

---

## Key Takeaway

> Binary search on the answer (day). Monotonic property: if you can cross on day d, you can cross on any day < d. Alternative: reverse Union‑Find (add land cells in reverse, connect until top‑bottom joined).

# 1970. Last Day Where You Can Still Cross

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/last-day-where-you-can-still-cross](https://leetcode.com/problems/last-day-where-you-can-still-cross)
**Companies:** Amazon, Atlassian, Google, Meta

---

## 1. Problem Description

Cells flood one per day. Find the last day you can still walk from top row to bottom row on land cells (4-directionally).

---

## 2. Examples

**Example 1:**
```
row = 2, col = 2
cells = [[1,1],[2,1],[1,2],[2,2]]
```
**Output:** 2
**Explanation:** After day 1 the cell (1,1) is water, but a path still exists via (2,1) → (2,2). After day 2, cells (1,1) and (2,1) are water, breaking any top‑to‑bottom path.

**Example 2:**
```
row = 3, col = 3
cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
```
**Output:** 3
**Explanation:** The last day a path exists is day 3 before the middle column becomes fully flooded.

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

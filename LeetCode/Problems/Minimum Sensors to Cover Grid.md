# 3648. Minimum Sensors to Cover Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-sensors-to-cover-grid](https://leetcode.com/problems/minimum-sensors-to-cover-grid)
**Companies:** Amazon, Cisco, Google, Microsoft

---

## 1. Problem Description

Given a binary grid of size `m x n`, place the **minimum** number of sensors so that every cell containing `1` is covered. A sensor placed at a cell covers that cell and its adjacent cells according to the sensor's range (e.g., up, down, left, right, and possibly diagonals as defined by the problem). All `1` cells must be covered while using as few sensors as possible.

---

## 2. Examples

**Example 1:**
```
Input: grid = [[1,0,1],[0,1,0],[1,0,1]]
Output: 3
Explanation: Place sensors at the three corner `1`s. Each sensor covers its own cell and adjacent cells, covering all `1`s.
```
**Example 2:**
```
Input: grid = [[1,1,1],[1,1,1],[1,1,1]]
Output: 1
Explanation: A single sensor placed at the center covers the entire grid.
```

---

## 3. Approach: Greedy Row Processing — O(m·n) ✅

```
FUNCTION minSensors(grid):
    sensors = 0
    covered = set()
    m = number of rows in grid
    n = number of columns in grid

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF grid[r][c] == 1 AND (r,c) NOT IN covered:
                // Place sensor to cover this cell and its range
                sensors += 1
                FOR each cell (x,y) IN sensorRange(r, c):
                    covered.ADD((x,y))

    RETURN sensors
```

---

## 4. Walkthrough

Consider Example 1. The grid is processed row‑by‑row.
1. At `(0,0)` we see a `1` not covered → place a sensor (sensors=1) and mark its coverage.
2. Cells `(0,2)` and `(2,0)` are still uncovered `1`s → each triggers a new sensor placement (sensors=2, then 3).
3. All `1`s become covered, final count = 3.
The greedy choice of placing a sensor at the first uncovered `1` ensures we never miss an opportunity to cover later cells because any later sensor would also need to cover this cell.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) — each cell examined once |
| **Space** | O(m·n) in the worst case for the `covered` set |

---

## 6. Follow-Up Questions

- How would the algorithm change if sensors could cover only orthogonal neighbors (no diagonals)?
- Can you design a solution with O(1) extra space by modifying the grid in‑place?
- What if each sensor has a limited range `k` cells away?

---

## Key Takeaway

> **Greedy sensor placement** — process cells in order and place a sensor at the first uncovered `1`. This maximizes forward coverage and yields the minimum number of sensors, analogous to interval covering patterns.

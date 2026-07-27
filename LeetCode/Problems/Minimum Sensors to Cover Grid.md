# 3648. Minimum Sensors to Cover Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-sensors-to-cover-grid](https://leetcode.com/problems/minimum-sensors-to-cover-grid)
**Companies:** Amazon, Cisco, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Row Processing — O(m·n)](#3-approach-greedy-row-processing--omn)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary grid, place the **minimum** number of sensors to cover all `1`-cells. Each sensor covers a cell and its adjacent cells based on the sensor's range.

**Constraints:**
- `1 <= m, n <= 500`

---

## 2. Key Insight

> Process the grid row by row (or column by column). For each uncovered `1`-cell, greedily place a sensor at the rightmost position that still covers it, maximizing coverage of future cells.

---

## 3. Approach: Greedy Row Processing — O(m·n) ✅

```
FUNCTION minSensors(grid):
    sensors = 0
    covered = set()

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF grid[r][c] == 1 AND (r,c) NOT IN covered:
                // Place sensor to cover this cell and neighbors
                sensors += 1
                // Mark all cells in sensor range as covered
                FOR each cell in sensorRange(r, c):
                    covered.ADD(cell)

    RETURN sensors
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) — each cell processed once |
| **Space** | O(m·n) — coverage tracking |

---

## 5. Key Takeaway

> **Greedy sensor placement** — process cells in order and place sensors at positions maximizing forward coverage. Classic interval/area covering pattern applied to grids.

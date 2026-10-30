# 3648. Minimum Sensors to Cover Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-sensors-to-cover-grid](https://leetcode.com/problems/minimum-sensors-to-cover-grid)
**Companies:** Amazon, Cisco, Google, Microsoft

---

## 1. Problem Description

> *Note: the Approach below covers 1-cells of a binary grid (invented). Officially every cell must be covered and a sensor covers a `(2k+1) × (2k+1)` square, so the answer is `ceil(n/(2k+1)) · ceil(m/(2k+1))`.*

You are given `n × m` grid and an integer `k`.

A sensor placed on cell `(r, c)` covers all cells whose **Chebyshev distance** from `(r, c)` is **at most** `k`.

The **Chebyshev distance** between two cells `(r_1, c_1)` and `(r_2, c_2)` is `max(|r_1 − r_2|,|c_1 − c_2|)`.

Your task is to return the **minimum** number of sensors required to cover every cell of the grid.

**Constraints:**
- `1 <= n <= 10^3`
- `1 <= m <= 10^3`
- `0 <= k <= 10^3`

---

## 2. Examples

**Example 1:**
```
Input: n = 5, m = 5, k = 1
Output: 4
Explanation: Placing sensors at positions (0, 3), (1, 0), (3, 3), and (4, 1) ensures every cell in the grid is covered. Thus, the answer is 4.
```

**Example 2:**
```
Input: n = 2, m = 2, k = 2
Output: 1
Explanation: With k = 2, a single sensor can cover the entire 2 * 2 grid regardless of its position. Thus, the answer is 1.
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

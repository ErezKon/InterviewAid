# 1001. Grid Illumination

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/grid-illumination](https://leetcode.com/problems/grid-illumination)
**Companies:** Dropbox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Maps for Lines — O(lamps + queries) ✅](#3-approach-hash-maps-for-lines)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There is a 2D `grid` of size `n x n` where each cell of this grid has a lamp that is initially **turned off**.

You are given a 2D array of lamp positions `lamps`, where `lamps[i] = [row_i, col_i]` indicates that the lamp at `grid[row_i][col_i]` is **turned on**. Even if the same lamp is listed more than once, it is turned on.

When a lamp is turned on, it **illuminates its cell** and **all other cells** in the same **row, column, or diagonal**.

You are also given another 2D array `queries`, where `queries[j] = [row_j, col_j]`. For the `j`th query, determine whether `grid[row_j][col_j]` is illuminated or not. After answering the `j`th query, **turn off** the lamp at `grid[row_j][col_j]` and its **8 adjacent lamps** if they exist. A lamp is adjacent if its cell shares either a side or corner with `grid[row_j][col_j]`.

Return *an array of integers* `ans`*, where* `ans[j]` *should be* `1` *if the cell in the* `j`th *query was illuminated, or* `0` *if the lamp was not.*

**Constraints:**
- `1 <= n <= 10^9`
- `0 <= lamps.length <= 20000`
- `0 <= queries.length <= 20000`
- `lamps[i].length == 2`
- `0 <= row_i, col_i < n`
- `queries[j].length == 2`
- `0 <= row_j, col_j < n`

---

## 2. Key Insight

> Track lamp counts per row, column, and both diagonals using hash maps. A cell is illuminated if any of its 4 lines has count > 0. Turning off a lamp decrements counts.

---

## 3. Approach: Hash Maps for Lines — O(lamps + queries) ✅

```text
FUNCTION gridIllumination(n, lamps, queries):
    rows, cols, diag1, diag2 ← Counter()
    lampSet ← SET of (r,c) for each lamp

    FOR (r, c) IN lamps:
        rows[r]++
        cols[c]++
        diag1[r - c]++
        diag2[r + c]++

    result ← []
    FOR (qr, qc) IN queries:
        lit ← rows[qr] > 0 OR cols[qc] > 0 OR diag1[qr - qc] > 0 OR diag2[qr + qc] > 0
        result.ADD(1 IF lit ELSE 0)

        // Turn off lamps in 3×3 neighborhood
        FOR dr IN [-1,0,1]:
            FOR dc IN [-1,0,1]:
                nr ← qr + dr
                nc ← qc + dc
                IF (nr, nc) IN lampSet:
                    lampSet.REMOVE((nr, nc))
                    rows[nr]--
                    cols[nc]--
                    diag1[nr - nc]--
                    diag2[nr + nc]--

    RETURN result
```

---

## 4. Examples

```
Example 1:
  Input: n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
  Output: [1,0]
  Explanation: We have the initial grid with all lamps turned off. We turn on the lamp at grid[0][0] then turn on the lamp at grid[4][4].
  The 0th query asks if the lamp at grid[1][1] is illuminated or not. It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the 3x3 square around (1,1) (this turns off the lamp at (0,0)).
  The 1st query asks if the lamp at grid[1][0] is illuminated or not. It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the rectangle around (1,0).
```
```
Example 2:
  Input: n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
  Output: [1,1]
```
```
Example 3:
  Input: n = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
  Output: [1,1,0]
```

---

## 5. Walkthrough

1. Initialize counters for rows, columns, main diagonal (r-c), and anti-diagonal (r＋c).
2. Populate counters from the initial lamp list.
3. For each query:
   - Check illumination by looking up the four counters.
   - Append 1 (illuminated) or 0 (dark) to result.
   - Iterate over the 3×3 block centered at the query cell; for any lamp present, remove it from the set and decrement its four counters.
4. Return the result list.

---

## 6. Complexity Analysis

- **Time:** O(L + Q) where L = number of lamps, Q = number of queries. Each lamp is processed once, each query does O(1) illumination check plus up to 9 constant-time removals.
- **Space:** O(L) for storing lamp positions and the four hash maps.

---

## 7. Follow-Up Questions

1. How would you adapt the solution for a toroidal (wrap-around) grid?
2. Can the approach be extended to support dynamic addition of lamps after queries?
3. What if illumination also included knight-move cells?

---

## 8. Key Takeaway

> Use **four hash maps** (row, column, main diagonal, anti-diagonal) to maintain illumination counts, enabling O(1) per-query checks and O(1) lamp deactivations.

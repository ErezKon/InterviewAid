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

On an n×n grid, lamps illuminate their row, column, and both diagonals. For each query, check if the cell is illuminated, then turn off all lamps in the 3×3 neighborhood.

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

**Example 1:**
```
n = 5
lamps = [[0,0],[4,4]]
queries = [[1,1],[1,0]]
Output: [1,0]
```
*Both lamps illuminate (1,1). After the first query, the 3×3 area around (1,1) turns off the lamp at (0,0). The second query is then dark.

**Example 2:**
```
n = 3
lamps = [[0,0],[0,2],[2,0],[2,2]]
queries = [[1,1],[0,1],[2,1]]
Output: [1,1,1]
```
*All four corner lamps illuminate the center and edges. Each query turns off surrounding lamps, but remaining corners still illuminate subsequent queries.

---

## 5. Walkthrough

1. Initialize counters for rows, columns, main diagonal (r‑c), and anti‑diagonal (r＋c).
2. Populate counters from the initial lamp list.
3. For each query:
   - Check illumination by looking up the four counters.
   - Append 1 (illuminated) or 0 (dark) to result.
   - Iterate over the 3×3 block centered at the query cell; for any lamp present, remove it from the set and decrement its four counters.
4. Return the result list.

---

## 6. Complexity Analysis

- **Time:** O(L + Q) where L = number of lamps, Q = number of queries. Each lamp is processed once, each query does O(1) illumination check plus up to 9 constant‑time removals.
- **Space:** O(L) for storing lamp positions and the four hash maps.

---

## 7. Follow-Up Questions

1. How would you adapt the solution for a toroidal (wrap‑around) grid?
2. Can the approach be extended to support dynamic addition of lamps after queries?
3. What if illumination also included knight‑move cells?

---

## 8. Key Takeaway

> Use **four hash maps** (row, column, main diagonal, anti‑diagonal) to maintain illumination counts, enabling O(1) per‑query checks and O(1) lamp deactivations.

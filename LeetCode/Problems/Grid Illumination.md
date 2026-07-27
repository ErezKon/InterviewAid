# 1001. Grid Illumination

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/grid-illumination](https://leetcode.com/problems/grid-illumination)
**Companies:** Dropbox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Maps for Lines — O(lamps + queries) ✅](#3-approach-hash-maps-for-lines)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

On an n×n grid, lamps illuminate their row, column, and both diagonals. For each query, check if the cell is illuminated, then turn off all lamps in the 3×3 neighborhood.

---

## 2. Key Insight

> Track lamp counts per row, column, and both diagonals using hash maps. A cell is illuminated if any of its 4 lines has count > 0. Turning off a lamp decrements counts.

---

## 3. Approach: Hash Maps for Lines — O(lamps + queries) ✅

```
FUNCTION gridIllumination(n, lamps, queries):
    rows, cols, diag1, diag2 ← Counter()
    lampSet ← SET of (r,c) for each lamp

    FOR (r, c) IN lamps:
        rows[r]++; cols[c]++; diag1[r-c]++; diag2[r+c]++

    result ← []
    FOR (qr, qc) IN queries:
        lit ← rows[qr] > 0 OR cols[qc] > 0 OR diag1[qr-qc] > 0 OR diag2[qr+qc] > 0
        result.ADD(1 IF lit ELSE 0)

        // Turn off lamps in 3×3 neighborhood
        FOR dr, dc IN [-1,0,1] × [-1,0,1]:
            nr, nc ← qr+dr, qc+dc
            IF (nr, nc) IN lampSet:
                lampSet.REMOVE((nr, nc))
                rows[nr]--; cols[nc]--; diag1[nr-nc]--; diag2[nr+nc]--

    RETURN result
```

---

## 4. Key Takeaway

> Use **4 hash maps** (row, col, diag, anti-diag) to track illumination counts. O(1) per query check, O(1) per lamp toggle.

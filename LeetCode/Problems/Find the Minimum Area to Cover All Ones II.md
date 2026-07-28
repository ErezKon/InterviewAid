# 3197. Find the Minimum Area to Cover All Ones II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii)
**Companies:** Amazon, Google, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate 6 Partition Schemes — O(m²·n + m·n²) ✅](#4-approach-enumerate-6-partition-schemes)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m x n` binary grid, cover all 1s with exactly **3 non‑overlapping axis‑aligned rectangles**. Minimize the total area.

**Constraints:**
- `1 <= m, n <= 30`

---

## 2. Examples

| Grid | Minimum Area |
|------|--------------|
| `[[1,0],[0,1]]` | 3 |
| `[[1,1,0],[0,1,1]]` | 5 |

*Explanation:* The optimal placement of three rectangles is shown in the illustration (omitted). The total covered cells equal the minimum area.

---

## 3. Key Insight

> Three rectangles can only be arranged in 6 topological configurations using horizontal and vertical splits. Enumerate each, compute minimum bounding box per partition, and take the global minimum total area.

---

## 4. Approach: Enumerate 6 Partition Schemes — O(m²·n + m·n²) ✅

```text
FUNCTION minimumArea(grid):
    // 6 configurations:
    // 1. Three horizontal strips
    // 2. Three vertical strips
    // 3. Top strip + bottom split vertically
    // 4. Top strip + bottom split horizontally (2 more variants)
    // 5. Left strip + right split horizontally
    // 6. Left strip + right split vertically (2 more variants)

    // For each config, try all split positions
    // compute bounding box area in each sub‑region
    // Minimize total

    RETURN MIN over all 6 configs
```

---

## 5. Walkthrough

Consider the grid `[[1,0],[0,1]]` (2 × 2).

1. **Configuration 1 – three horizontal strips:**
   - Split rows at positions 0 and 1 → rectangles cover rows `[0]`, `[1]`, and an empty third strip.
   - Areas: 1, 1, 0 → total 2 (does not cover both 1s).
2. **Configuration 2 – three vertical strips:**
   - Similar result, total area 2.
3. **Configuration 3 – top strip + bottom split vertically:**
   - Top strip (row 0) covers cell (0,0) → area 1.
   - Bottom region (row 1) split vertically at column 1 → rectangle covering (1,1) → area 1.
   - Third rectangle empty → total area 2.
4. After enumerating all 6 configurations, the minimum total area that covers both 1s is **3**, achieved by using a 2 × 1 rectangle covering both 1s and a 1 × 1 rectangle for the remaining cell.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m²·n + m·n²) — enumerate splits |
| **Space** | O(m·n) — prefix sums for bounding boxes |

---

## 7. Follow-Up Questions

1. How would the solution change if the number of rectangles is a variable *k*?
2. Can the problem be solved in sub‑quadratic time for larger grids?
3. What modifications are needed to handle weighted cells instead of binary values?

---

## 8. Key Takeaway

> **Enumerate all valid 3‑rectangle partition topologies.** With only 6 fundamental configurations, brute‑force over split positions is efficient for small grids.

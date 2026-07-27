# 3197. Find the Minimum Area to Cover All Ones II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii)
**Companies:** Amazon, Google, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate 6 Partition Schemes — O(m²·n + m·n²) ✅](#3-approach-enumerate-6-partition-schemes)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `m x n` binary grid, cover all 1s with exactly **3 non-overlapping axis-aligned rectangles**. Minimize the total area.

**Constraints:**
- `1 <= m, n <= 30`

---

## 2. Key Insight

> Three rectangles can only be arranged in 6 topological configurations using horizontal and vertical splits. Enumerate each, compute minimum bounding box per partition, and take the global minimum total area.

---

## 3. Approach: Enumerate 6 Partition Schemes — O(m²·n + m·n²) ✅

```
FUNCTION minimumArea(grid):
    // 6 configurations:
    // 1. Three horizontal strips
    // 2. Three vertical strips
    // 3. Top strip + bottom split vertically
    // 4. Top strip + bottom split horizontally (2 more variants)
    // 5. Left strip + right split horizontally
    // 6. Left strip + right split vertically (2 more variants)

    // For each config, try all split positions
    // compute bounding box area in each sub-region
    // Minimize total

    RETURN MIN over all 6 configs
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m² · n + m · n²) — enumerate splits |
| **Space** | O(m · n) — prefix sums for bounding boxes |

---

## 5. Key Takeaway

> **Enumerate all valid 3-rectangle partition topologies.** With only 6 fundamental configurations, brute force over split positions is efficient for small grids.

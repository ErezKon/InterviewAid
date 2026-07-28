# 447. Number of Boomerangs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-boomerangs](https://leetcode.com/problems/number-of-boomerangs)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` points in the plane, count all ordered tuples `(i, j, k)` such that the distance between point `i` and point `j` equals the distance between point `i` and point `k`, and `j ≠ k`.

---

## 2. Key Insight

> For each anchor point `i`, group all other points by their squared distance to `i`. If `k` points share the same distance, they generate `k × (k‑1)` ordered boomerangs because any ordered pair `(j, k)` works.

---

## 3. Approach

**Algorithm** – Iterate over each point as the anchor, compute squared distances to all other points, store frequencies in a hash map, then sum `cnt * (cnt‑1)` for each frequency.

```text
FUNCTION numberOfBoomerangs(points):
    total ← 0
    FOR each point p IN points:
        distMap ← MAP()
        FOR each point q IN points WHERE q ≠ p:
            d ← (p.x - q.x)^2 + (p.y - q.y)^2
            distMap[d] ← distMap.get(d, 0) + 1
        FOR cnt IN distMap.values():
            total ← total + cnt * (cnt - 1)
    RETURN total
```

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[0,0],[1,0],[2,0]]` | `2` | Anchor at `(1,0)` has two points at distance `1`, yielding `2` ordered boomerangs. |
| `[[1,1],[2,2],[3,3],[4,4]]` | `8` | Each middle point sees two equidistant neighbors, contributing `2` each; total `8`.

---

## 5. Walkthrough

Take points `[[0,0],[1,0],[2,0]]`.

1. Anchor `(0,0)`: distances → `{(1,0):1, (2,0):4}` → no frequency ≥2 → 0 boomerangs.
2. Anchor `(1,0)`: distances → `{(0,0):1, (2,0):1}` → frequency `1` occurs twice → `2 * (2‑1) = 2` boomerangs.
3. Anchor `(2,0)`: similar to step 1 → 0.

Sum = `2`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) – compute distances for each pair of points |
| **Space** | O(n) – hash map for distances of a single anchor |

---

## 7. Key Takeaway

> **Group by distance:** For each anchor, `k` equidistant points generate `k(k‑1)` ordered boomerangs. Using a hash map yields an O(n²) solution.

# 447. Number of Boomerangs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-boomerangs](https://leetcode.com/problems/number-of-boomerangs)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map of Distances — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` points, count all tuples `(i, j, k)` where `dist(i, j) == dist(i, k)` and `j ≠ k`.

---

## 2. Key Insight

> For each point `i`, group other points by distance. If `k` points are at the same distance from `i`, they contribute `k × (k-1)` ordered boomerangs (permutations of 2 from k).

---

## 3. Approach: Hash Map of Distances — O(n²) ✅

```
FUNCTION numberOfBoomerangs(points):
    count = 0
    FOR each point p:
        distMap = Counter()
        FOR each other point q:
            d = squaredDistance(p, q)
            distMap[d] += 1
        FOR k IN distMap.values():
            count += k * (k - 1)
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Group by distance, count permutations.** For each anchor point, `k` equidistant points yield `P(k,2) = k(k-1)` boomerangs. Use squared distance to avoid floating point.

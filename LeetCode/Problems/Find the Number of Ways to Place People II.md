# 3027. Find the Number of Ways to Place People II

**Difficulty:** 🔴 Hard

**Companies:** Google, Meta, Uber
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Greedy Scan — O(n²) ✅](#3-approach-sort--greedy-scan--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Part I but with larger constraints (n ≤ 1000). Count valid (Alice, Bob) pairs where Alice is upper-left, Bob is lower-right, and no other point lies strictly inside their rectangle.

---

## 2. Key Insight

> Sort by x ascending, y descending. For each Alice, scan subsequent points as potential Bobs. Track the minimum y seen among intermediate points to quickly check if any point falls inside.

---

## 3. Approach: Sort + Greedy Scan — O(n²) ✅

```
FUNCTION numberOfPairs(points):
    // Sort by x asc, y desc
    SORT(points by x asc, then y desc)
    count ← 0

    FOR i ← 0 TO n - 1 DO
        maxY ← -∞   // track max y of intermediate points
        FOR j ← i + 1 TO n - 1 DO
            IF points[j][1] <= points[i][1] THEN
                // Bob candidate: lower or equal y
                IF points[j][1] > maxY THEN
                    count += 1    // no point with higher y was inside
            maxY ← MAX(maxY, points[j][1])

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(1) (excluding sort) |

---

## 5. Key Takeaway

> **Sorting + tracking max intermediate y** eliminates the inner O(n) check. After sorting, scan potential Bobs in order and a Bob is valid only if no previously seen point has a higher y (meaning it'd be inside the rectangle).

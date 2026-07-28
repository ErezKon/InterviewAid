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

## 2. Examples

| # | points | Output |
|---|--------|--------|
| 1 | `[[0,0],[1,1],[2,2],[3,3]]` | `6` |
| 2 | `[[0,3],[1,2],[2,1],[3,0]]` | `4` |

*Explanation*: After sorting, each pair that satisfies the geometric condition and has no interior points is counted.

---

## 3. Approach: Sort + Greedy Scan — O(n²) ✅

```text
FUNCTION numberOfPairs(points):
    // Sort by x ascending, y descending
    SORT(points BY x ASC, y DESC)
    SET n ← LENGTH(points)
    SET count ← 0
    FOR i ← 0 TO n - 1:
        SET maxY ← -∞
        FOR j ← i + 1 TO n - 1:
            IF points[j][1] <= points[i][1]:
                // Bob candidate: lower or equal y
                IF points[j][1] > maxY:
                    SET count ← count + 1    // no interior point with higher y
            SET maxY ← MAX(maxY, points[j][1])
    RETURN count
```

---

## 4. Walkthrough

Take points `[[0,0],[1,2],[2,1],[3,3]]`.
1. After sorting: `[(0,0),(1,2),(2,1),(3,3)]`.
2. For `i=0` (point (0,0)), scan j:
   - j=1: y=2 > 0 → not a lower‑right candidate.
   - j=2: y=1 > 0 → not candidate.
   - j=3: y=3 > 0 → not candidate.
   No pairs from i=0.
3. For `i=1` (1,2), maxY starts `-∞`.
   - j=2: y=1 ≤ 2 and 1 > -∞ → count++ (pair (1,2)). maxY=1.
   - j=3: y=3 > 2 → not candidate.
   Resulting count = 1.
Continue similarly for remaining i to obtain total valid pairs.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — double loop after sorting |
| **Space** | O(1) extra (in‑place sort) |

---

## 6. Follow-Up Questions

- How would you handle `n` up to 10⁵? (Consider sweep line with segment tree.)
- What if points can share the same x or y coordinate?
- Can the problem be extended to count unordered pairs only?

---

## 7. Key Takeaway

> **Sorting + tracking max intermediate y** eliminates the inner O(n) check. After sorting, a Bob is valid only if no previously seen point has a higher y, enabling an O(n²) solution.

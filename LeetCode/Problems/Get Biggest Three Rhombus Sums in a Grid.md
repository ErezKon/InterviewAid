# 1878. Get Biggest Three Rhombus Sums in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid](https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid)
**Companies:** Amazon, Google, Quora, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Enumerate All Rhombi — O(m · n · min(m,n)) ✅](#2-approach-enumerate-all-rhombi)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find the biggest three distinct rhombus sums in a grid. A rhombus is defined by its center and size (border elements summed along diagonals).

---

## 2. Approach: Enumerate All Rhombi — O(m · n · min(m,n)) ✅

```
FUNCTION getBiggestThree(grid):
    sums = set()
    m, n = dimensions

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            sums.ADD(grid[r][c])    // size 0 rhombus
            FOR size ← 1 TO ...:
                IF out of bounds: BREAK
                // Sum border of rhombus with center (r,c) and given size
                sums.ADD(rhombusSum)

    top3 = sorted(sums, reverse=True)[:3]
    RETURN top3
```

---

## 3. Key Takeaway

> Enumerate all centers and sizes, sum the 4 diagonal edges. Use prefix sums on diagonals for O(1) per rhombus sum if needed.

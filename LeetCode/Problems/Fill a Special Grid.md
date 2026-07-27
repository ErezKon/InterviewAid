# 3537. Fill a Special Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fill-a-special-grid](https://leetcode.com/problems/fill-a-special-grid)
**Companies:** Google

---

## Problem Description

Fill a `2^n × 2^n` grid with numbers `0` to `2^(2n) - 1` such that for any two cells `(r1,c1)` and `(r2,c2)`: if `r1 ≤ r2` and `c1 ≤ c2`, then `grid[r1][c1] > grid[r2][c2]` (i.e., values decrease going down-right).

---

## Key Insight

> Divide-and-conquer: split the grid into 4 quadrants. Fill bottom-right first (smallest values), then bottom-left, then top-right, then top-left (largest values). This ensures the decreasing property.

---

## Approach: Recursive Divide and Conquer ✅

```
FUNCTION specialGrid(n):
    size = 2^n
    grid = size × size matrix
    counter = 0

    FUNCTION fill(r, c, s):
        IF s == 1:
            grid[r][c] = counter++
            RETURN
        half = s / 2
        fill(r + half, c + half, half)  // bottom-right
        fill(r + half, c, half)          // bottom-left
        fill(r, c + half, half)          // top-right
        fill(r, c, half)                 // top-left

    fill(0, 0, size)
    RETURN grid
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(4^n) — fill every cell |
| **Space** | O(4^n) — the grid |

---

## Key Takeaway

> **Recursive quadrant filling with specific order ensures monotonic decrease. Classic divide-and-conquer on grids.**

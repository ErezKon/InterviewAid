# 1139. Largest 1-Bordered Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-1-bordered-square](https://leetcode.com/problems/largest-1-bordered-square)
**Companies:** Amazon, Samsung, Uber, Zs Associates

---

## 1. Problem Description

Given an `m × n` grid of 0s and 1s, return the area of the largest square whose **border** is all 1s. (Interior can be anything.)

---

## 2. Approach: Prefix Sums — O(m·n·min(m,n)) ✅

Precompute consecutive 1s to the left and above each cell. For each cell as bottom-right corner, check all possible side lengths.

```
FUNCTION largest1BorderedSquare(grid):
    m, n = dimensions
    // Precompute consecutive 1s to the left and above each cell
    left = m × n; above = m × n
    FOR r, c: compute left[r][c], above[r][c]

    FOR side ← MIN(m, n) DOWN TO 1:
        FOR r ← side - 1 TO m - 1:
            FOR c ← side - 1 TO n - 1:
                IF left[r][c] >= side AND above[r][c] >= side AND
                   left[r - side + 1][c] >= side AND above[r][c - side + 1] >= side:
                    RETURN side * side
    RETURN 0
```

| Time | Space |
|------|-------|
| O(m·n·min(m,n)) | O(m·n) |

---

## 3. Key Takeaway

> Precompute runs of consecutive 1s in two directions (left and above). A square border exists if all four edges have sufficient consecutive 1s. Search from largest side down for early termination.

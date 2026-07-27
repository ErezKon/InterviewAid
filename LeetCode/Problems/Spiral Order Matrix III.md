# 885. Spiral Matrix III

**Difficulty:** 🟡 Medium
**Acceptance:** 78.0%
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iii](https://leetcode.com/problems/spiral-matrix-iii)
**Companies:** Amazon, Apple, Bloomberg, Dataminr, Google, Meta, Microsoft, Uber

---

## 1. Problem Description

Starting from `(rStart, cStart)` in an R×C grid, walk in a clockwise spiral. Return coordinates of all cells in the order visited.

---

## 2. Approach: Spiral Walk with Increasing Steps — O(max(R,C)²) ✅

```
FUNCTION spiralMatrixIII(rows, cols, rStart, cStart):
    result = [(rStart, cStart)]
    directions = [(0,1), (1,0), (0,-1), (-1,0)]    // right, down, left, up
    steps = 1

    WHILE len(result) < rows * cols:
        FOR d ← 0 TO 3:
            FOR s ← 0 TO steps - 1:
                rStart += directions[d][0]
                cStart += directions[d][1]
                IF 0 <= rStart < rows AND 0 <= cStart < cols:
                    result.ADD((rStart, cStart))

            // Increase step count after right and left moves
            IF d == 0 OR d == 2:
                steps += 1

    RETURN result
```

---

## Key Takeaway

> Spiral: go right 1, down 1, left 2, up 2, right 3, down 3, left 4, ... Step count increases by 1 after every two direction changes.

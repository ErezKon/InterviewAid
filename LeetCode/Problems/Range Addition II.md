# 598. Range Addition II

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Ixl
---

## Problem Description
You are given an `m x n` matrix initialized with zeros. A list of operations `ops` is provided, where each operation is a pair `[a, b]` that increments every element in the sub‑matrix spanning rows `0` to `a-1` and columns `0` to `b-1` by one. After performing all operations, return the maximum integer present in the matrix.

## Examples
- Input: `m = 3, n = 3, ops = [[2,2],[3,3]]` → The overlapping region is a `2 x 2` sub‑matrix, so the maximum value is `2`.
- Input: `m = 2, n = 3, ops = []` → No operations, all cells remain `0`.

## Approach
The value of each cell equals the number of operations whose rectangle covers it. The maximum occurs in the intersection of all operation rectangles, i.e., the smallest `a` and smallest `b` across `ops`. Compute these minima and multiply.

```text
FUNCTION maxCount(m, n, ops):
    SET minA ← m
    SET minB ← n
    FOR each op IN ops:
        SET a ← op[0]
        SET b ← op[1]
        SET minA ← MIN(minA, a)
        SET minB ← MIN(minB, b)
    END FOR
    RETURN minA * minB
END FUNCTION
```

## Walkthrough
| Step | Operation | minA | minB |
|------|-----------|------|------|
|Init| – | 3 | 3 |
|[2,2]| minA = MIN(3,2)=2; minB = MIN(3,2)=2 |
|[3,3]| minA = MIN(2,3)=2; minB = MIN(2,3)=2 |
|Result| → 2 × 2 = 4 (maximum value in overlapping region) |

## Complexity Analysis
- Time: O(k) where k = number of operations.
- Space: O(1) additional space.

## Follow‑Up Questions
1. How would you modify the solution for decrement operations?
2. What if each operation adds a different value instead of `1`?
3. Can you extend this to three‑dimensional cuboids?

## Key Takeaway
The maximum value after all range additions is simply the area of the intersection of all operation rectangles, found by tracking the minimum row and column bounds.

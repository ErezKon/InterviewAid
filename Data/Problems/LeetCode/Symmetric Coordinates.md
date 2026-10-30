# 2978. Symmetric Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/symmetric-coordinates](https://leetcode.com/problems/symmetric-coordinates)
**Companies:** Mitsogo

---

## Problem Description

> *Note: #2978 "Symmetric Coordinates" is a premium **SQL** problem (table `Coordinates(X, Y)`: find pairs `(X1, Y1)`, `(X2, Y2)` with `X1 = Y2` and `X2 = Y1`, output distinct pairs with `X ≤ Y`, ordered by X, Y). The statement below is the official one (via doocs); the Approach/Walkthrough further down still solve an invented algorithmic problem and need an SQL rewrite.*

Table: `Coordinates`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| X           | int  |
| Y           | int  |
+-------------+------+
Each row includes X and Y, where both are integers. Table may contain duplicate values.
```

Two coordindates `(X1, Y1)` and `(X2, Y2)` are said to be **symmetric** coordintes if `X1 == Y2` and `X2 == Y1`.

Write a solution that outputs, among all these **symmetric** **coordintes**, only those **unique** coordinates that satisfy the condition `X1 <= Y1`.

Return *the result table ordered by *`X` *and * `Y` *(respectively)* *in **ascending order***.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Coordinates table:
+----+----+
| X  | Y  |
+----+----+
| 20 | 20 |
| 20 | 20 |
| 20 | 21 |
| 23 | 22 |
| 22 | 23 |
| 21 | 20 |
+----+----+
Output:
+----+----+
| x  | y  |
+----+----+
| 20 | 20 |
| 20 | 21 |
| 22 | 23 |
+----+----+
Explanation:
- (20, 20) and (20, 20) are symmetric coordinates because, X1 == Y2 and X2 == Y1. This results in displaying (20, 20) as a distinctive coordinates.
- (20, 21) and (21, 20) are symmetric coordinates because, X1 == Y2 and X2 == Y1. However, only (20, 21) will be displayed because X1 <= Y1.
- (23, 22) and (22, 23) are symmetric coordinates because, X1 == Y2 and X2 == Y1. However, only (22, 23) will be displayed because X1 <= Y1.
The output table is sorted by X and Y in ascending order.
```

## Approach
Compute the candidate symmetry line as the average of the minimum and maximum x‑coordinates. Then verify that for each point its mirrored counterpart exists using a hash set of encoded points.

```text
FUNCTION hasSymmetry(points):
    SET minX ← +∞, maxX ← -∞
    FOR each (x, y) IN points:
        SET minX ← MIN(minX, x)
        SET maxX ← MAX(maxX, x)
    SET line ← (minX + maxX) / 2   // candidate k
    CREATE set ← empty hash set
    FOR each (x, y) IN points:
        ADD (x, y) TO set   // encode as string "x#y"
    FOR each (x, y) IN points:
        SET mirrorX ← 2*line - x
        IF (mirrorX, y) NOT IN set:
            RETURN false
    RETURN true
```

## Walkthrough
For `points = [[1,1],[-1,1]]`:
- `minX = -1`, `maxX = 1` → `line = 0`.
- Set contains `{(1,1), (-1,1)}`.
- Mirror of `(1,1)` is `(-1,1)` → present.
- Mirror of `(-1,1)` is `(1,1)` → present.
- All checks pass → return `true`.

## Complexity Analysis
- **Time:** O(n) – one pass to find min/max and another to verify.
- **Space:** O(n) – hash set storing all points.

## Follow‑Up Questions
1. How would you handle symmetry about a horizontal line `y = k`?
2. Can the algorithm be extended to check for diagonal symmetry?
3. What changes if the input size is huge and cannot fit into memory?

## Key Takeaway
The symmetry line is uniquely determined by the extreme x‑coordinates; verifying mirrored points with a hash set yields an O(n) solution.

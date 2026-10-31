# 2978. Symmetric Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/symmetric-coordinates](https://leetcode.com/problems/symmetric-coordinates)
**Companies:** Mitsogo

---

## Problem Description

> *Note: #2978 "Symmetric Coordinates" is a premium **SQL** problem (table `Coordinates(X, Y)`: find pairs `(X1, Y1)`, `(X2, Y2)` with `X1 = Y2` and `X2 = Y1`, output distinct pairs with `X ≤ Y`, ordered by X, Y). Statement verified via doocs; Approach rewritten as SQL in session 8.*

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
Give every row an id with `ROW_NUMBER()` (the table can hold duplicates), self-join rows `a`, `b` where `a.X = b.Y` and `a.Y = b.X` and the two rows are **different** (`a.id <> b.id`). The id check matters for points on the diagonal: `(20, 20)` is only symmetric if it appears at least twice. Keep `a.X <= a.Y`, de-duplicate, and sort.

```sql
WITH t AS (
    SELECT X, Y, ROW_NUMBER() OVER () AS id
    FROM Coordinates
)
SELECT DISTINCT a.X AS x, a.Y AS y
FROM t a
JOIN t b
  ON a.X = b.Y AND a.Y = b.X AND a.id <> b.id
WHERE a.X <= a.Y
ORDER BY x, y;
```

## Walkthrough
For the example table (ids 1–6 in input order):
- Row 1 `(20, 20)` matches row 2 `(20, 20)` (different id) → keep `(20, 20)`; row 2 matches row 1 → same pair, removed by `DISTINCT`.
- Row 3 `(20, 21)` matches row 6 `(21, 20)` → `20 <= 21`, keep `(20, 21)`; row 6 fails `X <= Y`.
- Row 5 `(22, 23)` matches row 4 `(23, 22)` → keep `(22, 23)`; row 4 fails `X <= Y`.
- Sorted result: `(20, 20)`, `(20, 21)`, `(22, 23)`.

## Complexity Analysis
- **Time:** O(n log n) with a hash/merge join on `(X, Y)` plus the final sort (O(n²) worst case for a naive nested-loop join with many duplicates).
- **Space:** O(n) for the numbered CTE and join buffers.

## Follow-Up Questions
1. How would you count how many symmetric partners each coordinate has?
2. How would you solve it without window functions (e.g. `GROUP BY X, Y` with `COUNT(*) > 1` for diagonal points)?
3. Which index would speed up the self-join?

## Key Takeaway
A self-join with swapped columns finds mirrored pairs; number the rows first so a diagonal point is not matched with itself.

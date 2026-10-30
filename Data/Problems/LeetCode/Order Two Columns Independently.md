# 2159. Order Two Columns Independently

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/order-two-columns-independently](https://leetcode.com/problems/order-two-columns-independently)
**Companies:** Bookingcom

---

## Problem Description

> *Note: the Approach below solves an invented matrix-pairing problem. This is SQL: number `first_col` ascending and `second_col` descending separately with `ROW_NUMBER()`, then join the two numbered lists on the row number (ordered by it).*

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Data`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| first_col   | int  |
| second_col  | int  |
+-------------+------+
This table may contain duplicate rows.
```

Write a solution to independently:

- order `first_col` in **ascending order**.
- order `second_col` in **descending order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Data table:
+-----------+------------+
| first_col | second_col |
+-----------+------------+
| 4         | 2          |
| 2         | 3          |
| 3         | 1          |
| 1         | 4          |
+-----------+------------+
Output:
+-----------+------------+
| first_col | second_col |
+-----------+------------+
| 1         | 4          |
| 2         | 3          |
| 3         | 2          |
| 4         | 1          |
+-----------+------------+
```

## Approach
The optimal strategy is to sort each column independently and then pair the i‑th smallest element of column 1 with the i‑th smallest element of column 2. This minimizes the sum of absolute differences by the rearrangement inequality.

## Walkthrough
| Step | Sorted col1 | Sorted col2 | Pairwise diff |
|------|-------------|-------------|---------------|
| 1    | [1,2,3]     | [1,2,3]     | 0,0,0         |
| 2    | [3,4,5]     | [1,2,3]     | 2,2,2 → sum 6 (but alternative pairing can lower it) |

## Complexity Analysis
- **Time:** O(n log n) for sorting each column.
- **Space:** O(n) to store the two column arrays.

## Follow-Up Questions
1. How would the solution change if the matrix had more than two columns?
2. Can you extend the approach to minimize the maximum absolute difference instead of the sum?
3. What if each column could be sorted only in non‑decreasing order but rows cannot be reordered?

## Key Takeaway
Sorting each column independently and pairing elements by their order yields the minimal sum of absolute differences due to the rearrangement inequality.

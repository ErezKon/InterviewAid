# 1337. The K Weakest Rows in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix](https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given an `m x n` binary matrix `mat` of `1`'s (representing soldiers) and `0`'s (representing civilians). The soldiers are positioned **in front** of the civilians. That is, all the `1`'s will appear to the **left** of all the `0`'s in each row.

A row `i` is **weaker** than a row `j` if one of the following is true:

- The number of soldiers in row `i` is less than the number of soldiers in row `j`.
- Both rows have the same number of soldiers and `i < j`.

Return *the indices of the* `k` ***weakest** rows in the matrix ordered from weakest to strongest*.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `2 <= n, m <= 100`
- `1 <= k <= m`
- `matrix[i][j]` is either 0 or 1.

## Examples
```
Example 1:
  Input: mat =
  [[1,1,0,0,0],
   [1,1,1,1,0],
   [1,0,0,0,0],
   [1,1,0,0,0],
   [1,1,1,1,1]],
  k = 3
  Output: [2,0,3]
  Explanation:
  The number of soldiers in each row is:
  - Row 0: 2
  - Row 1: 4
  - Row 2: 1
  - Row 3: 2
  - Row 4: 5
  The rows ordered from weakest to strongest are [2,0,3,1,4].
```
```
Example 2:
  Input: mat =
  [[1,0,0,0],
   [1,1,1,1],
   [1,0,0,0],
   [1,0,0,0]],
  k = 2
  Output: [0,2]
  Explanation:
  The number of soldiers in each row is:
  - Row 0: 1
  - Row 1: 4
  - Row 2: 1
  - Row 3: 1
  The rows ordered from weakest to strongest are [0,2,3,1].
```

## Approach
1. For each row, count the number of 1's (its strength). Because rows are sorted, the count can be obtained with binary search for the first 0.
2. Store pairs `(strength, index)` for all rows.
3. Sort the pairs by strength then by index.
4. Return the first `k` indices.

## Walkthrough
| Row Index | Row | Strength (count of 1's) |
|-----------|-----|--------------------------|
| 0 | [1,1,0,0,0] | 2 |
| 1 | [1,1,1,1,0] | 4 |
| 2 | [1,0,0,0,0] | 1 |
| 3 | [1,1,0,0,0] | 2 |
| 4 | [1,1,1,1,1] | 5 |
After sorting by (strength, index): (1,2), (2,0), (2,3), (4,1), (5,4). First 3 indices → [2,0,3].

## Complexity Analysis
- Time: O(m log n) for binary searches + O(m log m) for sorting → O(m log n + m log m).
- Space: O(m) to store the strength-index pairs.

## Follow-Up Questions
1. How would you solve the problem in O(m + n log k) using a min-heap of size `k`?
2. Can you modify the algorithm to handle rows that are not sorted?
3. What if the matrix is streamed row by row and you cannot store all rows at once?

## Key Takeaway
Counting per-row strengths with binary search and sorting by (strength, index) yields a simple and efficient solution.

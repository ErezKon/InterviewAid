# 3402. Minimum Operations to Make Columns Strictly Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing](https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing)
**Companies:** Ibm

---

## Problem Description
You are given a `m x n` matrix `grid` consisting of **non-negative** integers.

In one operation, you can increment the value of any `grid[i][j]` by 1.

Return the **minimum** number of operations needed to make all columns of `grid` **strictly increasing**.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `0 <= grid[i][j] < 2500`

## Examples

```
Example 1:
  Input: grid = [[3,2],[1,3],[3,4],[0,1]]
  Output: 15
  Explanation:
  - To make the 0th column strictly increasing, we can apply 3 operations on grid[1][0], 2 operations on grid[2][0], and 6 operations on grid[3][0].
  - To make the 1st column strictly increasing, we can apply 4 operations on grid[3][1].
```

```
Example 2:
  Input: grid = [[3,2,1],[2,1,0],[1,2,3]]
  Output: 12
  Explanation:
  - To make the 0th column strictly increasing, we can apply 2 operations on grid[1][0], and 4 operations on grid[2][0].
  - To make the 1st column strictly increasing, we can apply 2 operations on grid[1][1], and 2 operations on grid[2][1].
  - To make the 2nd column strictly increasing, we can apply 2 operations on grid[1][2].
```

## Approach
Process each column independently. For a column, iterate from the second row downwards, ensuring the current value is greater than the previous value. If not, compute the needed increment (`prev + 1 - current`) and add it to the operation count, then set the current value to `prev + 1`. Sum operations across all columns.

## Walkthrough
| Row | Column 0 before | Column 0 after | Ops added |
|-----|----------------|----------------|----------|
|0|3|3|0|
|1|2|4 (needs 2) |2|
|2|1|5 (needs 4) |4|
Total for column 0 = 6 (example illustrates logic). Repeat similarly for other columns.

## Complexity Analysis
- **Time:** O(m × n) – each cell visited once.
- **Space:** O(1) – only constant extra variables.

## Follow-Up Questions
1. How would the solution change if you could also decrement elements?
2. Extend to make rows strictly increasing instead of columns.
3. What if each operation could increase an element by any positive integer at a cost equal to the increment?

## Key Takeaway
Treat each column independently and greedily raise each element just enough to maintain strict increase, accumulating the minimal total increments.

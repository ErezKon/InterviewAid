# 3402. Minimum Operations to Make Columns Strictly Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing](https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing)
**Companies:** Ibm

---

## Problem Description
Given an `m x n` matrix of non‑negative integers, you may increase any element by 1 in one operation. Determine the minimum number of operations required so that each column of the matrix becomes strictly increasing from top to bottom.

## Examples
- **Input:** `[[1,2],[2,3],[3,4]]` → **Output:** `0` – every column already strictly increases.
- **Input:** `[[3,1],[2,2],[1,3]]` → **Output:** `3` – increase column 0 values to `[1,2,3]` (2 ops) and column 1 values to `[1,2,3]` (1 op).

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

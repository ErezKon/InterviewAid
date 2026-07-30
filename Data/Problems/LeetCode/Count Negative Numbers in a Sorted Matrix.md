# 1351. Count Negative Numbers in a Sorted Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an `m x n` integer matrix `grid` where each row is sorted in non‑increasing order and each column is also sorted in non‑increasing order, return the total number of negative integers in the matrix.

## Examples
**Example 1:**
```
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negative numbers in the matrix.
```
**Example 2:**
```
Input: grid = [[3,2],[1,0]]
Output: 0
Explanation: No negative numbers.
```

## Approach
Start from the top‑right corner. If the current element is negative, all elements below it in the same column are also negative; add that count and move left. Otherwise move down. This “staircase” walk visits each row or column at most once.

## Walkthrough
| Position (row,col) | Value | Action | Negatives counted |
|--------------------|-------|--------|-------------------|
| (0,3) | -1 | negative → add `m‑0 = 4` → move left | 4 |
| (0,2) | 2  | non‑negative → move down | 4 |
| (1,2) | 1  | non‑negative → move down | 4 |
| (2,2) | -1 | negative → add `m‑2 = 2` → move left | 6 |
| (2,1) | 1  | non‑negative → move down | 6 |
| (3,1) | -1 | negative → add `m‑3 = 1` → move left | 7 |
| (3,0) | -1 | negative → add `m‑3 = 1` → move left (out) | 8 |

## Complexity Analysis
- **Time:** O(m + n) – each step moves either left or down.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would the algorithm change if rows were sorted in increasing order?
2. Can you extend the method to count numbers greater than a given threshold?
3. What if the matrix is not fully sorted but each row is sorted individually?

## Key Takeaway
The monotonic ordering lets a single “staircase” walk count all negatives in linear time without scanning every cell.

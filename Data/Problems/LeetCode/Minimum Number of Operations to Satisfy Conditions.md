# 3122. Minimum Number of Operations to Satisfy Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions](https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions)
**Companies:** Turing

---

## Problem Description

> *Note: the Approach below solves an invented "change by multiples of k" problem. Officially each column must become constant and adjacent columns must differ. Correct idea: DP over columns with the chosen digit `v ∈ 0..9`. The cost is `m − count(v in column)`, with the transition from the best previous digit `≠ v`. O(n·100).*

You are given a 2D matrix `grid` of size `m x n`. In one **operation**, you can change the value of **any** cell to **any** non-negative number. You need to perform some **operations** such that each cell `grid[i][j]` is:

- Equal to the cell below it, i.e. `grid[i][j] == grid[i + 1][j]` (if it exists).
- Different from the cell to its right, i.e. `grid[i][j] != grid[i][j + 1]` (if it exists).

Return the **minimum** number of operations needed.

**Constraints:**
- `1 <= n, m <= 1000`
- `0 <= grid[i][j] <= 9`

## Examples

**Example 1:**
```
Input: grid = [[1,0,2],[1,0,2]]
Output: 0
Explanation: ![img](https://assets.leetcode.com/uploads/2024/04/15/examplechanged.png)
All the cells in the matrix already satisfy the properties.
```

**Example 2:**
```
Input: grid = [[1,1,1],[0,0,0]]
Output: 3
Explanation: ![img](https://assets.leetcode.com/uploads/2024/03/27/example21.png)
The matrix becomes [[1,0,1],[1,0,1]] which satisfies the properties, by doing these 3 operations:
- Change grid[1][0] to 1.
- Change grid[0][1] to 0.
- Change grid[1][2] to 1.
```

**Example 3:**
```
Input: grid = [[1],[2],[3]]
Output: 2
Explanation: There is a single column. We can change the value to 1 in each cell using 2 operations.
```

## Approach
An element can only change its value by multiples of `k`. Therefore all numbers must share the same remainder when divided by `k`. If the remainders differ, the task is impossible.

If feasible, the optimal target value is the median of the transformed values `v_i = (nums[i] - r) / k` (where `r` is the common remainder). The number of operations equals the sum of absolute differences from this median.

1. Compute `r = nums[0] mod k` and verify every `nums[i] mod k == r`.
2. Transform each `nums[i]` to `v_i = (nums[i] - r) / k`.
3. Find the median `m` of `v_i` (O(n) with selection algorithm or O(n log n) sorting).
4. Answer = Σ |v_i - m|.

## Walkthrough
| i | nums[i] | v_i |
|---|---------|-----|
| 0 | 1 | (1‑1)/4 = 0 |
| 1 | 5 | (5‑1)/4 = 1 |
| 2 | 9 | (9‑1)/4 = 2 |
Median of {0,1,2} is 1 → operations = |0‑1|+|1‑1|+|2‑1| = 2.

## Complexity Analysis
- **Time:** O(n log n) for sorting (or O(n) with quick‑select).
- **Space:** O(n) for the transformed list.

## Follow‑Up Questions
1. How would you handle the case where `k` can be zero?
2. Can the solution be extended to minimize the maximum number of operations on any single element?
3. What changes if you are allowed to add or subtract any multiple of `k` in a single operation?

## Key Takeaway
All numbers must share the same modulo‑k remainder; once normalized, aligning them to the median of the scaled values yields the minimal operation count.

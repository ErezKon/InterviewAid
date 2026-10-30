# 2965. Find Missing and Repeated Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-missing-and-repeated-values](https://leetcode.com/problems/find-missing-and-repeated-values)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
You are given a **0-indexed** 2D integer matrix `grid` of size `n * n` with values in the range `[1, n^2]`. Each integer appears **exactly once** except `a` which appears **twice** and `b` which is **missing**. The task is to find the repeating and missing numbers `a` and `b`.

Return *a **0-indexed** integer array* `ans` *of size* `2` *where* `ans[0]` *equals to* `a` *and* `ans[1]` *equals to* `b`*.*

**Constraints:**
- `2 <= n == grid.length == grid[i].length <= 50`
- `1 <= grid[i][j] <= n * n`
- For all `x` that `1 <= x <= n * n` there is exactly one `x` that is not equal to any of the grid members.
- For all `x` that `1 <= x <= n * n` there is exactly one `x` that is equal to exactly two of the grid members.
- For all `x` that `1 <= x <= n * n` except two of them there is exactly one pair of `i, j` that `0 <= i, j <= n - 1` and `grid[i][j] == x`.

## Examples
```
Example 1:
  Input: grid = [[1,3],[2,2]]
  Output: [2,4]
  Explanation: Number 2 is repeated and number 4 is missing so the answer is [2,4].
```

```
Example 2:
  Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
  Output: [9,5]
  Explanation: Number 9 is repeated and number 5 is missing so the answer is [9,5].
```

## Approach
Count occurrences of each value using a hash table (or an array of size `n² + 1`). Iterate over the grid, incrementing the count for each cell. After counting, scan the count array to locate the value with count `2` (repeated) and the value with count `0` (missing).

## Walkthrough
For `grid = [[1,2],[2,4]]` (n = 2):
| cell | value | count after update |
|------|-------|--------------------|
| (0,0) | 1 | count[1] = 1 |
| (0,1) | 2 | count[2] = 1 |
| (1,0) | 2 | count[2] = 2 (repeated) |
| (1,1) | 4 | count[4] = 1 |
After counting, scanning `1..4` finds `count[2]=2` → repeated `2`, `count[3]=0` → missing `3`.

## Complexity Analysis
- **Time:** O(n²) to traverse the grid once, plus O(n²) to scan the count array – overall O(n²).
- **Space:** O(n²) for the count array (can be reduced to O(1) by in‑place marking, but hash table is clearer).

## Follow-Up Questions
- How would you solve the problem with O(1) extra space?
- Can you extend the solution to handle multiple duplicated/missing numbers?
- What changes are needed if the grid is not square?

## Key Takeaway
A simple frequency count quickly reveals the duplicated and missing values in a matrix containing a near‑complete range of numbers.

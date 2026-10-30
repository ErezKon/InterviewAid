# 2033. Minimum Operations to Make a Uni-Value Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid)
**Companies:** Amazon, Epam Systems, Google, Meta, Microsoft

---

## Problem Description
You are given a 2D integer `grid` of size `m x n` and an integer `x`.

In one operation, you can **add** `x` to or **subtract** `x` from any element in the `grid`.

A **uni-value grid** is a grid where all the elements of it are equal.

Return the **minimum** number of operations to make the grid **uni-value**. If it is not possible, return `-1`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `1 <= x, grid[i][j] <= 10^4`

## Examples

```
Example 1:
  Input: grid = [[2,4],[6,8]], x = 2
  Output: 4
  Explanation: We can make every element equal to 4 by doing the following:
  - Add x to 2 once.
  - Subtract x from 6 once.
  - Subtract x from 8 twice.
  A total of 4 operations were used.
```

```
Example 2:
  Input: grid = [[1,5],[2,3]], x = 1
  Output: 5
  Explanation: We can make every element equal to 3.
```

```
Example 3:
  Input: grid = [[1,2],[3,4]], x = 2
  Output: -1
  Explanation: It is impossible to make every element equal.
```

## Approach
The operation changes a cell by multiples of `x`; therefore all values must share the same remainder modulo `x`. If not, return `-1`. Otherwise, the optimal target value is the median of the flattened values (after sorting). The total operations equal the sum of absolute differences to the median divided by `x`.

```text
FUNCTION minOperations(grid, x):
    flat ← LIST of all values in grid
    SORT flat
    FOR each v IN flat:
        IF (v - flat[0]) % x != 0:
            RETURN -1
    median ← flat[LEN(flat) / 2]
    ops ← 0
    FOR each v IN flat:
        ops ← ops + ABS(v - median) / x
    RETURN ops
```

## Walkthrough
Consider `grid = [[2,4],[6,8]]`, `x = 2`.
1. Flatten → `[2,4,6,8]`, sorted already.
2. All values have remainder `0` modulo `2` → feasible.
3. Median = `6`.
4. Operations: `(6-2)/2 + (6-4)/2 + (6-6)/2 + (8-6)/2 = 2 + 1 + 0 + 1 = 4`.

## Complexity Analysis
- **Time:** O(m·n log(m·n)) for sorting `m*n` cells.
- **Space:** O(m·n) to store flattened list (can be reduced with counting sort for bounded values).

## Follow-Up Questions
1. How would the solution change if `x` could vary per operation?
2. Can you solve it in O(m·n) time without full sorting?
3. What if you must minimize the maximum number of operations on any single cell?

## Key Takeaway
When operations shift values by a fixed step, feasibility depends on equal remainders modulo that step, and the median yields the minimal total moves.

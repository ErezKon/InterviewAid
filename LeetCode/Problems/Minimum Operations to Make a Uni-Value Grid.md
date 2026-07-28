# 2033. Minimum Operations to Make a Uni-Value Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid)
**Companies:** Amazon, Epam Systems, Google, Meta, Microsoft

---

## Problem Description
Given a 2D integer grid and an integer `x`, you may add or subtract `x` from any cell any number of times. Determine the minimum number of operations required to make all grid values equal, or return `-1` if impossible.

## Examples
**Example 1:**
```
grid = [[2,4],[6,8]], x = 2
Output: 4
Explanation: Convert all values to 6 using four operations.
```
**Example 2:**
```
grid = [[1,5],[2,3]], x = 1
Output: -1
Explanation: Values have different remainders modulo 1, so impossible.
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

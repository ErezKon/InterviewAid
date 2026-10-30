# 3417. Zigzag Grid Traversal With Skip

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/zigzag-grid-traversal-with-skip](https://leetcode.com/problems/zigzag-grid-traversal-with-skip)
**Companies:** Google, Meta, Tcs

---

## Problem Description

You are given an `m x n` 2D array `grid` of **positive** integers.

Your task is to traverse `grid` in a **zigzag** pattern while skipping every **alternate** cell.

Zigzag pattern traversal is defined as following the below actions:

- Start at the top-left cell `(0, 0)`.
- Move *right* within a row until the end of the row is reached.
- Drop down to the next row, then traverse *left* until the beginning of the row is reached.
- Continue **alternating** between right and left traversal until every row has been traversed.

**Note **that you **must skip** every *alternate* cell during the traversal.

Return an array of integers `result` containing, **in order**, the value of the cells visited during the zigzag traversal with skips.

**Constraints:**
- `2 <= n == grid.length <= 50`
- `2 <= m == grid[i].length <= 50`
- `1 <= grid[i][j] <= 2500`

## Examples

**Example 1:**
```
Input: grid = [[1,2],[3,4]]
Output: [1,4]
Explanation: ![img](https://assets.leetcode.com/uploads/2024/11/23/4012_example0.png)
```

**Example 2:**
```
Input: grid = [[2,1],[2,1],[2,1]]
Output: [2,1,2]
Explanation:
```

**Example 3:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,3,5,7,9]
Explanation:
```

## Approach
Simulate the traversal row by row, maintaining a boolean `take` that indicates whether the current element should be collected. Flip `take` after each element visited.
1. Iterate rows `i` from `0` to `m-1`.
2. Determine traversal direction: if `i` is even, iterate columns `0..n-1`; else `n-1..0`.
3. For each cell, if `take` is true, append the value to the result list.
4. Toggle `take` after processing each cell.

```text
FUNCTION zigzagSkip(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid[0])
    result ← []
    take ← TRUE
    FOR i FROM 0 TO m-1:
        IF i MOD 2 = 0:
            colRange ← 0 TO n-1
        ELSE:
            colRange ← n-1 TO 0
        FOR j IN colRange:
            IF take:
                result.APPEND(grid[i][j])
            take ← NOT take
    RETURN result
```

## Walkthrough
| Row | Direction | Cells visited (order) | Collected values |
|-----|-----------|-----------------------|------------------|
| 0 | L→R | 1,2,3 | 1,3 |
| 1 | R→L | 6,5,4 | 5 |
| 2 | L→R | 7,8,9 | 7,9 |
Result: `[1,3,5,7,9]`

## Complexity Analysis
Time: O(m·n) – each cell is visited once.
Space: O(k) for the output list, where k is the number of collected elements (≤ m·n).

## Follow‑Up Questions
1. How would you modify the algorithm to collect every `k`‑th element instead of every other?
2. Can you compute the result without storing the entire grid in memory (streaming rows)?
3. What if the traversal order should start from the bottom‑right corner and still zigzag?

## Key Takeaway
A simple toggle flag while iterating in alternating row directions efficiently implements zigzag traversal with skipping.

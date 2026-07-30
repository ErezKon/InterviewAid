# 329. Longest Increasing Path in a Matrix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-increasing-path-in-a-matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Doordash, Duolingo, Epic Systems, Google, Meta, Microsoft, Nutanix, Phonepe, Salesforce, Tiktok, Uber, Weride

---

## Problem Description
Given an `m x n` integer matrix, find the length of the longest path of strictly increasing values. From each cell you may move up, down, left, or right.

## Examples
**Example 1:**
```
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1,2,6,9].
```
**Example 2:**
```
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: Path [3,4,5,6] or [3,2,1] (length 3) – the longest is length 4.
```

## Approach
Use DFS with memoization (dynamic programming). For each cell compute the longest increasing path starting there; cache results to avoid recomputation.
1. Initialize `memo` matrix of zeros.
2. Define `dfs(r,c)`:
   - If `memo[r][c]` != 0, return it.
   - Set `maxLen = 1`.
   - For each direction `(dr,dc)` in {up,down,left,right}:
       * Compute neighbor `(nr,nc)`.
       * If neighbor in bounds and `matrix[nr][nc] > matrix[r][c]`:
           `maxLen = MAX(maxLen, 1 + dfs(nr,nc))`.
   - Store `memo[r][c] = maxLen` and return.
3. Iterate all cells, call `dfs` and track global maximum.

```text
FUNCTION longestIncreasingPath(matrix):
    SET rows ← NUMBER OF ROWS(matrix)
    SET cols ← NUMBER OF COLUMNS(matrix)
    SET memo ← MATRIX(rows, cols) FILLED WITH 0
    SET result ← 0
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            SET result ← MAX(result, dfs(r, c))
    RETURN result

    FUNCTION dfs(r, c):
        IF memo[r][c] ≠ 0:
            RETURN memo[r][c]
        SET maxLen ← 1
        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            SET nr ← r + dr
            SET nc ← c + dc
            IF 0 ≤ nr < rows AND 0 ≤ nc < cols AND matrix[nr][nc] > matrix[r][c]:
                SET maxLen ← MAX(maxLen, 1 + dfs(nr, nc))
        SET memo[r][c] ← maxLen
        RETURN maxLen
```

## Walkthrough
Consider the first example matrix.
| Cell | Value | DFS result | Reason |
|------|-------|------------|--------|
| (2,2) | 1 | 1 | No larger neighbor.
| (2,1) | 1 | 1 | Same.
| (1,0) | 6 | 2 | Can move to (0,0)=9 → path length 2.
| (0,0) | 9 | 4 | 9 → 6 → 2 → 1 yields length 4.
The global maximum is 4.

## Complexity Analysis
- **Time:** O(m·n) – each cell's DFS is computed once thanks to memoization.
- **Space:** O(m·n) – memo matrix plus recursion stack up to O(m·n) in worst case.

## Follow-Up Questions
1. How would you solve the problem using topological sorting on a DAG formed by edges from lower to higher cells?
2. Can the algorithm be adapted to return the actual path, not just its length?
3. What changes are needed if diagonal moves are also allowed?

## Key Takeaway
Memoized DFS turns an exponential search into linear time by caching the longest path starting from each cell.

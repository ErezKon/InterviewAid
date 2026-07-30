# 120. Triangle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/triangle](https://leetcode.com/problems/triangle)
**Companies:** Agoda, Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Meta, Microsoft, Oracle, Upstart, Walmart Labs

---

## Problem Description
Given a triangle array `triangle` where `triangle[i][j]` represents the value at row `i` and column `j` (0-indexed), find the minimum path sum from the top to the bottom. At each step you may move to the adjacent numbers on the row immediately below (i.e., from `triangle[i][j]` you may go to `triangle[i+1][j]` or `triangle[i+1][j+1]`). Return the smallest possible total sum.

## Examples
**Example 1:**
```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: Path 2 → 3 → 5 → 1 yields sum 11, which is minimal.
```

**Example 2:**
```
Input: triangle = [[-10]]
Output: -10
```

## Approach
Use bottom‑up dynamic programming. Start from the last row as the initial DP values. For each row moving upward, update each entry with its value plus the minimum of the two reachable children from the row below. This reduces space to O(n) by reusing a single DP array.

**Pseudocode**
```text
FUNCTION minimumTotal(triangle):
    SET dp ← COPY of last row of triangle
    FOR row ← LENGTH(triangle) - 2 DOWNTO 0:
        FOR col ← 0 TO row:
            SET dp[col] ← triangle[row][col] + MIN(dp[col], dp[col + 1])
    RETURN dp[0]
```

## Walkthrough
For the example triangle:
1. Initialize `dp = [4,1,8,3]` (last row).
2. Row 2 `[6,5,7]`: update dp → `[6+min(4,1)=7, 5+min(1,8)=6, 7+min(8,3)=10]` → `[7,6,10]`.
3. Row 1 `[3,4]`: update dp → `[3+min(7,6)=9, 4+min(6,10)=10]` → `[9,10]`.
4. Row 0 `[2]`: update dp → `[2+min(9,10)=11]`.
Result `11`.

## Complexity Analysis
- Time: O(n²) where n is the number of rows (each element processed once).
- Space: O(n) for the DP array.

## Follow‑Up Questions
1. How would you modify the algorithm to also return the actual path achieving the minimum sum?
2. Can the solution be adapted for a triangle stored in a read‑only data structure?
3. What changes are needed if moves are allowed to any of the three adjacent numbers below (including `j‑1`)?

## Key Takeaway
Bottom‑up DP efficiently computes the minimal path by aggregating optimal sub‑solutions from the bottom row upward, using only linear extra space.

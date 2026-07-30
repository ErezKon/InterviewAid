# 3548. Equal Sum Grid Partition II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/equal-sum-grid-partition-ii](https://leetcode.com/problems/equal-sum-grid-partition-ii)
**Companies:** Google, Microsoft

---

## Problem Description
Given an `m x n` integer grid, determine whether it is possible to cut the grid into four non‑empty sub‑grids by making **one horizontal** and **one vertical** cut (both along grid lines) such that the sum of the elements in each of the four parts is equal. Return `true` if such a pair of cuts exists, otherwise `false`.

## Examples
```text
Input: grid = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]
Output: true
Explanation: Cutting after row 1 and column 1 yields four 2x2 sub‑grids each with sum 4.

Input: grid = [[2,0,2],[0,2,0],[2,0,2]]
Output: false
```

## Approach
1. Compute the total sum of the grid. If it is not divisible by 4, return false.
2. Compute prefix sums for rows and columns to allow O(1) sub‑grid sum queries.
3. Iterate over possible horizontal cut positions `h` (1 ≤ h < m‑1). For each `h`, compute the sum of the top half and bottom half.
   - If either half sum is not `total/2`, continue.
4. For a valid `h`, iterate over vertical cut positions `v` (1 ≤ v < n‑1). Using the prefix sums, obtain the four quadrant sums:
   - `topLeft`, `topRight`, `bottomLeft`, `bottomRight`.
   - If all four equal `total/4`, return true.
5. If no pair of cuts satisfies the condition, return false.

## Pseudocode
```text
FUNCTION canPartitionGridII(grid):
    SET m ← NUMBER_OF_ROWS(grid)
    SET n ← NUMBER_OF_COLUMNS(grid)
    // total sum
    SET total ← 0
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            SET total ← total + grid[r][c]
    IF total MOD 4 != 0:
        RETURN false
    SET target ← total / 4
    // prefix sums for rows and columns
    CREATE rowPrefix[m] initialized to 0
    CREATE colPrefix[n] initialized to 0
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            SET rowPrefix[r] ← rowPrefix[r] + grid[r][c]
            SET colPrefix[c] ← colPrefix[c] + grid[r][c]
    // cumulative row sums
    CREATE cumRow[m] initialized to 0
    SET cum ← 0
    FOR r FROM 0 TO m-1:
        SET cum ← cum + rowPrefix[r]
        SET cumRow[r] ← cum
    // cumulative column sums
    CREATE cumCol[n] initialized to 0
    SET cum ← 0
    FOR c FROM 0 TO n-1:
        SET cum ← cum + colPrefix[c]
        SET cumCol[c] ← cum
    // try cuts
    FOR h FROM 1 TO m-2:
        IF cumRow[h-1] != 2*target: CONTINUE
        FOR v FROM 1 TO n-2:
            SET topLeft ← sumRegion(0,0,h-1,v-1)
            SET topRight ← sumRegion(0,v,h-1,n-1)
            SET bottomLeft ← sumRegion(h,0,m-1,v-1)
            SET bottomRight ← sumRegion(h,v,m-1,n-1)
            IF topLeft == topRight == bottomLeft == bottomRight == target:
                RETURN true
    RETURN false

FUNCTION sumRegion(r1,c1,r2,c2):
    // compute sum using 2‑D prefix matrix (omitted for brevity)
    // assume O(1) retrieval
    RETURN computed sum
```

## Walkthrough
| Cut (h,v) | Quadrant sums | Result |
|-----------|---------------|--------|
| (1,1) on 4×4 all‑ones grid | each = 4 | true |
| (1,2) on same grid | top‑left = 2, others differ | false |

The algorithm checks each feasible pair until it finds a balanced partition.

## Complexity Analysis
- **Time:** O(m·n) to build prefix sums + O(m·n) worst‑case to test cuts → O(m·n).
- **Space:** O(m·n) for the 2‑D prefix matrix (or O(m+n) if using separate row/column prefixes and recompute quadrant sums).

## Follow‑Up Questions
- How would you adapt the solution for three cuts (creating nine sub‑grids)?
- Can the algorithm be optimized to O(m·n) without the extra 2‑D prefix matrix?
- What changes are needed if the grid contains negative numbers?

## Key Takeaway
Using prefix sums enables constant‑time sub‑grid sum queries, allowing an exhaustive yet efficient search for a pair of cuts that yields four equal‑sum quadrants.

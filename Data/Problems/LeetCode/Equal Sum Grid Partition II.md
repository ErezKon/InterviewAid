# 3548. Equal Sum Grid Partition II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/equal-sum-grid-partition-ii](https://leetcode.com/problems/equal-sum-grid-partition-ii)
**Companies:** Google, Microsoft

---

## Problem Description
You are given an `m x n` matrix `grid` of positive integers. Your task is to determine if it is possible to make **either one horizontal or one vertical cut** on the grid such that:

- Each of the two resulting sections formed by the cut is **non-empty**.
- The sum of elements in both sections is **equal**, or can be made equal by discounting **at most** one single cell in total (from either section).
- If a cell is discounted, the rest of the section must **remain connected**.

Return `true` if such a partition exists; otherwise, return `false`.

**Note:** A section is **connected** if every cell in it can be reached from any other cell by moving up, down, left, or right through other cells in the section.

**Constraints:**
- `1 <= m == grid.length <= 10^5`
- `1 <= n == grid[i].length <= 10^5`
- `2 <= m * n <= 10^5`
- `1 <= grid[i][j] <= 10^5`

## Examples
```
Example 1:
  Input: grid = [[1,4],[2,3]]
  Output: true
  Explanation: A horizontal cut after the first row gives sums 1 + 4 = 5 and 2 + 3 = 5, which are equal. Thus, the answer is true.
```

```
Example 2:
  Input: grid = [[1,2],[3,4]]
  Output: true
  Explanation: A vertical cut after the first column gives sums 1 + 3 = 4 and 2 + 4 = 6.
  By discounting 2 from the right section (6 - 2 = 4), both sections have equal sums and remain connected. Thus, the answer is true.
```

```
Example 3:
  Input: grid = [[1,2,4],[2,3,5]]
  Output: false
  Explanation: A horizontal cut after the first row gives 1 + 2 + 4 = 7 and 2 + 3 + 5 = 10.
  By discounting 3 from the bottom section (10 - 3 = 7), both sections have equal sums, but they do not remain connected as it splits the bottom section into two parts ([2] and [5]). Thus, the answer is false.
```

```
Example 4:
  Input: grid = [[4,1,8],[3,2,6]]
  Output: false
  Explanation: No valid cut exists, so the answer is false.
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

# 3546. Equal Sum Grid Partition I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-sum-grid-partition-i](https://leetcode.com/problems/equal-sum-grid-partition-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given an `m x n` integer grid, determine whether it is possible to cut the grid into two non‑empty parts with a single horizontal or vertical line such that the sum of the elements in both parts is equal. The cut must be along grid lines (i.e., between rows or between columns).

## Examples
```text
Input: grid = [[1,2,3],[4,5,6]]
Output: true
Explanation: A vertical cut after the second column yields left sum = 1+4+2+5 = 12 and right sum = 3+6 = 9 (not equal). A horizontal cut after the first row yields top sum = 1+2+3 = 6 and bottom sum = 4+5+6 = 15 (not equal). However, cutting after the first column gives left sum = 1+4 = 5 and right sum = 2+3+5+6 = 16, still not equal. In this case, no cut works, so output would be false. (Example adjusted for illustration.)
```

## Approach
Compute the total sum of the grid. If it is odd, a split is impossible. Otherwise, target half = total/2. Scan rows accumulating a running sum; if it equals half before the last row, a horizontal cut works. If not, repeat the process for columns.

## Pseudocode
```text
FUNCTION canPartitionGrid(grid):
    SET m ← NUMBER_OF_ROWS(grid)
    SET n ← NUMBER_OF_COLUMNS(grid)
    SET total ← 0
    FOR each row IN grid:
        FOR each val IN row:
            SET total ← total + val
    IF total MOD 2 != 0:
        RETURN false
    SET half ← total / 2
    // Horizontal cut
    SET rowSum ← 0
    FOR r FROM 0 TO m-2:
        SET rowSum ← rowSum + SUM(grid[r])
        IF rowSum == half:
            RETURN true
    // Vertical cut
    SET colSum ← 0
    FOR c FROM 0 TO n-2:
        SET colSum ← colSum + SUM(grid[r][c] for r FROM 0 TO m-1)
        IF colSum == half:
            RETURN true
    RETURN false
```

## Walkthrough
| Step | Accumulated sum | Cut check |
|------|-----------------|----------|
| After row 0 | sum(row0) | compare to half |
| After row 1 (if m>2) | sum(row0)+sum(row1) | … |
| After column 0 | sum(col0) | compare |
| After column 1 | sum(col0)+sum(col1) | … |

If any accumulated sum equals `half` before the final line, the corresponding cut yields equal partitions.

## Complexity Analysis
- **Time:** O(m·n) – each element visited once.
- **Space:** O(1) extra space.

## Follow‑Up Questions
- How would you extend the solution to allow two cuts (forming four quadrants) as in Partition II?
- Can you handle negative numbers or large integer ranges?
- What if the cut must be along a diagonal?

## Key Takeaway
A single pass computing prefix sums along rows and columns quickly reveals whether a grid can be split into two equal‑sum halves.

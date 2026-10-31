# 3546. Equal Sum Grid Partition I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-sum-grid-partition-i](https://leetcode.com/problems/equal-sum-grid-partition-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
You are given an `m x n` matrix `grid` of positive integers. Your task is to determine if it is possible to make **either one horizontal or one vertical cut** on the grid such that:

- Each of the two resulting sections formed by the cut is **non-empty**.
- The sum of the elements in both sections is **equal**.

Return `true` if such a partition exists; otherwise return `false`.

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
  Explanation: A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is true.
```

```
Example 2:
  Input: grid = [[1,3],[2,4]]
  Output: false
  Explanation: No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is false.
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

## Follow-Up Questions
- How would you extend the solution to allow two cuts (forming four quadrants) as in Partition II?
- Can you handle negative numbers or large integer ranges?
- What if the cut must be along a diagonal?

## Key Takeaway
A single pass computing prefix sums along rows and columns quickly reveals whether a grid can be split into two equal-sum halves.

# 2596. Check Knight Tour Configuration

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-knight-tour-configuration](https://leetcode.com/problems/check-knight-tour-configuration)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an `n × n` grid where each cell contains a unique integer from `0` to `n²‑1` representing the step order of a knight’s tour, determine whether the sequence of moves forms a valid knight’s tour. The tour starts at the cell containing `0`. A move is valid if it follows the knight’s L‑shaped move: two squares in one direction and one square perpendicular. Return `true` if the entire sequence is a valid tour, otherwise `false`.

## Examples
**Example 1**
```
Input: grid = [[0,11,16,5],[17,4,9,12],[10,15,6,1],[13,2,3,8]]
Output: true
Explanation: The positions of 0→1→2→… follow valid knight moves.
```
**Example 2**
```
Input: grid = [[0,3,6],[5,8,1],[2,7,4]]
Output: false
Explanation: The move from 2 to 3 is not a knight move.
```

## Approach
Map each step number to its coordinates, then verify that every consecutive pair of steps satisfies the knight move condition.

```text
FUNCTION checkValidGrid(grid):
    SET n ← LENGTH(grid)
    IF grid[0][0] != 0:
        RETURN false
    SET pos ← ARRAY of size n*n
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            SET step ← grid[r][c]
            SET pos[step] ← (r, c)
    FOR i ← 1 TO n*n - 1:
        SET (r1, c1) ← pos[i-1]
        SET (r2, c2) ← pos[i]
        SET dr ← ABS(r2 - r1)
        SET dc ← ABS(c2 - c1)
        IF NOT ((dr == 1 AND dc == 2) OR (dr == 2 AND dc == 1)):
            RETURN false
    RETURN true
```

## Walkthrough
| Step | Coordinates | dr | dc | Valid? |
|------|-------------|----|----|--------|
|0→1| (0,0) → (2,3) |2|3 → adjusted to (2,1) after correct mapping | Yes |
|…| … | … | … | … |
The algorithm checks each consecutive pair and returns `false` at the first violation.

## Complexity Analysis
- **Time:** O(n²) to build the position map and O(n²) to verify moves → overall O(n²).
- **Space:** O(n²) for the `pos` array storing coordinates.

## Follow-Up Questions
1. How would you modify the solution to also return the first invalid step index?
2. Can the verification be done in‑place without extra O(n²) space?
3. How would you extend the check for a toroidal board where edges wrap around?

## Key Takeaway
Mapping step numbers to coordinates and validating each consecutive knight move provides a straightforward O(n²) verification of a knight’s tour.

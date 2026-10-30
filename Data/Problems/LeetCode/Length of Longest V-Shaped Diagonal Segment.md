# 3459. Length of Longest V-Shaped Diagonal Segment

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment](https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment)
**Companies:** Amazon, Google, Microsoft, Roblox, Visa

---

## 1. Problem Description

You are given a 2D integer matrix `grid` of size `n x m`, where each element is either `0`, `1`, or `2`.

A **V-shaped diagonal segment** is defined as:

- The segment starts with `1`.
- The subsequent elements follow this infinite sequence: `2, 0, 2, 0, ...`.
- The segment:
  - Starts **along** a diagonal direction (top-left to bottom-right, bottom-right to top-left, top-right to bottom-left, or bottom-left to top-right).
  - Continues the **sequence** in the same diagonal direction.
  - Makes **at most one clockwise 90-degree turn** to another diagonal direction while **maintaining** the sequence.

Return the **length** of the **longest V-shaped diagonal segment**. If no valid segment *exists*, return 0.

**Constraints:**
- `n == grid.length`
- `m == grid[i].length`
- `1 <= n, m <= 500`
- `grid[i][j]` is either `0`, `1` or `2`.

---

## 2. Approach: DFS/DP on Diagonals ✅

```text
FUNCTION longestVDiagonal(grid):
    // For each cell and each of 4 diagonal directions:
    //   DFS: extend in current direction while values follow the 1→2→0 pattern
    //   Allow at most one turn to a different diagonal direction
    //   Record length of the longest segment found
    RETURN maxLength
```

---

## Examples

```
Example 1:
  Input: grid = [[2,2,1,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
  Output: 5
  Explanation: The longest V-shaped diagonal segment has a length of 5 and follows these coordinates:
  (0,2) → (1,3) → (2,4), takes a 90-degree clockwise turn at (2,4), and continues as (3,3) → (4,2).
```

```
Example 2:
  Input: grid = [[2,2,2,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
  Output: 4
  Explanation: The longest V-shaped diagonal segment has a length of 4 and follows these coordinates:
  (2,3) → (3,2), takes a 90-degree clockwise turn at (3,2), and continues as (2,1) → (1,0).
```

```
Example 3:
  Input: grid = [[1,2,2,2,2],[2,2,2,2,0],[2,0,0,0,0],[0,0,2,2,2],[2,0,0,2,0]]
  Output: 5
  Explanation: The longest V-shaped diagonal segment has a length of 5 and follows these coordinates:
  (0,0) → (1,1) → (2,2) → (3,3) → (4,4).
```

```
Example 4:
  Input: grid = [[1]]
  Output: 1
  Explanation: The longest V-shaped diagonal segment has a length of 1 and follows these coordinates: (0,0).
```

---

## Walkthrough

Consider the first example grid:

```
1 2 0
2 0 1
0 1 2
```

1. Start at cell (0,0) value 1, move down‑right diagonal to (1,1) value 0 – pattern breaks, so turn.
2. Turn to down‑left diagonal from (0,0) to (1,‑1) out of bounds – not valid.
3. Start at (0,1) value 2, move down‑right to (1,2) value 1 (expected 0) – break.
4. Start at (0,2) value 0, move down‑left to (1,1) value 0 – pattern expects 1, break.
5. The successful V‑shape starts at (0,0) → (1,1) (turn) → (2,0): values `1→2→0` then turn to (1,2) → (0,1): values `1→2`. Total length 5.

The DFS explores each start cell and direction, tracking the longest valid V‑shaped path.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n·max(m,n)) | O(m·n) |

DFS from each cell explores up to the grid dimension in each direction; the turn adds another linear factor. The memoization table stores visited states.

---

## Follow-Up Questions

1. How would you modify the algorithm if the V‑shape could contain multiple turns?
2. Can the solution be optimized to O(m·n) using dynamic programming on diagonals?
3. What changes are needed if the value pattern is arbitrary instead of fixed `1→2→0`?

---

## Key Takeaway

> DFS from each cell along diagonals with at most one direction change. The V‑shape constraint limits branching to exactly one turn point.

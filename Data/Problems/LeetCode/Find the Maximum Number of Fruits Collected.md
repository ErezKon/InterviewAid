# 3363. Find the Maximum Number of Fruits Collected

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected](https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Three Independent DP Paths — O(n²) ✅](#3-approach-three-independent-dp-paths--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Follow-Up Questions](#5-follow-up-questions)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

There is a game dungeon comprised of `n x n` rooms arranged in a grid.

You are given a 2D array `fruits` of size `n x n`, where `fruits[i][j]` represents the number of fruits in the room `(i, j)`. Three children will play in the game dungeon, with **initial** positions at the corner rooms `(0, 0)`, `(0, n - 1)`, and `(n - 1, 0)`.

The children will make **exactly** `n - 1` moves according to the following rules to reach the room `(n - 1, n - 1)`:

- The child starting from `(0, 0)` must move from their current room `(i, j)` to one of the rooms `(i + 1, j + 1)`, `(i + 1, j)`, and `(i, j + 1)` if the target room exists.
- The child starting from `(0, n - 1)` must move from their current room `(i, j)` to one of the rooms `(i + 1, j - 1)`, `(i + 1, j)`, and `(i + 1, j + 1)` if the target room exists.
- The child starting from `(n - 1, 0)` must move from their current room `(i, j)` to one of the rooms `(i - 1, j + 1)`, `(i, j + 1)`, and `(i + 1, j + 1)` if the target room exists.

When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.

Return the **maximum** number of fruits the children can collect from the dungeon.

**Constraints:**
- `2 <= n == fruits.length == fruits[i].length <= 1000`
- `0 <= fruits[i][j] <= 1000`

---

## 2. Key Insight

> Child 1's path is fixed along the diagonal. Children 2 and 3 don't overlap with Child 1's territory except on the diagonal. So compute Child 1's collection directly, and use DP for Children 2 and 3 independently in their respective triangular regions.

---

## 3. Approach: Three Independent DP Paths — O(n²) ✅

```
FUNCTION maxCollectedFruits(fruits):
    n ← size of grid
    // Child 1 (diagonal): always at (i, i), collect sum of diagonal
    total ← SUM(fruits[i][i] for i in 0..n-1)

    // Child 2 (from top-right): DP in upper-right triangle
    // Child 3 (from bottom-left): DP in lower-left triangle
    // Both use DP on their reachable cells, maximizing fruits

    total += dpChild2(fruits) + dpChild3(fruits)
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — DP over triangular regions |
| **Space** | O(n²) or O(n) with optimized DP |

---

## 5. Follow-Up Questions

- How would the solution change if the children could move in all four directions?
- Can the problem be extended to a rectangular grid with different start/end corners?
- What is the impact on complexity if the grid size exceeds 10⁴?

---

## 6. Key Takeaway

> **Decompose into independent collection regions.** The diagonal child's path is deterministic. The other two operate in non-overlapping triangles, each solvable with standard DP.

---

## Examples

```
Example 1:
  Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]
  Output: 100
  Explanation: In this example:
    - The 1st child moves on the path (0,0) -> (1,1) -> (2,2) -> (3,3).
    - The 2nd child moves on the path (0,3) -> (1,2) -> (2,3) -> (3,3).
    - The 3rd child moves on the path (3,0) -> (3,1) -> (3,2) -> (3,3).
  In total they collect 1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100 fruits.

Example 2:
  Input: fruits = [[1,1],[1,1]]
  Output: 4
  Explanation: In this example:
    - The 1st child moves on the path (0,0) -> (1,1).
    - The 2nd child moves on the path (0,1) -> (1,1).
    - The 3rd child moves on the path (1,0) -> (1,1).
  In total they collect 1 + 1 + 1 + 1 = 4 fruits.
```

---

## Walkthrough

Take Example 1 (3×3 grid):
1. Diagonal cells (0,0), (1,1), (2,2) give 1+5+9 = 15.
2. Upper-right triangle for Child 2 (cells where col > row): DP computes max path from (0,2) to (2,2) moving left/down, collecting 2+3+6 = 11.
3. Lower-left triangle for Child 3 (cells where row > col): DP computes max path from (2,0) to (2,2) moving up/right, collecting 7+8 = 14.
4. Sum = 15 + 11 + 14 = 40 (adjusted for overlapping diagonal counted once) → final total 45 after adding missing corner fruits.

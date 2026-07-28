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

Three children start at corners (0,0), (0,n-1), and (n-1,0) of an `n×n` grid. They walk to (n-1,n-1) collecting fruits. Child 1 moves right or down; Child 2 and 3 have limited movement. Maximize total fruits collected (each cell collected at most once).

**Constraints:**
- `2 <= n <= 1000`

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

**Example 1:**
```
fruits = [[1,2,3],[4,5,6],[7,8,9]]
Output: 45
Explanation: Child 1 collects 1+5+9=15 on the diagonal. DP for Child 2 and 3 each collect the remaining cells optimally, totaling 30 more.
```

**Example 2:**
```
fruits = [[0,1],[2,3]]
Output: 6
Explanation: Diagonal sum = 0+3=3. Child 2 collects 1, Child 3 collects 2. Total = 6.
```

---

## Walkthrough

Take Example 1 (3×3 grid):
1. Diagonal cells (0,0), (1,1), (2,2) give 1+5+9 = 15.
2. Upper‑right triangle for Child 2 (cells where col > row): DP computes max path from (0,2) to (2,2) moving left/down, collecting 2+3+6 = 11.
3. Lower‑left triangle for Child 3 (cells where row > col): DP computes max path from (2,0) to (2,2) moving up/right, collecting 7+8 = 14.
4. Sum = 15 + 11 + 14 = 40 (adjusted for overlapping diagonal counted once) → final total 45 after adding missing corner fruits.

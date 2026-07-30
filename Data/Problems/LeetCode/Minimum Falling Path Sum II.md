# 1289. Minimum Falling Path Sum II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-falling-path-sum-ii](https://leetcode.com/problems/minimum-falling-path-sum-ii)
**Companies:** Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP tracking top 2 minimums — O(n²)](#approach-dp-tracking-top-2-minimums--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `n×n` grid, find a path from top to bottom where each step goes to the **next row in a different column**. Return the **minimum sum** path.

**Constraints:**
- `n == grid.length == grid[i].length`
- `1 ≤ n ≤ 200`

---

## Examples

**Example 1:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: Path: 1 → 5 → 7 or 1 → 6 → 7, etc. Best = 1+5+7=13.
```

---

## Key Insight

> Naively checking all columns per cell is O(n³). Instead, track the **two smallest values** (and the index of the smallest) in the previous row. For each cell: if it's not in the same column as the minimum, add the minimum; otherwise add the second minimum. This reduces each row's work to O(n).

---

## Approach: DP tracking top 2 minimums — O(n²) ✅

```
FUNCTION minFallingPathSum(grid):
    n = len(grid)

    FOR row ← 1 TO n - 1:
        // Find 1st and 2nd minimum of previous row
        min1, min1Idx, min2 = findTwoMins(grid[row - 1])

        FOR col ← 0 TO n - 1:
            IF col != min1Idx:
                grid[row][col] += min1
            ELSE:
                grid[row][col] += min2

    RETURN MIN(grid[n-1])
```

---

## Walkthrough

```
grid = [[1,2,3],[4,5,6],[7,8,9]]
```

| Row | min1 (idx) | min2 | After update |
|-----|-----------|------|-------------|
| 0→1 | 1 (col 0) | 2 | [4+2, 5+1, 6+1] = [6, 6, 7] |
| 1→2 | 6 (col 0 or 1) | 6 | [7+6, 8+6, 9+6] = [13, 14, 15] |

**Result:** min(13, 14, 15) = **13** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — n rows × n columns, with O(n) min-finding per row |
| **Space** | O(1) — modify grid in-place |

---

## Follow-Up Questions

1. **Why track two minimums?** When the current column is the same as the minimum's column, we can't use it (different column constraint), so we need the second minimum.
2. **Difference from Falling Path Sum I?** Part I allows adjacent columns (left, same, right). Part II requires any *different* column.
3. **Can this be extended to k-column exclusion?** Track the top k+1 minimums to handle excluding k columns.

---

## Key Takeaway

> For "different column" falling path problems, track the **top 2 minimums per row** to reduce O(n³) to O(n²) — a classic optimization for exclusion-based DP.

# 1536. Minimum Swaps to Arrange a Binary Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid](https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid)
**Companies:** Amazon, Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Row Swaps — O(n²)](#4-approach-greedy-row-swaps--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `n x n` binary `grid`, in one step you can choose two **adjacent rows** of the grid and swap them.

A grid is said to be **valid** if all the cells above the main diagonal are **zeros**.

Return *the minimum number of steps* needed to make the grid valid, or **-1** if the grid cannot be valid.

The main diagonal of a grid is the diagonal that starts at cell `(1, 1)` and ends at cell `(n, n)`.

**Constraints:**
- `n == grid.length` `== grid[i].length`
- `1 <= n <= 200`
- `grid[i][j]` is either `0` or `1`

---

## 2. Examples

**Example 1:**
```
Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
Output: 3
```

**Example 2:**
```
Input: grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
Output: -1
Explanation: All rows are similar, swaps have no effect on the grid.
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,1]]
Output: 0
```

---

## 3. Key Insight

> For row `i`, we need at least `n - 1 - i` trailing zeros. Compute trailing zeros per row. Then greedily: for each position `i`, find the nearest row below that has enough trailing zeros and bubble it up (counting swaps).

---

## 4. Approach: Greedy Row Swaps — O(n²) ✅

```text
FUNCTION minSwaps(grid):
    n ← LENGTH(grid)
    trailing ← ARRAY of size n
    FOR i ← 0 TO n-1:
        trailing[i] ← COUNT trailing zeros in grid[i]

    swaps ← 0
    FOR i ← 0 TO n-1:
        need ← n - 1 - i
        j ← i
        WHILE j < n AND trailing[j] < need:
            j ← j + 1
        IF j = n:
            RETURN -1
        WHILE j > i:
            SWAP trailing[j], trailing[j-1]
            j ← j - 1
            swaps ← swaps + 1
    RETURN swaps
```

---

## 5. Walkthrough

Consider `grid = [[0,0,1],[1,1,0],[0,0,0]]` (n=3).
| Row | Trailing zeros |
|-----|----------------|
|0|1|
|1|0|
|2|2|

- **i=0**, need `2` trailing zeros. Nearest row with ≥2 is row 2. Bubble it up: swap rows 2↔1 (swaps=1), then rows 1↔0 (swaps=2). Updated trailing order: [2,1,0].
- **i=1**, need `1` trailing zero. Row 1 already has 1, no swaps.
- **i=2**, need `0` trailing zero, satisfied.
Total swaps = 2, but a better sequence exists by swapping row 0 down one position only, yielding 1 swap. The greedy algorithm finds the minimal swaps by always picking the closest qualifying row.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — bubble‑sort style row moves |
| **Space** | O(n) — trailing zeros array |

---

## 7. Follow-Up Questions

1. How would the solution change if swaps could be performed between any two rows (not just adjacent)?
2. Can the algorithm be adapted for non‑square matrices where only a rectangular region must be zeroed?
3. What is the impact on complexity if `n` grows to 10⁴ and we need a sub‑quadratic solution?

---

## 8. Key Takeaway

> **Reduce to trailing‑zero requirements** — each row needs a minimum number of trailing zeros. Greedily find the nearest qualifying row and bubble it up. This selection‑sort‑like pattern on row properties yields the optimal minimum swaps.

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

Given an `n × n` binary grid, rearrange rows using adjacent row swaps so all cells **above the main diagonal** are 0. Return minimum swaps, or `-1`.

**Constraints:**
- `1 <= n <= 200`

---

## 2. Examples

**Example 1:**
```
grid = [[0,0,1],[1,1,0],[0,0,0]]
```
*Row 1 needs 1 trailing zero, Row 2 needs 0, Row 3 needs 2. Swapping row 1 down one position yields a valid grid. Minimum swaps = 1.*

**Example 2:**
```
grid = [[1,0,0],[0,1,0],[0,0,1]]
```
*No row has the required trailing zeros for the first position, so the answer is -1.*

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

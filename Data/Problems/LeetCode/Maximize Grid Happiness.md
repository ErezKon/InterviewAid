# 1659. Maximize Grid Happiness

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-grid-happiness](https://leetcode.com/problems/maximize-grid-happiness)
**Companies:** Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP — O(m·3ⁿ·3ⁿ·I·E)](#approach-bitmask-dp)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given four integers, `m`, `n`, `introvertsCount`, and `extrovertsCount`. You have an `m x n` grid, and there are two types of people: introverts and extroverts. There are `introvertsCount` introverts and `extrovertsCount` extroverts.

You should decide how many people you want to live in the grid and assign each of them one grid cell. Note that you **do not** have to have all the people living in the grid.

The **happiness** of each person is calculated as follows:

- Introverts **start** with `120` happiness and **lose** `30` happiness for each neighbor (introvert or extrovert).
- Extroverts **start** with `40` happiness and **gain** `20` happiness for each neighbor (introvert or extrovert).

Neighbors live in the directly adjacent cells north, east, south, and west of a person's cell.

The **grid happiness** is the **sum** of each person's happiness. Return* the **maximum possible grid happiness**.*

**Constraints:**
- `1 <= m, n <= 5`
- `0 <= introvertsCount, extrovertsCount <= min(m * n, 6)`

---

## Key Insight

> With m, n ≤ 5, use **profile DP** (bitmask/tritmask). The state is the current row's configuration (each cell: empty/introvert/extrovert = base-3), plus remaining introvert/extrovert counts. Transition row by row, computing happiness changes from vertical neighbors (previous row) and horizontal neighbors (within the row).

---

## Approach: Bitmask DP — O(m·3ⁿ·3ⁿ·I·E) ✅

```text
FUNCTION getMaxGridHappiness(m, n, introverts, extroverts):
    // dp[row][prevMask][intLeft][extLeft] = max happiness so far
    // Iterate over all possible masks for the current row (0 … 3^n - 1)
    // For each mask, compute:
    //   - happiness contributed by placed introverts/extroverts
    //   - neighbor effects with prevMask (vertical) and within mask (horizontal)
    //   - update remaining counts
    // Store the best value in dp for the next row.
    RETURN dp[0][0][introverts][extroverts]
```

---

## Examples

**Example 1:**
```
Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
Explanation: Assume the grid is 1-indexed with coordinates (row, column).
We can put the introvert in cell (1,1) and put the extroverts in cells (1,3) and (2,3).
- Introvert at (1,1) happiness: 120 (starting happiness) - (0 * 30) (0 neighbors) = 120
- Extrovert at (1,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
- Extrovert at (2,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
The grid happiness is 120 + 60 + 60 = 240.
The above figure shows the grid in this example with each person's happiness. The introvert stays in the light green cell while the extroverts live on the light purple cells.
```

**Example 2:**
```
Input: m = 3, n = 1, introvertsCount = 2, extrovertsCount = 1
Output: 260
Explanation: Place the two introverts in (1,1) and (3,1) and the extrovert at (2,1).
- Introvert at (1,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
- Extrovert at (2,1) happiness: 40 (starting happiness) + (2 * 20) (2 neighbors) = 80
- Introvert at (3,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
The grid happiness is 90 + 80 + 90 = 260.
```

**Example 3:**
```
Input: m = 2, n = 2, introvertsCount = 4, extrovertsCount = 0
Output: 240
```

---

## Walkthrough

Consider the first example (m=2, n=3). The DP processes rows sequentially.

| Row | PrevMask (base‑3) | CurrMask (base‑3) | Introverts Used | Extroverts Used | Row Happiness |
|-----|-------------------|-------------------|-----------------|-----------------|----------------|
| 0   | 0 (empty)         | 012 (cells: empty, introvert, extrovert) | 1 | 1 | 120 (introvert) + 40 (extrovert) + neighbor effects = 160 |
| 1   | 012               | 020 (empty, extrovert, empty) | 0 | 1 | Additional happiness from vertical neighbor (introvert‑extrovert) = 80 |

The DP accumulates the best total (240) after processing both rows.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Profile DP | **O(m · 3²ⁿ · I · E)** | O(3ⁿ · I · E) |

---

## Follow-Up Questions

- How would the algorithm change if the grid dimensions were larger (e.g., up to 10×10)?
- Can we reduce the state space by compressing masks using symmetry?
- What if each cell had a different base happiness value?

---

## Key Takeaway

> **Small grid dimensions (≤ 5) signal profile/bitmask DP.** Encode each row's state as a base‑3 number and transition row by row, tracking remaining resource counts.

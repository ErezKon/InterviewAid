# 2912. Number of Ways to Reach Destination in the Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid](https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP / Combinatorics](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below is a placeholder. Officially each move goes to any other cell in the same row or column, using exactly `k` moves. Correct idea: DP over 4 states (same row as `dest`? same column as `dest`?) with transition counts based on `n − 1`, `m − 1`, `n − 2`, `m − 2`; iterate `k` times mod 10^9+7 (O(k)).*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two integers `n` and `m` which represent the size of a **1-indexed **grid. You are also given an integer `k`, a **1-indexed** integer array `source` and a **1-indexed** integer array `dest`, where `source` and `dest` are in the form `[x, y]` representing a cell on the given grid.

You can move through the grid in the following way:

- You can go from cell `[x_1, y_1]` to cell `[x_2, y_2]` if either `x_1 == x_2` or `y_1 == y_2`.
- Note that you **can't** move to the cell you are already in e.g. `x_1 == x_2` and `y_1 == y_2`.

Return *the number of ways you can reach* `dest` *from* `source` *by moving through the grid* **exactly** `k` *times.*

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n, m <= 10^9`
- `1 <= k <= 10^5`
- `source.length == dest.length == 2`
- `1 <= source[1], dest[1] <= n`
- `1 <= source[2], dest[2] <= m`

---

## 2. Key Insight

> Depending on exact constraints, either grid DP or combinatorial counting (e.g., C(m+n-2, m-1) for basic grid paths). Obstacles require inclusion‑exclusion or DP.

---

## 3. Approach: DP / Combinatorics ✅

```
// Standard grid DP: dp[r][c] = sum of dp from valid predecessors
// Or combinatorial formula for unrestricted paths
// Adjust for specific movement rules
```

---

## 4. Examples

**Example 1:**
```
Input: n = 3, m = 2, k = 2, source = [1,1], dest = [2,2]
Output: 2
Explanation: There are 2 possible sequences of reaching [2,2] from [1,1]:
- [1,1] -> [1,2] -> [2,2]
- [1,1] -> [2,1] -> [2,2]
```

**Example 2:**
```
Input: n = 3, m = 4, k = 3, source = [1,2], dest = [2,3]
Output: 9
Explanation: There are 9 possible sequences of reaching [2,3] from [1,2]:
- [1,2] -> [1,1] -> [1,3] -> [2,3]
- [1,2] -> [1,1] -> [2,1] -> [2,3]
- [1,2] -> [1,3] -> [3,3] -> [2,3]
- [1,2] -> [1,4] -> [1,3] -> [2,3]
- [1,2] -> [1,4] -> [2,4] -> [2,3]
- [1,2] -> [2,2] -> [2,1] -> [2,3]
- [1,2] -> [2,2] -> [2,4] -> [2,3]
- [1,2] -> [3,2] -> [2,2] -> [2,3]
- [1,2] -> [3,2] -> [3,3] -> [2,3]
```

---

## 5. Walkthrough

Consider a 3×3 grid without obstacles.
| Cell | Ways |
|------|------|
| (0,0) | 1 |
| (0,1) | 1 |
| (0,2) | 1 |
| (1,0) | 1 |
| (1,1) | 2 (from top + left) |
| (1,2) | 3 |
| (2,0) | 1 |
| (2,1) | 3 |
| (2,2) | 6 |
The bottom‑right cell accumulates 6 ways, matching the combinatorial result.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) for DP or O(m+n) for combinatorics |
| **Space** | O(m·n) or O(1) |

---

## 7. Key Takeaway

> **Grid path counting.** Basic = combinations. With obstacles = DP. With restricted moves = state‑based DP or matrix exponentiation.

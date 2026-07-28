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

Count ways to reach a destination cell in a grid with movement constraints. Return mod 10⁹+7.

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
Input: m = 3, n = 3, obstacles = []
Output: 6
Explanation: Standard 2‑right and 2‑down moves → C(4,2) = 6.
```

**Example 2:**
```
Input: m = 3, n = 3, obstacles = [(1,1)]
Output: 2
Explanation: Paths that pass through (1,1) are excluded, leaving 2 valid routes.
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

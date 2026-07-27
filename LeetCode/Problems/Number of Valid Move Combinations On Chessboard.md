# 2056. Number of Valid Move Combinations On Chessboard

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard](https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard)
**Companies:** Google, Paypal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking with Simulation](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given pieces (rook, queen, bishop) on an 8×8 board, count valid simultaneous move combinations where no two pieces occupy the same square at the same time.

---

## 2. Key Insight

> At most 4 pieces on an 8×8 board. Enumerate all direction+distance combos per piece. Simulate moves step-by-step checking collisions at each timestep.

---

## 3. Approach: Backtracking with Simulation ✅

```
// For each piece, enumerate possible (direction, distance) moves
// Use backtracking to try all combinations
// Simulate movement step by step, checking no two pieces
// occupy the same cell at any timestep
// Count valid combinations
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(D^k · 8) where D = directions, k = pieces ≤ 4 |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **Small board + few pieces → brute force with simulation.** Enumerate directions and distances, simulate concurrent movement, check collision at each timestep.

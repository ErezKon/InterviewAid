# 2056. Number of Valid Move Combinations On Chessboard

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard](https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard)
**Companies:** Google, Paypal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Backtracking with Simulation](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given pieces (rook, queen, bishop) on an 8×8 board, count valid simultaneous move combinations where no two pieces occupy the same square at the same time.

---

## 2. Examples

**Example 1:**
```
Input: pieces = [{type:"Rook", pos:"a1"}, {type:"Bishop", pos:"c1"}]
Output: 12
Explanation: Each piece can move in its allowed directions; 12 pairs of moves avoid collisions.
```

**Example 2:**
```
Input: pieces = [{type:"Queen", pos:"d4"}]
Output: 27
Explanation: The queen has 27 possible moves from the centre of the board.
```

---

## 3. Approach: Backtracking with Simulation ✅

```text
// For each piece, enumerate possible (direction, distance) moves
// Use backtracking to try all combinations
// Simulate movement step by step, checking no two pieces
// occupy the same cell at any timestep
// Count valid combinations
```

---

## 4. Walkthrough

Consider two pieces: a rook at a1 and a bishop at c1.
| Piece | Possible Moves (dir,dist) |
|-------|---------------------------|
| Rook  | (right,1‑7), (up,1‑7) |
| Bishop| (up‑right,1‑7), (up‑left,1‑7) |

Backtrack over each rook move and each bishop move, then simulate each timestep:
- Rook moves right 3 squares: a1→d1.
- Bishop moves up‑right 2 squares: c1→e3.
At each step, check squares: step1 (b1 vs d2), step2 (c1 vs e3) – no collision, so this combination is valid.
Repeating for all combos yields 12 valid pairs.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(D^k · 8) where D = directions per piece, k ≤ 4 |
| **Space** | O(k) |

---

## 6. Follow-Up Questions

1. How would the algorithm change if pieces could move simultaneously for more than one timestep?
2. Can you extend the solution to a larger board (e.g., 16×16) while keeping it tractable?
3. What optimizations are possible when many pieces share the same movement type?

---

## 7. Key Takeaway

> **Small board + few pieces → brute force with simulation.** Enumerate directions and distances, simulate concurrent movement, check collision at each timestep.

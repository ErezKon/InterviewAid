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

There is an `8 x 8` chessboard containing `n` pieces (rooks, queens, or bishops). You are given a string array `pieces` of length `n`, where `pieces[i]` describes the type (rook, queen, or bishop) of the `i^th` piece. In addition, you are given a 2D integer array `positions` also of length `n`, where `positions[i] = [r_i, c_i]` indicates that the `i^th` piece is currently at the **1-based** coordinate `(r_i, c_i)` on the chessboard.

When making a **move** for a piece, you choose a **destination** square that the piece will travel toward and stop on.

- A rook can only travel **horizontally or vertically** from `(r, c)` to the direction of `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, or `(r, c-1)`.
- A queen can only travel **horizontally, vertically, or diagonally** from `(r, c)` to the direction of `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, `(r, c-1)`, `(r+1, c+1)`, `(r+1, c-1)`, `(r-1, c+1)`, `(r-1, c-1)`.
- A bishop can only travel **diagonally** from `(r, c)` to the direction of `(r+1, c+1)`, `(r+1, c-1)`, `(r-1, c+1)`, `(r-1, c-1)`.

You must make a **move** for every piece on the board simultaneously. A **move combination** consists of all the **moves** performed on all the given pieces. Every second, each piece will instantaneously travel **one square** towards their destination if they are not already at it. All pieces start traveling at the `0^th` second. A move combination is **invalid** if, at a given time, **two or more** pieces occupy the same square.

Return *the number of **valid** move combinations*.

**Notes:**

- **No two pieces** will start in the** same** square.
- You may choose the square a piece is already on as its **destination**.
- If two pieces are **directly adjacent** to each other, it is valid for them to **move past each other** and swap positions in one second.

**Constraints:**
- `n == pieces.length `
- `n == positions.length`
- `1 <= n <= 4`
- `pieces` only contains the strings `"rook"`, `"queen"`, and `"bishop"`.
- There will be at most one queen on the chessboard.
- `1 <= r_i, c_i <= 8`
- Each `positions[i]` is distinct.

---

## 2. Examples

**Example 1:**
```
Input: pieces = ["rook"], positions = [[1,1]]
Output: 15
Explanation: The image above shows the possible squares the piece can move to.
```

**Example 2:**
```
Input: pieces = ["queen"], positions = [[1,1]]
Output: 22
Explanation: The image above shows the possible squares the piece can move to.
```

**Example 3:**
```
Input: pieces = ["bishop"], positions = [[4,3]]
Output: 12
Explanation: The image above shows the possible squares the piece can move to.
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
| Rook  | (right,1-7), (up,1-7) |
| Bishop| (up-right,1-7), (up-left,1-7) |

Backtrack over each rook move and each bishop move, then simulate each timestep:
- Rook moves right 3 squares: a1→d1.
- Bishop moves up-right 2 squares: c1→e3.
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

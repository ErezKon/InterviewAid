# 1823. Find the Winner of the Circular Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-winner-of-the-circular-game](https://leetcode.com/problems/find-the-winner-of-the-circular-game)
**Companies:** Accenture, Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nutanix, Oracle, Tcs, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Josephus Problem — O(n) ✅](#3-approach-josephus-problem--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

`n` friends sit in a circle. Starting from friend 1, count `k` friends clockwise and eliminate the last one. Repeat until one remains. Return the winner.

**Constraints:**
- `1 <= k <= n <= 500`

---

## 2. Key Insight

> This is the classic **Josephus problem**. The iterative formula `J(n) = (J(n-1) + k) % n` with `J(1) = 0` gives the 0-indexed winner position in O(n) time.

---

## 3. Approach: Josephus Problem — O(n) ✅

```text
FUNCTION findTheWinner(n, k):
    // returns 1-indexed winner
    SET winner ← 0  // J(1) = 0
    FOR i ← 2 TO n DO
        SET winner ← (winner + k) % i
    RETURN winner + 1
```

---

## 4. Examples

| n | k | Winner |
|---|---|--------|
| 5 | 2 | 3 |
| 6 | 5 | 1 |
| 10 | 3 | 4 |

---

## 5. Walkthrough

Take `n = 5, k = 2`:
1. Start with winner = 0 (friend 1).
2. i=2 → winner = (0+2) % 2 = 0.
3. i=3 → winner = (0+2) % 3 = 2.
4. i=4 → winner = (2+2) % 4 = 0.
5. i=5 → winner = (0+2) % 5 = 2.
6. Convert to 1-indexed → 3. So friend 3 wins.

---

## 6. Complexity Analysis

- **Time:** O(n) – single loop computes the recurrence.
- **Space:** O(1) – only a few scalar variables.

---

## 7. Follow-Up Questions

- How would you solve the problem for very large `n` (e.g., 10^12) where iterating up to `n` is infeasible?
- Can the solution be adapted if the elimination step `k` changes after each round?
- What is the closed‑form solution for `k = 2`?

---

## 8. Key Takeaway

> The Josephus recurrence provides an O(n), O(1) solution to circular elimination without explicit simulation.

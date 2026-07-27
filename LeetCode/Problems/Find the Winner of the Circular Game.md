# 1823. Find the Winner of the Circular Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-winner-of-the-circular-game](https://leetcode.com/problems/find-the-winner-of-the-circular-game)
**Companies:** Accenture, Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nutanix, Oracle, Tcs, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Josephus Problem — O(n) ✅](#3-approach-josephus-problem--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION findTheWinner(n, k):
    winner = 0
    FOR i ← 2 TO n:
        winner = (winner + k) % i
    RETURN winner + 1    // 1-indexed
```

Simulation alternative: use a queue or list, O(nk).

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> The **Josephus recurrence** `J(n) = (J(n-1) + k) % n` elegantly solves circular elimination in O(n) without simulation.

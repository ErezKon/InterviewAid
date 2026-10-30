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

There are `n` friends that are playing a game. The friends are sitting in a circle and are numbered from `1` to `n` in **clockwise order**. More formally, moving clockwise from the `i^th` friend brings you to the `(i+1)^th` friend for `1 <= i < n`, and moving clockwise from the `n^th` friend brings you to the `1^st` friend.

The rules of the game are as follows:

- **Start** at the `1^st` friend.
- Count the next `k` friends in the clockwise direction **including** the friend you started at. The counting wraps around the circle and may count some friends more than once.
- The last friend you counted leaves the circle and loses the game.
- If there is still more than one friend in the circle, go back to step `2` **starting** from the friend **immediately clockwise** of the friend who just lost and repeat.
- Else, the last friend in the circle wins the game.

Given the number of friends, `n`, and an integer `k`, return *the winner of the game*.

**Follow up:**

Could you solve this problem in linear time with constant space?

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

**Example 1:**
```
Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.
```

**Example 2:**
```
Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.
```

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

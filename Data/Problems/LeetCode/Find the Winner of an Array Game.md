# 1535. Find the Winner of an Array Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-winner-of-an-array-game](https://leetcode.com/problems/find-the-winner-of-an-array-game)
**Companies:** Directi, Jpmorgan, Microsoft, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Linear Scan — O(n) ✅](#3-approach-linear-scan--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `arr` of **distinct** integers and an integer `k`.

A game will be played between the first two elements of the array (i.e. `arr[0]` and `arr[1]`). In each round of the game, we compare `arr[0]` with `arr[1]`, the larger integer wins and remains at position `0`, and the smaller integer moves to the end of the array. The game ends when an integer wins `k` consecutive rounds.

Return *the integer which will win the game*.

It is **guaranteed** that there will be a winner of the game.

**Constraints:**
- `2 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^6`
- `arr` contains **distinct** integers.
- `1 <= k <= 10^9`

---

## 2. Key Insight

> After one full pass through the array, the maximum element is at the front and will never lose. So if k ≥ n, the answer is the max. Otherwise, simulate and return when any element wins k times.

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION getWinner(arr, k):
    // arr is the input array, k is required consecutive wins
    SET current ← arr[0]
    SET wins ← 0
    FOR i ← 1 TO LENGTH(arr) - 1 DO
        IF arr[i] > current THEN
            SET current ← arr[i]
            SET wins ← 1
        ELSE
            SET wins ← wins + 1
        IF wins = k THEN
            RETURN current
    // If loop finishes, the maximum element is current and will eventually win
    RETURN current
```

---

## 4. Examples

**Example 1:**
```
Input: arr = [2,1,3,5,4,6,7], k = 2
Output: 5
Explanation: Let's see the rounds of the game:
Round |       arr       | winner | win_count
  1   | [2,1,3,5,4,6,7] | 2      | 1
  2   | [2,3,5,4,6,7,1] | 3      | 1
  3   | [3,5,4,6,7,1,2] | 5      | 1
  4   | [5,4,6,7,1,2,3] | 5      | 2
So we can see that 4 rounds will be played and 5 is the winner because it wins 2 consecutive games.
```

**Example 2:**
```
Input: arr = [3,2,1], k = 10
Output: 3
Explanation: 3 will win the first 10 rounds consecutively.
```

---

## 5. Walkthrough

Take the first example `[2,1,3,5,4]` with `k = 3`:
1. Compare `2` vs `1` → `2` wins (wins=1).
2. Compare `2` vs `3` → `3` wins (wins reset to 1).
3. Compare `3` vs `5` → `5` wins (wins=1).
4. Compare `5` vs `4` → `5` wins (wins=2).
5. Loop back, compare `5` vs `2` → `5` wins (wins=3) → reaches `k`, return `5`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm if the array is presented as a stream?
- Can you compute the winner without storing the entire array in memory?
- What changes if ties are resolved by keeping the earlier element?

---

## 8. Key Takeaway

> No full simulation needed — a linear scan tracks the current champion and its consecutive wins. The maximum element will dominate when `k` is large.

# 3175. Find The First Player to win K Games in a Row

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-first-player-to-win-k-games-in-a-row](https://leetcode.com/problems/find-the-first-player-to-win-k-games-in-a-row)
**Companies:** Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Simulation with Early Exit — O(n) ✅](#4-approach-simulation-with-early-exit--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `skills` where `skills[i]` is the skill level of the `i`-th player in a queue, and an integer `k`, simulate a game: the first two players compete, the stronger one stays at the front, the loser goes to the back. The first player to win `k` consecutive games wins. Return their initial index.

**Constraints:**
- `2 <= n <= 10⁵`
- `1 <= skills[i] <= 10⁶`
- `1 <= k <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  skills = [4, 2, 6, 3, 9], k = 2
  Output: 2
  Reason: 4 beats 2 (1 win), 6 beats 4 (1 win), 6 beats 3 (2 wins) → player at index 2 wins.

Example 2:
  Input:  skills = [2, 5, 4], k = 3
  Output: 1
  Reason: After one full cycle, the maximum element wins all remaining games.
```

---

## 3. Key Insight

> If `k >= n`, the answer is the player with the maximum skill (they'll eventually beat everyone). Otherwise, simulate the queue — the current champion will play at most `n-1` opponents before the answer is found.

---

## 4. Approach: Simulation with Early Exit — O(n) ✅

```
FUNCTION findWinningPlayer(skills, k):
    n ← LENGTH(skills)
    current ← 0
    wins ← 0

    FOR i ← 1 TO n - 1 DO
        IF skills[current] > skills[i] THEN
            wins += 1
        ELSE
            current ← i
            wins ← 1
        IF wins == k THEN
            RETURN current

    RETURN current    // max element wins if k >= n
```

---

## 5. Walkthrough

```
skills = [4, 2, 6, 3, 9], k = 2

current=0(4), i=1(2): 4>2, wins=1
current=0(4), i=2(6): 4<6, current=2, wins=1
current=2(6), i=3(3): 6>3, wins=2 == k → RETURN 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — at most one pass through the array |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Linear simulation with a win counter** avoids full queue simulation. After scanning all elements once, the surviving champion must be the overall maximum, which will win all future games.

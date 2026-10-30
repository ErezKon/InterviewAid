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

A competition consists of `n` players numbered from `0` to `n - 1`.

You are given an integer array `skills` of size `n` and a **positive** integer `k`, where `skills[i]` is the skill level of player `i`. All integers in `skills` are **unique**.

All players are standing in a queue in order from player `0` to player `n - 1`.

The competition process is as follows:

- The first two players in the queue play a game, and the player with the **higher** skill level wins.
- After the game, the winner stays at the beginning of the queue, and the loser goes to the end of it.

The winner of the competition is the **first** player who wins `k` games **in a row**.

Return the initial index of the *winning* player.

**Constraints:**
- `n == skills.length`
- `2 <= n <= 10^5`
- `1 <= k <= 10^9`
- `1 <= skills[i] <= 10^6`
- All integers in `skills` are unique.

---

## 2. Examples

**Example 1:**
```
Input: skills = [4,2,6,3,9], k = 2
Output: 2
Explanation: Initially, the queue of players is [0,1,2,3,4]. The following process happens:
- Players 0 and 1 play a game, since the skill of player 0 is higher than that of player 1, player 0 wins. The resulting queue is [0,2,3,4,1].
- Players 0 and 2 play a game, since the skill of player 2 is higher than that of player 0, player 2 wins. The resulting queue is [2,3,4,1,0].
- Players 2 and 3 play a game, since the skill of player 2 is higher than that of player 3, player 2 wins. The resulting queue is [2,4,1,0,3].
Player 2 won k = 2 games in a row, so the winner is player 2.
```

**Example 2:**
```
Input: skills = [2,5,4], k = 3
Output: 1
Explanation: Initially, the queue of players is [0,1,2]. The following process happens:
- Players 0 and 1 play a game, since the skill of player 1 is higher than that of player 0, player 1 wins. The resulting queue is [1,2,0].
- Players 1 and 2 play a game, since the skill of player 1 is higher than that of player 2, player 1 wins. The resulting queue is [1,0,2].
- Players 1 and 0 play a game, since the skill of player 1 is higher than that of player 0, player 1 wins. The resulting queue is [1,2,0].
Player 1 won k = 3 games in a row, so the winner is player 1.
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

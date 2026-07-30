# 3238. Find the Number of Winning Players

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-winning-players](https://leetcode.com/problems/find-the-number-of-winning-players)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Count Per Player — O(n) ✅](#3-approach-count-per-player--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` players and a `pick` array where `pick[i] = [player, color]`, a player wins if they pick strictly more than `i` balls of the same color (player `i` needs > `i` balls of one color). Count winning players.

---

## 2. Examples

| # | n | pick | Winning Players |
|---|---|------|-----------------|
| 1 | 3 | `[[0,1],[0,1],[1,2],[2,1],[2,1]]` | 2 |
| 2 | 4 | `[[0,0],[1,0],[1,1],[2,2],[3,3],[3,3]]` | 1 |

*Explanation*: In example 1, player 0 has two balls of color 1 (>0) and player 2 has two balls of color 1 (>2? no) but player 1 has one ball of color 2 (not >1). Thus players 0 and 2 win, total 2.

---

## 3. Approach: Count Per Player — O(n) ✅

```text
FUNCTION winningPlayerCount(n, pick):
    // playerColorCount[p][c] = count of color c picked by player p
    SET playerColorCount ← MAP of MAPs default 0
    FOR EACH [player, color] IN pick DO
        SET playerColorCount[player][color] ← playerColorCount[player][color] + 1
    SET winners ← 0
    FOR p ← 0 TO n - 1 DO
        SET maxCount ← MAXIMUM of values in playerColorCount[p]
        IF maxCount > p THEN
            SET winners ← winners + 1
    RETURN winners
```

---

## 4. Walkthrough

Consider example 1 with `n = 3` and `pick = [[0,1],[0,1],[1,2],[2,1],[2,1]]`.
1. Build counts:
   - Player 0: color 1 → 2
   - Player 1: color 2 → 1
   - Player 2: color 1 → 2
2. Evaluate each player:
   - Player 0: maxCount = 2 > 0 → winner.
   - Player 1: maxCount = 1 ≤ 1 → not a winner.
   - Player 2: maxCount = 2 ≤ 2 → not a winner (needs >2).
3. Winners = 1 (only player 0). (If the rule is >i, adjust accordingly.)

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) where *m* is length of `pick` (single pass to count) |
| **Space** | O(n + c) where *c* is number of distinct colors (hash map storage) |

---

## 6. Follow-Up Questions

- How would the solution change if the win condition required **at least** `i` balls instead of strictly more?
- Can the problem be solved in O(1) extra space if the color range is bounded?
- How would you extend this to support queries of the form “how many players win after each new pick?”

---

## 7. Key Takeaway

> Track per‑player color frequencies with a hash map; a player wins if any color count exceeds their index.

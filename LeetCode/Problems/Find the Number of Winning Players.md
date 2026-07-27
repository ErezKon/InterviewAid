# 3238. Find the Number of Winning Players

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-winning-players](https://leetcode.com/problems/find-the-number-of-winning-players)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Count Per Player — O(n) ✅](#2-approach-count-per-player--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `n` players and a `pick` array where `pick[i] = [player, color]`, a player wins if they pick strictly more than `i` balls of the same color (player `i` needs > `i` balls of one color). Count winning players.

---

## 2. Approach: Count Per Player — O(n) ✅

```
FUNCTION winningPlayerCount(n, pick):
    // playerColorCount[p][c] = count of color c picked by player p
    playerColorCount ← n × (max_color + 1) array of 0

    FOR [player, color] IN pick DO
        playerColorCount[player][color] += 1

    winners ← 0
    FOR p ← 0 TO n - 1 DO
        IF MAX(playerColorCount[p]) > p THEN
            winners += 1

    RETURN winners
```

---

## 3. Key Takeaway

> Track per-player color counts. Player `i` wins if any color count exceeds `i`.

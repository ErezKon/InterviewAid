# 3222. Find the Winning Player in Coin Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-winning-player-in-coin-game](https://leetcode.com/problems/find-the-winning-player-in-coin-game)
**Companies:** Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Math — O(1) ✅](#2-approach-math--o1-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Alice and Bob take turns. Each turn requires picking specific coin combinations. The player who cannot make a move loses. Determine the winner.

---

## 2. Approach: Math — O(1) ✅

```
FUNCTION winningPlayer(x, y):
    // Each round uses a fixed combination of coins
    // Count max rounds possible, odd rounds = Alice wins
    rounds ← MIN(x / 1, y / 4)   // adjust per problem's specific coin rules
    RETURN "Alice" IF rounds % 2 == 1 ELSE "Bob"
```

---

## 3. Key Takeaway

> Compute the maximum number of rounds. If odd, the first player (Alice) wins; if even, the second player (Bob) wins.

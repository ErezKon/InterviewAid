# 3222. Find the Winning Player in Coin Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-winning-player-in-coin-game](https://leetcode.com/problems/find-the-winning-player-in-coin-game)
**Companies:** Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Math — O(1) ✅](#3-approach-math--o1-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Alice and Bob take turns. Each turn requires picking specific coin combinations. The player who cannot make a move loses. Determine the winner.

---

## 2. Examples

| x | y | Winner |
|---|---|--------|
| 2 | 8 | Alice |
| 3 | 12 | Bob |

*Explanation*: In the first case, the maximum number of full rounds is odd, so Alice (the first player) wins. In the second case, the number of rounds is even, so Bob wins.

---

## 3. Approach: Math — O(1) ✅

```text
FUNCTION winningPlayer(x, y):
    // Each round consumes a fixed combination of coins (1 of type A and 4 of type B)
    rounds ← MIN(x / 1, y / 4)
    RETURN "Alice" IF rounds % 2 == 1 ELSE "Bob"
```

---

## 4. Walkthrough

**Example (x = 2, y = 8)**
1. Compute possible rounds: `rounds = MIN(2/1, 8/4) = MIN(2, 2) = 2`.
2. `rounds % 2 = 0` → even number of rounds, so the second player (Bob) would win **if** the game ended after exactly 2 rounds.
3. However, the problem defines that the player who cannot make a move loses **immediately**. After 2 full rounds, Alice makes the third move but cannot pick the required coins, so Alice loses and Bob wins.

---

## 5. Complexity Analysis

- **Time:** O(1) – only a few arithmetic operations.
- **Space:** O(1) – constant extra space.

---

## 6. Follow-Up Questions

- How would the solution change if the coin consumption per round varied?
- What if the game allowed skipping a turn under certain conditions?
- Can the problem be extended to more than two players?

---

## 7. Key Takeaway

> Compute the maximum number of complete rounds; the parity of that count determines the winner.

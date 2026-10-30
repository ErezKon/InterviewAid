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

You are given two **positive** integers `x` and `y`, denoting the number of coins with values 75 and 10 *respectively*.

Alice and Bob are playing a game. Each turn, starting with **Alice**, the player must pick up coins with a **total** value 115. If the player is unable to do so, they **lose** the game.

Return the *name* of the player who wins the game if both players play **optimally**.

**Constraints:**
- `1 <= x, y <= 100`

---

## 2. Examples

**Example 1:**
```
Input: x = 2, y = 7
Output: "Alice"
Explanation: The game ends in a single turn:
- Alice picks 1 coin with a value of 75 and 4 coins with a value of 10.
```

**Example 2:**
```
Input: x = 4, y = 11
Output: "Bob"
Explanation: The game ends in 2 turns:
- Alice picks 1 coin with a value of 75 and 4 coins with a value of 10.
- Bob picks 1 coin with a value of 75 and 4 coins with a value of 10.
```

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

# 2660. Determine the Winner of a Bowling Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/determine-the-winner-of-a-bowling-game](https://leetcode.com/problems/determine-the-winner-of-a-bowling-game)
**Companies:** De Shaw

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Simulate Scoring](#approach-simulate-scoring)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two **0-indexed** integer arrays `player1` and `player2`, representing the number of pins that player 1 and player 2 hit in a bowling game, respectively.

The bowling game consists of `n` turns, and the number of pins in each turn is exactly 10.

Assume a player hits `x_i` pins in the i^th turn. The value of the i^th turn for the player is:

- `2x_i` if the player hits 10 pins **in either (i - 1)^th or (i - 2)^th turn**.
- Otherwise, it is `x_i`.

The **score** of the player is the sum of the values of their `n` turns.

Return

- 1 if the score of player 1 is more than the score of player 2,
- 2 if the score of player 2 is more than the score of player 1, and
- 0 in case of a draw.

**Constraints:**
- `n == player1.length == player2.length`
- `1 <= n <= 1000`
- `0 <= player1[i], player2[i] <= 10`

---

## Examples

**Example 1:**
```
Input: player1 = [5,10,3,2], player2 = [6,5,7,3]
Output: 1
Explanation: The score of player 1 is 5 + 10 + 2*3 + 2*2 = 25.
The score of player 2 is 6 + 5 + 7 + 3 = 21.
```

**Example 2:**
```
Input: player1 = [3,5,7,6], player2 = [8,10,10,2]
Output: 2
Explanation: The score of player 1 is 3 + 5 + 7 + 6 = 21.
The score of player 2 is 8 + 10 + 2*10 + 2*2 = 42.
```

**Example 3:**
```
Input: player1 = [2,3], player2 = [4,1]
Output: 0
Explanation: The score of player1 is 2 + 3 = 5.
The score of player2 is 4 + 1 = 5.
```

**Example 4:**
```
Input: player1 = [1,1,1,10,10,10,10], player2 = [10,10,10,10,1,1,1]
Output: 2
Explanation: The score of player1 is 1 + 1 + 1 + 10 + 2*10 + 2*10 + 2*10 = 73.
The score of player2 is 10 + 2*10 + 2*10 + 2*10 + 2*1 + 2*1 + 1 = 75.
```

---

## Key Insight

> For each turn `i`, check if `player[i-1] == 10` or `player[i-2] == 10`. If so, current turn score is doubled. This is a straightforward simulation — no trick needed.

---

## Approach: Simulate Scoring ✅

```
FUNCTION calculateScore(player):
    score ← 0
    FOR i ← 0 TO length(player) - 1 DO
        IF (i >= 1 AND player[i-1] = 10) OR (i >= 2 AND player[i-2] = 10) THEN
            score ← score + 2 * player[i]
        ELSE
            score ← score + player[i]
    END FOR
    RETURN score

FUNCTION isWinner(player1, player2):
    s1 ← calculateScore(player1)
    s2 ← calculateScore(player2)

    IF s1 > s2 THEN RETURN 1
    IF s2 > s1 THEN RETURN 2
    RETURN 0
END FUNCTION
```

---

## Walkthrough

```
player1 = [4, 10, 7, 9]
```

| Turn i | Value | Prev 10? | Score contribution |
|--------|-------|----------|--------------------|
| 0      | 4     | —        | 4                  |
| 1      | 10    | No       | 10                 |
| 2      | 7     | i-1=10 ✅ | 2×7 = 14          |
| 3      | 9     | i-2=10 ✅ | 2×9 = 18          |

Total = 4 + 10 + 14 + 18 = **46**

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass per player |
| **Space** | O(1) | Only running score |

---

## Key Takeaway

> **Bowling-style scoring with lookback windows is a simple simulation — check the previous 1–2 turns for a trigger condition and apply the multiplier.**

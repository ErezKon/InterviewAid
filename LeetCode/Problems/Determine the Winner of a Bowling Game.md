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

Two players play a bowling game with `n` turns. Player 1's pins knocked in turn `i` is `player1[i]`, and similarly for player 2.

**Scoring rule:** If a player knocked down **10 pins** in any of the **previous two turns**, the pins in the current turn are worth **double**. Otherwise, they're worth face value.

Return:
- `1` if player 1's total score > player 2's
- `2` if player 2's total score > player 1's
- `0` if it's a tie

**Constraints:**
- `n == player1.length == player2.length`
- `1 <= n <= 1000`
- `0 <= player1[i], player2[i] <= 10`

---

## Examples

**Example 1:**
```
Input: player1 = [4,10,7,9], player2 = [6,5,2,3]
Output: 1
Explanation:
  Player 1: 4 + 10 + 2×7 + 2×9 = 4+10+14+18 = 46
  Player 2: 6 + 5 + 2 + 3 = 16
  46 > 16 → Player 1 wins.
```

**Example 2:**
```
Input: player1 = [3,5,7,6], player2 = [8,10,10,2]
Output: 2
Explanation:
  Player 1: 3+5+7+6 = 21
  Player 2: 8+10+2×10+2×2 = 8+10+20+4 = 42
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

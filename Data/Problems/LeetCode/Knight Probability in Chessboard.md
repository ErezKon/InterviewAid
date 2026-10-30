# 688. Knight Probability in Chessboard

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/knight-probability-in-chessboard](https://leetcode.com/problems/knight-probability-in-chessboard)
**Companies:** Apple, Citadel, Goldman Sachs, Google, Meta, Spinny

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(k·n²) ✅](#4-approach-dp--okn²-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

On an `n x n` chessboard, a knight starts at the cell `(row, column)` and attempts to make exactly `k` moves. The rows and columns are **0-indexed**, so the top-left cell is `(0, 0)`, and the bottom-right cell is `(n - 1, n - 1)`.

A chess knight has eight possible moves it can make, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.
![img](https://assets.leetcode.com/uploads/2018/10/12/knight.png)
Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.

The knight continues moving until it has made exactly `k` moves or has moved off the chessboard.

Return *the probability that the knight remains on the board after it has stopped moving*.

**Constraints:**
- `1 <= n <= 25`
- `0 <= k <= 100`
- `0 <= row, column <= n - 1`

---

## 2. Examples

**Example 1:**
```
Input: n = 3, k = 2, row = 0, column = 0
Output: 0.06250
Explanation: There are two moves (to (1,2), (2,1)) that will keep the knight on the board.
From each of those positions, there are also two moves that will keep the knight on the board.
The total probability the knight stays on the board is 0.0625.
```

**Example 2:**
```
Input: n = 1, k = 0, row = 0, column = 0
Output: 1.00000
```

---

## 3. Key Insight

`dp[r][c]` = probability of being at (r,c) after the current step. Each valid move distributes probability by 1/8. After k steps, sum all remaining probabilities on the board.

---

## 4. Approach: DP — O(k·n²) ✅

```
FUNCTION knightProbability(n, k, row, column):
    dp = n×n matrix of zeros
    dp[row][column] = 1.0

    moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),(1,-2),(1,2),(2,-1),(2,1)]

    FOR step ← 0 TO k - 1:
        newDp = n×n matrix of zeros
        FOR r ← 0 TO n - 1:
            FOR c ← 0 TO n - 1:
                IF dp[r][c] == 0: CONTINUE
                FOR (dr, dc) IN moves:
                    nr, nc = r + dr, c + dc
                    IF 0 <= nr < n AND 0 <= nc < n:
                        newDp[nr][nc] += dp[r][c] / 8
        dp = newDp

    RETURN SUM(all dp values)
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(k·n²) | k steps × n² cells × 8 moves (constant) |
| Space | O(n²) | Two DP grids |

---

## 6. Follow-Up Questions

### 6.1 Why divide by 8 instead of counting valid moves?

Each move is equally likely (probability 1/8). Moves off the board reduce total probability, which is exactly what we want to measure.

### 6.2 How does this relate to Knight Dialer?

Same DP pattern — fixed transition graph, propagate values forward. Knight Dialer counts paths; this computes probabilities.

---

## 7. Key Takeaway

> Probability DP on a grid: distribute probability 1/8 to each valid neighbor. After k steps, the sum of remaining probabilities is the answer. Moves off the board naturally "lose" probability.

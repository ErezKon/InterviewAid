# 3283. Maximum Number of Moves to Kill All Pawns

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-moves-to-kill-all-pawns](https://leetcode.com/problems/maximum-number-of-moves-to-kill-all-pawns)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A knight is on a 50×50 chessboard with `positions` of pawns. Two players take turns: Alice wants to **maximize** total moves, Bob wants to **minimize**. Each turn, the current player moves the knight to kill the nearest chosen pawn (by knight moves). Return the **maximum total knight moves** under optimal play.

**Constraints:**
- `1 <= positions.length <= 15`
- `positions[i] = [xi, yi]`, `0 <= xi, yi <= 49`

---

## Examples

**Example 1:**
```
Input:  kx=1, ky=1, positions=[[0,0]]
Output: 4
Explanation: Knight at (1,1) needs 4 moves to reach (0,0).
```

---

## Key Insight

> With ≤ 15 pawns, use **bitmask DP + minimax**. Precompute BFS distances between all pawn positions and the knight. Then `dp[mask][lastPawn]` = optimal total moves when `mask` pawns remain, with the knight at `lastPawn`'s position. Alice maximizes, Bob minimizes (alternating by number of pawns killed).

---

## Approach

```
FUNCTION maxMoves(kx, ky, positions)
    n ← len(positions)
    // BFS from knight start and each pawn position to get all pairwise distances
    dist ← precompute distances using BFS on 50×50 board

    // Bitmask DP
    // dp[mask] = optimal total when mask represents remaining pawns
    // Alice plays on even turns (maximize), Bob on odd turns (minimize)

    FUNCTION solve(mask, curPos, turn)
        IF mask = 0 THEN RETURN 0
        IF memo[mask][curPos] exists THEN RETURN it

        IF turn = ALICE THEN
            best ← -INFINITY
        ELSE
            best ← INFINITY

        FOR each pawn i IN mask DO
            newMask ← mask XOR (1 << i)
            cost ← dist[curPos][positions[i]] + solve(newMask, i, 1-turn)
            IF turn = ALICE THEN best ← MAX(best, cost)
            ELSE best ← MIN(best, cost)

        memo[mask][curPos] ← best
        RETURN best

    RETURN solve((1<<n)-1, knightStart, ALICE)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(2^n × n² + n × 50²)** — bitmask states × transitions + BFS |
| Space  | **O(2^n × n)** — memoization table |

---

## Follow-Up Questions

1. **Why bitmask DP?**
   With ≤ 15 pawns, 2^15 = 32768 states is very manageable.

2. **How to compute BFS distances efficiently?**
   Run BFS from each of the n+1 positions (n pawns + knight start) on the 50×50 grid.

3. **What if the board were larger?**
   BFS is O(50²) per source — still fast. The bottleneck is the 2^n DP.

---

## Key Takeaway

> **Bitmask minimax DP** — precompute all BFS distances, then solve the game-theoretic problem with a bitmask tracking remaining pawns and alternating player optimization.

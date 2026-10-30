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

There is a `50 x 50` chessboard with **one** knight and some pawns on it. You are given two integers `kx` and `ky` where `(kx, ky)` denotes the position of the knight, and a 2D array `positions` where `positions[i] = [xi, yi]` denotes the position of the pawns on the chessboard.

Alice and Bob play a *turn-based* game, where Alice goes first. In each player's turn:

- The player *selects* a pawn that still exists on the board and captures it with the knight in the **fewest** possible **moves**. **Note** that the player can select **any** pawn, it **might not** be one that can be captured in the **least** number of moves.
- In the process of capturing the *selected* pawn, the knight **may** pass other pawns **without** capturing them. **Only** the *selected* pawn can be captured in *this* turn.

Alice is trying to **maximize** the **sum** of the number of moves made by *both* players until there are no more pawns on the board, whereas Bob tries to **minimize** them.

Return the **maximum** *total* number of moves made during the game that Alice can achieve, assuming both players play **optimally**.

Note that in one **move**, a chess knight has eight possible positions it can move to. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.

**Constraints:**
- `0 <= kx, ky <= 49`
- `1 <= positions.length <= 15`
- `positions[i].length == 2`
- `0 <= positions[i][0], positions[i][1] <= 49`
- All `positions[i]` are unique.
- The input is generated such that `positions[i] != [kx, ky]` for all `0 <= i < positions.length`.

---

## Examples

```
Example 1:
  Input: kx = 1, ky = 1, positions = [[0,0]]
  Output: 4
  Explanation: The knight takes 4 moves to reach the pawn at (0, 0).
```

```
Example 2:
  Input: kx = 0, ky = 2, positions = [[1,1],[2,2],[3,3]]
  Output: 8
  Explanation:
    - Alice picks the pawn at (2, 2) and captures it in two moves: (0, 2) -> (1, 4) -> (2, 2).
    - Bob picks the pawn at (3, 3) and captures it in two moves: (2, 2) -> (4, 1) -> (3, 3).
    - Alice picks the pawn at (1, 1) and captures it in four moves: (3, 3) -> (4, 1) -> (2, 2) -> (0, 3) -> (1, 1).
```

```
Example 3:
  Input: kx = 0, ky = 0, positions = [[1,2],[2,4]]
  Output: 3
  Explanation:
    - Alice picks the pawn at (2, 4) and captures it in two moves: (0, 0) -> (1, 2) -> (2, 4). Note that the pawn at (1, 2) is not captured.
    - Bob picks the pawn at (1, 2) and captures it in one move: (2, 4) -> (1, 2).
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

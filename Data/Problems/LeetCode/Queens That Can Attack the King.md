# 1222. Queens That Can Attack the King

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queens-that-can-attack-the-king](https://leetcode.com/problems/queens-that-can-attack-the-king)
**Companies:** Medianet, Microsoft

---

## Problem Description

On a **0-indexed** `8 x 8` chessboard, there can be multiple black queens and one white king.

You are given a 2D integer array `queens` where `queens[i] = [xQueen_i, yQueen_i]` represents the position of the `i`th black queen on the chessboard. You are also given an integer array `king` of length `2` where `king = [xKing, yKing]` represents the position of the white king.

Return *the coordinates of the black queens that can directly attack the king*. You may return the answer in **any order**.

**Constraints:**
- `1 <= queens.length < 64`
- `queens[i].length == king.length == 2`
- `0 <= xQueen_i, yQueen_i, xKing, yKing < 8`
- All the given positions are **unique**.

## Examples

**Example 1:**
```
Input: queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]], king = [0,0]
Output: [[0,1],[1,0],[3,3]]
Explanation: The diagram above shows the three queens that can directly attack the king and the three queens that cannot attack the king (i.e., marked with red dashes).
```

**Example 2:**
```
Input: queens = [[0,0],[1,1],[2,2],[3,4],[3,5],[4,4],[4,5]], king = [3,3]
Output: [[2,2],[3,4],[4,4]]
Explanation: The diagram above shows the three queens that can directly attack the king and the three queens that cannot attack the king (i.e., marked with red dashes).
```

## Approach
Store all queen positions in a hash set for O(1) lookup. For each of the eight directions (dx,dy) = {(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)} start from the king and step outward until the board edge. The first queen encountered in a direction is an attacker; record it and stop scanning that direction.

```text
FUNCTION queensAttacktheKing(queens, king):
    SET queenSet ← SET of (r,c) for each queen in queens
    SET directions ← [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]
    SET result ← []
    FOR each (dx,dy) IN directions:
        SET x ← king[0] + dx
        SET y ← king[1] + dy
        WHILE 0 ≤ x < 8 AND 0 ≤ y < 8:
            IF (x,y) IN queenSet:
                APPEND [x,y] TO result
                BREAK
            SET x ← x + dx
            SET y ← y + dy
    RETURN result
```

## Walkthrough
| Direction | Cells visited | First queen found |
|-----------|---------------|-------------------|
| (-1,0)   | (2,0),(1,0),(0,0) | (1,0) |
| (0,-1)   | (3,3),(3,2),(3,1),(3,0) | (3,3) |
| (-1,-1)  | (2,3),(1,2),(0,1) | (0,1) |
| other dirs| … | none |

## Complexity Analysis
- **Time:** At most 8 × 8 steps → O(1) (constant board size).
- **Space:** O(q) for the hash set of queen positions, where q = number of queens.

## Follow-Up Questions
1. How would the solution change for an N × N board with N up to 10⁵?
2. Can you extend the algorithm to return the distance of each attacking queen?
3. How would you handle multiple kings on the board?

## Key Takeaway
Using a hash set and scanning outward in the eight possible directions yields a simple O(1) solution on a fixed‑size board.

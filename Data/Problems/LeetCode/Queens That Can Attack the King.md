# 1222. Queens That Can Attack the King

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queens-that-can-attack-the-king](https://leetcode.com/problems/queens-that-can-attack-the-king)
**Companies:** Medianet, Microsoft

---

## Problem Description
On an 8×8 chessboard, you are given the coordinates of a black king and a list of white queens. Each queen can move any number of squares horizontally, vertically, or diagonally until blocked by the board edge. Determine which queens can attack the king directly (i.e., there is no other queen between the king and that queen). Return the positions of those attacking queens.

## Examples
**Example 1:**
```
queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]]
king   = [0,0]
Output: [[0,1],[1,0],[3,3]]
```
The queens at (0,1), (1,0) and (3,3) are the closest in the north, west and diagonal directions.

**Example 2:**
```
queens = [[5,6],[7,7],[2,1],[0,7],[1,6],[5,1],[3,7],[0,3],[4,0],[1,2],[6,3],[5,0],[0,4],[2,2],[1,1],[6,4],[5,4],[0,0],[2,6],[4,5],[5,2],[1,4],[7,5],[2,3],[0,5],[4,2],[1,0],[2,7],[0,1],[4,6],[6,1],[0,2],[5,3],[6,0],[7,4],[5,7],[1,7],[1,5],[2,0],[0,6],[4,7],[6,2],[7,6],[5,5],[3,0],[6,5],[5,6],[4,3]]
king   = [3,4]
Output: [[2,3],[1,4],[1,6],[3,7],[4,3],[5,4],[4,5]]
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

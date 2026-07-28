# 1194. Tournament Winners

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/tournament-winners](https://leetcode.com/problems/tournament-winners)
**Companies:** Wayfair

---

## Problem Description
You are given a list of `matches`, where each match is a pair `[winner, loser]` indicating that `winner` defeated `loser`. All players are numbered from `1` to `n`. A player can be a **potential tournament winner** if there exists at least one way to assign outcomes to the remaining unplayed matches such that this player ends up with the highest number of wins (or ties for highest). Return a list of all players who could possibly be tournament winners.

## Examples
**Example 1:**
```
Input: n = 3, matches = [[1,2],[2,3]]
Output: [1,2]
Explanation: Player 1 already beat 2. If 2 beats 3, player 1 has 1 win, player 2 also 1 win, player 3 0. Both 1 and 2 can be winners.
```

**Example 2:**
```
Input: n = 4, matches = []
Output: [1,2,3,4]
Explanation: No matches have been played, any player could end up winning.
```

## Approach
Model the tournament as a directed graph where an edge `u → v` means `u` defeated `v`. A player can be a winner if they are not *definitely* beaten by another player via a directed path. Compute the transitive closure (or use Floyd‑Warshall / BFS from each node) to find which players are reachable from each other. Any player that is not reachable from any other player is a candidate winner.

**Pseudocode**
```text
FUNCTION tournamentWinners(n, matches):
    SET adj ← LIST of n empty lists
    FOR each [u, v] IN matches:
        APPEND v TO adj[u]
    // compute reachability using BFS from each node
    SET canBeat ← MATRIX n×n initialized FALSE
    FOR i ← 1 TO n:
        CALL bfs(i, adj, canBeat[i])
    SET result ← []
    FOR i ← 1 TO n:
        SET beatenByOther ← FALSE
        FOR j ← 1 TO n:
            IF i ≠ j AND canBeat[j][i] = TRUE:
                SET beatenByOther ← TRUE
                BREAK
        IF NOT beatenByOther:
            APPEND i TO result
    RETURN result

FUNCTION bfs(start, adj, row):
    SET queue ← [start]
    SET visited ← SET containing start
    WHILE queue NOT EMPTY:
        SET node ← POP_FRONT(queue)
        FOR each neighbor IN adj[node]:
            IF neighbor NOT IN visited:
                SET visited ADD neighbor
                SET row[neighbor] ← TRUE
                PUSH_BACK(queue, neighbor)
```

## Walkthrough
Consider `n = 3, matches = [[1,2],[2,3]]`.
1. Build adjacency: 1→2, 2→3.
2. BFS from 1 reaches {2,3}; from 2 reaches {3}; from 3 reaches {}.
3. Player 1 is not reachable from any other player → candidate.
4. Player 2 is not reachable from any other player (only reachable from 1) → candidate.
5. Player 3 is reachable from 1 and 2 → not a candidate.
Result `[1,2]`.

## Complexity Analysis
- Time: O(n · (m + n)) where `m` is number of matches (BFS from each node). For dense graphs Floyd‑Warshall O(n³) is also possible.
- Space: O(n²) for the reachability matrix and O(n + m) for adjacency.

## Follow-Up Questions
1. How would you improve the algorithm for very large `n` where O(n²) space is prohibitive?
2. Can the problem be solved using topological ordering without explicit reachability matrix?
3. How would you handle ties where multiple players have the same maximum win count?

## Key Takeaway
A player can be a possible tournament winner iff no other player can reach (defeat) them through a directed path; computing reachability reveals all such candidates.

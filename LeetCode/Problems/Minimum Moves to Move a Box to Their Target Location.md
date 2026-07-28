# 1263. Minimum Moves to Move a Box to Their Target Location

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location](https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location)
**Companies:** Google

---

## Problem Description

Push a box to a target on a grid. The player must be adjacent to the box to push it. Minimize the number of **pushes**. Grid has walls, a player start, box start, and target.

## Examples

| Grid | Explanation |
|------|-------------|
| `[['#','#','#','#','#'],['#','S','.','B','T'],['#','.','.','.','#'],['#','#','#','#','#']]` | The player `S` pushes the box `B` right twice to reach the target `T` in 2 pushes. |
| `[['#','#','#'],['#','S','B'],['#','.','T'],['#','#','#']]` | No possible sequence of pushes can move the box to `T`; return -1.

## Approach

**Algorithm:** 0‑1 BFS on combined box‑player states.

- Outer BFS explores box positions; each push costs 1.
- For each box position, an inner BFS checks if the player can reach the required pushing cell without crossing the box (cost 0).
- Use a deque to process 0‑cost player moves before 1‑cost pushes.

```text
FUNCTION minPushBox(grid):
    // Locate start positions for player, box, and target
    FIND (playerR, playerC), (boxR, boxC), (targetR, targetC)
    deque ← [(0, boxR, boxC, playerR, playerC)]
    visited ← set of (boxR, boxC, playerR, playerC)
    WHILE deque NOT EMPTY:
        (pushes, br, bc, pr, pc) ← deque.POPLEFT()
        IF (br, bc) == (targetR, targetC): RETURN pushes
        FOR each direction (dr, dc) IN [(‑1,0),(1,0),(0,‑1),(0,1)]:
            // Position player must stand to push box
            pushFromR ← br ‑ dr
            pushFromC ← bc ‑ dc
            newBoxR ← br + dr
            newBoxC ← bc + dc
            IF pushFrom inside grid AND newBox inside grid AND grid[newBoxR][newBoxC] != '#':
                IF playerCanReach(pr, pc, pushFromR, pushFromC, br, bc, grid):
                    IF (newBoxR, newBoxC, br, bc) NOT IN visited:
                        visited.ADD((newBoxR, newBoxC, br, bc))
                        deque.APPEND((pushes+1, newBoxR, newBoxC, br, bc))
    RETURN -1

FUNCTION playerCanReach(sr, sc, tr, tc, br, bc, grid):
    // BFS ignoring the box cell (br, bc)
    queue ← [(sr, sc)]
    seen ← set((sr, sc))
    WHILE queue NOT EMPTY:
        (r, c) ← queue.POP()
        IF (r, c) == (tr, tc): RETURN TRUE
        FOR each (dr, dc) IN [(‑1,0),(1,0),(0,‑1),(0,1)]:
            nr ← r + dr; nc ← c + dc
            IF inside grid AND grid[nr][nc] != '#' AND (nr, nc) != (br, bc) AND (nr, nc) NOT IN seen:
                seen.ADD((nr, nc))
                queue.APPEND((nr, nc))
    RETURN FALSE
```

## Walkthrough

Consider the first example grid:
```
# # # # #
# S . B T
# . . . #
# # # # #
```
1. Initial state: box at (1,3), player at (1,1).
2. Player moves to (1,2) (cost 0) – reachable via inner BFS.
3. Player pushes box right to (1,4); player ends at (1,3). Push count = 1.
4. Player moves to (1,2) again (cost 0).
5. Player pushes box right onto target (1,5); push count = 2.
6. Box reaches target, algorithm returns 2.

## Complexity Analysis

- **Time:** O(R²·C²) – each box position (R·C) combined with a BFS over the grid (R·C).
- **Space:** O(R²·C²) for the visited set and BFS queues.

## Follow-Up Questions

- How would the solution change if diagonal moves were allowed?
- Can the algorithm be adapted to return the actual sequence of pushes?
- What if multiple boxes need to be moved simultaneously?

## Key Takeaway

> Sokoban = **nested BFS**: outer BFS on box pushes (minimized), inner BFS on player reachability. State = (box position, player position).
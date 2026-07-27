# 1263. Minimum Moves to Move a Box to Their Target Location

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location](https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location)
**Companies:** Google

---

## Problem Description

Push a box to a target on a grid. The player must be adjacent to the box to push it. Minimize the number of **pushes**. Grid has walls, a player start, box start, and target.

## Key Insight

> This is a Sokoban-style problem. Use **0-1 BFS** (or BFS + BFS): the outer BFS explores box positions (push = cost 1), and for each box position, an inner BFS checks if the player can reach the required push position (player moves = cost 0).

## Approach: BFS on (box, player) — O(R²·C²) ✅

```
FUNCTION minPushBox(grid):
    // State: (boxR, boxC, playerR, playerC)
    // Push = move box one step (cost 1), player must be on opposite side
    // Use 0-1 BFS or deque: push = +1, player movement = +0
    deque ← [(0, boxR, boxC, playerR, playerC)]
    visited ← set

    WHILE deque:
        (pushes, br, bc, pr, pc) ← deque.POPLEFT()
        IF (br, bc) == target: RETURN pushes
        // Try pushing box in each direction
        FOR each direction d:
            // Player must be at box's opposite side
            pushFrom ← (br-dr, bc-dc)
            IF player can reach pushFrom via BFS (without crossing box):
                newBox ← (br+dr, bc+dc)
                IF valid and not visited:
                    deque.APPEND((pushes+1, newBox, br, bc))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(R² · C²) | O(R² · C²) |

## Key Takeaway

> Sokoban = **nested BFS**: outer BFS on box pushes (minimized), inner BFS on player reachability. State = (box position, player position).

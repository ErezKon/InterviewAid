# 3568. Minimum Moves to Clean the Classroom

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-clean-the-classroom](https://leetcode.com/problems/minimum-moves-to-clean-the-classroom)
**Companies:** Bloomberg

---

## Problem Description

Navigate a grid classroom, collecting all litter pieces with minimum moves. Return the minimum total moves.

## Key Insight

> BFS with bitmask state: `(row, col, collected_mask)`. Each litter piece corresponds to a bit. Since there are few pieces (≤ 10), the state space is manageable.

## Approach: BFS + Bitmask — O(R·C·2^L) ✅

```
FUNCTION minMoves(classroom):
    // Assign each litter piece an index (0..L-1)
    // BFS from start position with state (r, c, mask)
    // mask tracks which pieces have been collected
    allCollected ← (1 << L) - 1
    queue ← [(startR, startC, 0, 0)]
    visited ← set of (r, c, mask)

    WHILE queue:
        (r, c, mask, moves) ← queue.DEQUEUE()
        IF mask == allCollected: RETURN moves
        FOR each neighbor (nr, nc):
            newMask ← mask | (bit for litter at (nr,nc) if any)
            IF (nr, nc, newMask) NOT IN visited:
                visited.ADD((nr, nc, newMask))
                queue.ENQUEUE((nr, nc, newMask, moves+1))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(R · C · 2^L) | O(R · C · 2^L) |

## Key Takeaway

> Grid collection problems with few items → **BFS with bitmask** to track which items have been collected. State = (position, collection mask).

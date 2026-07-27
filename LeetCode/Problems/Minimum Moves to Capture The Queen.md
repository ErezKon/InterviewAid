# 3001. Minimum Moves to Capture The Queen

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-capture-the-queen](https://leetcode.com/problems/minimum-moves-to-capture-the-queen)
**Companies:** Goldman Sachs, Wipro

---

## Problem Description

A rook and a bishop are on an 8×8 board. Return the **minimum number of moves** (by either piece) to capture the queen. Pieces can block each other's path.

## Key Insight

> The answer is at most 2 (move any piece once, then capture). Check if **1 move** suffices: rook captures if on same row/col with no blocker; bishop captures if on same diagonal with no blocker.

## Approach: Case Analysis — O(1) ✅

```
FUNCTION minMovesToCaptureTheQueen(rR, rC, bR, bC, qR, qC):
    // Check if rook can capture in 1 move (same row/col, bishop not blocking)
    IF rR == qR: check no bishop blocking on that row
    IF rC == qC: check no bishop blocking on that column
    // Check if bishop can capture in 1 move (same diagonal, rook not blocking)
    IF |bR-qR| == |bC-qC|: check no rook blocking on that diagonal
    // Otherwise 2 moves always suffices
    RETURN 1 or 2
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

## Key Takeaway

> Chess capture problems often reduce to **case analysis**: check 1-move captures with blocking conditions, otherwise the answer is 2.

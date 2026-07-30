# 3001. Minimum Moves to Capture The Queen

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-capture-the-queen](https://leetcode.com/problems/minimum-moves-to-capture-the-queen)
**Companies:** Goldman Sachs, Wipro

---

## Problem Description

A rook and a bishop are placed on an 8×8 chessboard along with a queen. Each piece can move according to standard chess rules, and pieces may block each other's paths. Determine the minimum number of moves (by either the rook or the bishop) required to capture the queen. Return the smallest possible number of moves.

## Examples

**Example 1:**
```
Input: rook = [0,0], bishop = [2,2], queen = [0,7]
Output: 1
Explanation: The rook is on the same row as the queen with no bishop blocking the path, so it captures in one move.
```

**Example 2:**
```
Input: rook = [0,0], bishop = [1,2], queen = [3,3]
Output: 2
Explanation: Neither piece can capture the queen in one move because the rook is not aligned and the bishop's diagonal is blocked. Two moves are always sufficient.
```

## Approach

**Algorithm:** Case Analysis with Blocking Checks

The answer is at most 2 because one piece can always move to a position that enables capture on the next turn. We only need to verify whether a single‑move capture is possible.

1. **Rook capture in 1 move** – same row or column as the queen and no bishop between them.
2. **Bishop capture in 1 move** – same diagonal as the queen and no rook between them.
3. If neither condition holds, return 2.

```text
FUNCTION minMovesToCaptureTheQueen(rR, rC, bR, bC, qR, qC):
    // Check rook horizontal capture
    IF rR == qR:
        IF NOT isBlocked(rR, rC, qR, qC, bR, bC):
            RETURN 1
    // Check rook vertical capture
    IF rC == qC:
        IF NOT isBlocked(rR, rC, qR, qC, bR, bC):
            RETURN 1
    // Check bishop diagonal capture
    IF ABS(bR - qR) == ABS(bC - qC):
        IF NOT isBlocked(bR, bC, qR, qC, rR, rC):
            RETURN 1
    // Otherwise two moves are sufficient
    RETURN 2

FUNCTION isBlocked(sR, sC, eR, eC, oR, oC):
    // Returns true if the other piece lies strictly between start and end
    IF sR == eR: // horizontal line
        RETURN (oR == sR) AND (MIN(sC, eC) < oC < MAX(sC, eC))
    IF sC == eC: // vertical line
        RETURN (oC == sC) AND (MIN(sR, eR) < oR < MAX(sR, eR))
    // diagonal line
    RETURN (ABS(oR - sR) == ABS(oC - sC)) AND (MIN(sR, eR) < oR < MAX(sR, eR))
```

## Walkthrough

| Step | Rook Position | Bishop Position | Queen Position | Action |
|------|---------------|----------------|----------------|--------|
| 1 | (0,0) | (2,2) | (0,7) | Rook shares row with queen and no bishop blocks → capture in 1 move |
| 2 | (0,0) | (1,2) | (3,3) | Neither piece aligns; rook cannot capture, bishop diagonal blocked by rook → need 2 moves |

## Complexity Analysis

- **Time:** O(1) – constant checks and arithmetic.
- **Space:** O(1) – only a few variables.

## Follow-Up Questions

1. How would the solution change if there were multiple queens?
2. What if pieces could move like knights as well?
3. Can you extend the approach to an N×N board with more pieces?

## Key Takeaway

Chess capture problems often reduce to simple case analysis: verify one‑move capture possibilities with blocking conditions, otherwise the answer is two.

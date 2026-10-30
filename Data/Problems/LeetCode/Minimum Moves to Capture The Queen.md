# 3001. Minimum Moves to Capture The Queen

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-capture-the-queen](https://leetcode.com/problems/minimum-moves-to-capture-the-queen)
**Companies:** Goldman Sachs, Wipro

---

## Problem Description

There is a **1-indexed** `8 x 8` chessboard containing `3` pieces.

You are given `6` integers `a`, `b`, `c`, `d`, `e`, and `f` where:

- `(a, b)` denotes the position of the white rook.
- `(c, d)` denotes the position of the white bishop.
- `(e, f)` denotes the position of the black queen.

Given that you can only move the white pieces, return *the **minimum** number of moves required to capture the black queen*.

**Note** that:

- Rooks can move any number of squares either vertically or horizontally, but cannot jump over other pieces.
- Bishops can move any number of squares diagonally, but cannot jump over other pieces.
- A rook or a bishop can capture the queen if it is located in a square that they can move to.
- The queen does not move.

**Constraints:**
- `1 <= a, b, c, d, e, f <= 8`
- No two pieces are on the same square.

## Examples

**Example 1:**
```
Input: a = 1, b = 1, c = 8, d = 8, e = 2, f = 3
Output: 2
Explanation: We can capture the black queen in two moves by moving the white rook to (1, 3) then to (2, 3).
It is impossible to capture the black queen in less than two moves since it is not being attacked by any of the pieces at the beginning.
```

**Example 2:**
```
Input: a = 5, b = 3, c = 3, d = 4, e = 5, f = 2
Output: 1
Explanation: We can capture the black queen in a single move by doing one of the following:
- Move the white rook to (5, 2).
- Move the white bishop to (5, 2).
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

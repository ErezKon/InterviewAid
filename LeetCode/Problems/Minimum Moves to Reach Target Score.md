# 2139. Minimum Moves to Reach Target Score

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Meta, Wayfair

---

## Problem Description

Starting from 1, you can +1 or double (at most `maxDoubles` times). Reach `target` with **minimum moves**.

## Key Insight

> Work backwards from target. If even, halve (uses a double). If odd, subtract 1. When out of doubles, add the remaining difference directly.

## Approach: Greedy Reverse — O(log target) ✅

```
FUNCTION minMoves(target, maxDoubles):
    moves = 0
    WHILE target > 1:
        IF maxDoubles > 0 AND target % 2 == 0:
            target //= 2; maxDoubles -= 1
        ELSE IF maxDoubles > 0:
            target -= 1
        ELSE:
            moves += target - 1; BREAK
        moves += 1
    RETURN moves
```

| Time | Space |
|------|-------|
| O(log target) | O(1) |

## Key Takeaway

> Reverse simulation: doubling forward = halving backward. Greedily use halving on even numbers, then the remaining distance is linear increments.

# 2139. Minimum Moves to Reach Target Score

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Meta, Wayfair

---

## Problem Description

Starting from 1, you can +1 or double (at most `maxDoubles` times). Reach `target` with **minimum moves**.

## Examples

| target | maxDoubles | Output | Explanation |
|--------|------------|--------|-------------|
| 10 | 4 | 4 | 1 → 2 (double), 2 → 4 (double), 4 → 8 (double), 8 → 9 (+1), 9 → 10 (+1): 5 moves, but using only 3 doubles: 1 → 2, 2 → 4, 4 → 5 (+1), 5 → 10 (double) gives 4 moves. |
| 5 | 1 | 4 | Only one double allowed: 1 → 2 (double), then three +1 operations to reach 5. |
| 3 | 0 | 2 | No doubles, just two +1 operations.

## Approach

**Algorithm:** Greedy reverse simulation.

- Work backwards from `target` to 1.
- If a double is still available and the current value is even, halve it (reverse of a double).
- Otherwise, subtract 1 (reverse of a +1).
- When no doubles remain, the remaining distance is covered by simple increments.

```text
FUNCTION minMoves(target, maxDoubles):
    moves ← 0
    WHILE target > 1:
        IF maxDoubles > 0 AND target MOD 2 == 0:
            target ← target / 2
            maxDoubles ← maxDoubles - 1
        ELSE IF maxDoubles > 0:
            target ← target - 1
        ELSE:
            moves ← moves + (target - 1)
            BREAK
        moves ← moves + 1
    RETURN moves
```

## Walkthrough

Take `target = 10`, `maxDoubles = 4`.
1. `target` is even and a double is available → halve to 5 (moves=1, doubles=3).
2. 5 is odd → subtract 1 → 4 (moves=2).
3. 4 is even → halve to 2 (moves=3, doubles=2).
4. 2 is even → halve to 1 (moves=4, doubles=1).
5. Reached 1, total moves = 4, which is optimal.

## Complexity Analysis

- **Time:** O(log target) – each iteration reduces the target by at least half or by one.
- **Space:** O(1) – only a few scalar variables are used.

## Follow-Up Questions

- How would the solution change if the `+1` operation could be replaced by `+k` for a given `k`?
- What if the number of allowed doubles is unlimited?
- Can we extend the approach to compute the actual sequence of operations?

## Key Takeaway

> Reverse simulation turns forward additions/doubles into backward subtractions/halves, yielding a greedy O(log target) solution.

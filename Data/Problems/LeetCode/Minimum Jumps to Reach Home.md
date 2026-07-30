# 1654. Minimum Jumps to Reach Home

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-jumps-to-reach-home](https://leetcode.com/problems/minimum-jumps-to-reach-home)
**Companies:** Accolite, Amazon, Microsoft

---

## Problem Description

A bug starts at position 0. It can jump forward `a` or backward `b` (but not two consecutive backwards). Some positions are forbidden. Find **minimum jumps** to reach `x`.

## Examples

| forbidden | a | b | x | Output |
|-----------|---|---|---|--------|
| [14,4,18,1,15] | 3 | 15 | 9 | 3 |
| [8,3,16,6,12,20] | 2 | 1 | 9 | 2 |

*Explanation*: In the first example, the bug jumps `+3 → 3`, `+3 → 6`, `+3 → 9`.

## Approach

**Algorithm**: Breadth‑First Search (BFS) with state `(position, lastWasBack)`.

The backward constraint is encoded as a boolean flag. We explore forward jumps always; backward jumps only if the previous move was not backward. The search space is bounded by `maxPos = max(x, max(forbidden)) + a + b` (≈ 6000).

```text
FUNCTION minimumJumps(forbidden, a, b, x):
    SET banned ← SET(forbidden)
    SET maxPos ← max(x, MAX(forbidden)) + a + b
    SET queue ← [(0, false)]
    SET visited ← {(0, false)}
    SET steps ← 0
    WHILE queue NOT EMPTY:
        FOR (pos, wasBack) IN queue:
            IF pos == x: RETURN steps
            // forward jump
            SET nextF ← pos + a
            IF nextF ≤ maxPos AND nextF NOT IN banned AND (nextF, false) NOT IN visited:
                ADD (nextF, false) TO visited
                ENQUEUE (nextF, false)
            // backward jump (only if previous was not back)
            IF NOT wasBack:
                SET nextB ← pos - b
                IF nextB ≥ 0 AND nextB NOT IN banned AND (nextB, true) NOT IN visited:
                    ADD (nextB, true) TO visited
                    ENQUEUE (nextB, true)
        INCREMENT steps
    RETURN -1
```

## Walkthrough

Example: `forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9`

| Step | Queue (pos, wasBack) | Visited |
|------|----------------------|---------|
| 0 | [(0, false)] | {(0,false)} |
| 1 | [(3, false)] | add (3,false) |
| 2 | [(6, false)] | add (6,false) |
| 3 | [(9, false)] | reached x → return 3 |

## Complexity Analysis

- **Time**: O(maxPos) – each state `(position, flag)` is visited at most once.
- **Space**: O(maxPos) – queue and visited set store at most two entries per position.

## Follow‑Up Questions

1. How would you modify the algorithm if backward jumps could be performed consecutively?
2. Can the solution be optimized to use `O(1)` additional space?
3. How does the approach change if the board is circular (positions wrap around)?

## Key Takeaway

> When movement has constraints on consecutive actions, encode the constraint in the BFS state. Here: `(position, last_direction)` doubles the state space but handles the no‑consecutive‑backward rule cleanly.

# 1654. Minimum Jumps to Reach Home

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-jumps-to-reach-home](https://leetcode.com/problems/minimum-jumps-to-reach-home)
**Companies:** Accolite, Amazon, Microsoft

---

## Problem Description

A bug starts at position 0. It can jump forward `a` or backward `b` (but not two consecutive backwards). Some positions are forbidden. Find **minimum jumps** to reach `x`.

## Key Insight

> BFS with state `(position, lastWasBack)` — the backward constraint adds a boolean to the state. Upper bound the search space at ~6000 (max of x + a + b).

## Approach: BFS — O(max_pos) ✅

```
FUNCTION minimumJumps(forbidden, a, b, x):
    banned = SET(forbidden)
    queue = [(0, false)]; visited = {(0, false)}; steps = 0
    WHILE queue:
        FOR pos, wasBack IN queue:
            IF pos == x: RETURN steps
            IF pos + a <= 6000 AND pos + a NOT IN banned AND (pos+a, false) NOT IN visited:
                ADD (pos+a, false)
            IF NOT wasBack AND pos - b >= 0 AND pos - b NOT IN banned AND (pos-b, true) NOT IN visited:
                ADD (pos-b, true)
        steps += 1
    RETURN -1
```

| Time | Space |
|------|-------|
| O(max_pos) | O(max_pos) |

## Key Takeaway

> When movement has constraints on consecutive actions, encode the constraint in the BFS state. Here: `(position, last_direction)` doubles the state space but handles the no-consecutive-backward rule cleanly.

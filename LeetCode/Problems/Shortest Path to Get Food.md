# 1730. Shortest Path to Get Food

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-to-get-food](https://leetcode.com/problems/shortest-path-to-get-food)
**Companies:** Bloomberg, Doordash

---

## Problem Description

Given a grid with your location (`*`), food (`#`), obstacles (`X`), and empty cells (`O`), find the shortest path to any food cell. Return -1 if unreachable.

---

## Approach: BFS — O(m·n)

```
FUNCTION getFood(grid):
    // Find start position '*'
    queue ← [(startR, startC, 0)]
    visited ← mark start

    WHILE queue:
        (r, c, steps) ← queue.DEQUEUE()
        FOR (nr, nc) IN 4 directions:
            IF out of bounds OR visited OR obstacle: CONTINUE
            IF grid[nr][nc] == '#': RETURN steps + 1
            visited.ADD((nr, nc))
            queue.ENQUEUE((nr, nc, steps + 1))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Standard BFS from start to nearest target — BFS guarantees the first food cell reached is the closest one.

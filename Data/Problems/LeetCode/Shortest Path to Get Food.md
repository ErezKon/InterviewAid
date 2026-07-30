# 1730. Shortest Path to Get Food

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-to-get-food](https://leetcode.com/problems/shortest-path-to-get-food)
**Companies:** Bloomberg, Doordash

---

## Problem Description

Given a grid with your location (`*`), food (`#`), obstacles (`X`), and empty cells (`O`), find the shortest path to any food cell. Return -1 if unreachable.

---

## Approach: BFS — O(m·n)

```text
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

---

## Examples

| Grid | Shortest Path Length |
|------|----------------------|
| `[['*','O','O'],['X','O','#'],['O','O','O']]` | 3 |
| `[['*','X','O'],['X','X','O'],['O','O','#']]` | -1 |

*Explanation*: BFS expands outward level by level; the first `#` encountered yields the minimal steps.

---

## Walkthrough

1. **Initialize** – Locate `*` at `(0,0)`, enqueue `(0,0,0)`, mark visited.
2. **Level 0** – Dequeue `(0,0,0)`, explore its four neighbors. Valid moves: `(0,1)` and `(1,0)` (blocked by `X`). Enqueue `(0,1,1)`.
3. **Level 1** – Dequeue `(0,1,1)`, explore neighbors. Reach `(0,2,2)` and `(1,1,2)`.
4. **Level 2** – Dequeue `(0,2,2)`, neighbor `(1,2)` contains `#`. Return `2 + 1 = 3` steps.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) – each cell visited at most once | O(m·n) – queue and visited set |

---

## Follow-Up Questions

* How would you modify the algorithm to return the actual path coordinates?
* What changes are needed if multiple food cells exist and you must return the lexicographically smallest path?
* Can you handle dynamic obstacles that appear after the search begins?

---

## Key Takeaway

> Standard BFS from start to nearest target — BFS guarantees the first food cell reached is the closest one.

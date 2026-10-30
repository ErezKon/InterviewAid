# 1730. Shortest Path to Get Food

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-to-get-food](https://leetcode.com/problems/shortest-path-to-get-food)
**Companies:** Bloomberg, Doordash

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.

You are given an `m x n` character matrix, `grid`, of these different types of cells:

- `'*'` is your location. There is **exactly one** `'*'` cell.
- `'#'` is a food cell. There may be **multiple** food cells.
- `'O'` is free space, and you can travel through these cells.
- `'X'` is an obstacle, and you cannot travel through these cells.

You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.

Return *the **length** of the shortest path for you to reach **any** food cell*. If there is no path for you to reach food, return `-1`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[row][col]` is `'*'`, `'X'`, `'O'`, or `'#'`.
- The `grid` contains **exactly one** `'*'`.

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

**Example 1:**
```
Input: grid = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]
Output: 3
Explanation: It takes 3 steps to reach the food.
```

**Example 2:**
```
Input: grid = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]
Output: -1
Explanation: It is not possible to reach the food.
```

**Example 3:**
```
Input: grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]]
Output: 6
Explanation: There can be multiple food cells. It only takes 6 steps to reach the bottom food.
```

**Example 4:**
```
Input: grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["O","O","O","O","O","O","O","O"]]
Output: 5
```

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

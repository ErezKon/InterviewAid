# 1036. Escape a Large Maze

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/escape-a-large-maze](https://leetcode.com/problems/escape-a-large-maze)
**Companies:** Amazon, Google, Uipath

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Limited BFS](#approach-limited-bfs--ob²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a 1 million by 1 million grid on an XY-plane, and the coordinates of each grid square are `(x, y)`.

We start at the `source = [s_x, s_y]` square and want to reach the `target = [t_x, t_y]` square. There is also an array of `blocked` squares, where each `blocked[i] = [x_i, y_i]` represents a blocked square with coordinates `(x_i, y_i)`.

Each move, we can walk one square north, east, south, or west if the square is **not** in the array of `blocked` squares. We are also not allowed to walk outside of the grid.

Return `true`* if and only if it is possible to reach the *`target`* square from the *`source`* square through a sequence of valid moves*.

**Constraints:**
- `0 <= blocked.length <= 200`
- `blocked[i].length == 2`
- `0 <= x_i, y_i < 10^6`
- `source.length == target.length == 2`
- `0 <= s_x, s_y, t_x, t_y < 10^6`
- `source != target`
- It is guaranteed that `source` and `target` are not blocked.

---

## Examples

**Example 1:**
```
Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
Output: false
Explanation: The target square is inaccessible starting from the source square because we cannot move.
We cannot move north or east because those squares are blocked.
We cannot move south or west because we cannot go outside of the grid.
```

**Example 2:**
```
Input: blocked = [], source = [0,0], target = [999999,999999]
Output: true
Explanation: Because there are no blocked cells, it is possible to reach the target square.
```

---

## Key Insight

> The grid is enormous but there are at most 200 blocked cells. The maximum area they can enclose (against a corner) is `B*(B-1)/2` where B = len(blocked). If BFS from source explores more cells than this limit without hitting target, source is **not enclosed**. Run BFS from both sides to verify neither is enclosed.

---

## Approach: Limited BFS — O(B²) ✅

```
FUNCTION isEscapePossible(blocked, source, target):
    blockedSet = SET(tuple(b) for b in blocked)
    // BFS with limit: if we explore > len(blocked)^2/2 cells, not enclosed
    FUNCTION bfs(start, end):
        queue = [tuple(start)]; visited = {tuple(start)}
        WHILE queue AND len(visited) <= len(blocked)**2 // 2:
            r, c = queue.POPLEFT()
            IF [r, c] == end: RETURN true
            FOR (nr, nc) IN neighbors:
                IF valid AND (nr,nc) NOT IN visited AND (nr,nc) NOT IN blockedSet:
                    visited.ADD((nr,nc)); queue.ADD((nr,nc))
        RETURN len(visited) > len(blocked)**2 // 2
    RETURN bfs(source, target) AND bfs(target, source)
```

---

## Walkthrough

```
blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
B = 2, limit = 2*1/2 = 1

bfs(source=[0,0], target=[0,2]):
  Start at (0,0). Neighbors: (0,1) blocked, (1,0) blocked, (-1,0) invalid, (0,-1) invalid
  No valid neighbors. visited = {(0,0)}, size=1 ≤ 1
  Queue empty → return len(visited)=1 > 1? NO → return false

bfs returns false → answer: false ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(B²) | BFS limited to B²/2 cells per direction |
| **Space** | O(B²) | Visited set |

---

## Key Takeaway

> **On a huge grid with few blocked cells, you don't need full BFS. The max enclosed area is O(B²). If BFS escapes that limit, the point is free. Check from both directions.**

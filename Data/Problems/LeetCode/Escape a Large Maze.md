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

On a 10⁶ × 10⁶ grid, some cells are blocked (up to 200). Determine if there's a path from `source` to `target` avoiding blocked cells.

**Constraints:**
- Grid is 10⁶ × 10⁶ (too large for full BFS)
- `0 <= blocked.length <= 200`

---

## Examples

```
Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
Output: false
Explanation: Source is trapped in corner by blocked cells.
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

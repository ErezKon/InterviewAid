# Multi-Source BFS Pattern

Related: #994, #542, #286, #1162

---

## Problem Description
Given a 2D grid of cells where `0` represents an empty cell, `1` a fresh orange, and `2` a rotten orange, each minute all fresh oranges adjacent (4‑directionally) to a rotten orange become rotten. Return the minimum number of minutes required until no fresh orange remains. If it is impossible, return `-1`.

## Examples
| Grid | Output | Explanation |
|------|--------|-------------|
| `[[2,1,1],[1,1,0],[0,1,1]]` | `4` | Rot spreads from the initial rotten orange to all fresh ones in 4 minutes. |
| `[[2,1,1],[0,1,1],[1,0,1]]` | `-1` | The fresh orange at bottom‑right can never be reached. |

## Approach
**Algorithm:** Multi‑Source Breadth‑First Search (BFS)

1. Enqueue all initially rotten oranges as BFS sources.
2. Perform level‑order traversal, expanding to adjacent fresh oranges.
3. Count levels (minutes) until no fresh orange remains.
4. If any fresh orange is left after BFS, return `-1`.

**Pseudocode:**
```text
FUNCTION rotOranges(grid):
    rows ← number of rows in grid
    cols ← number of cols in grid
    queue ← empty queue
    freshCount ← 0

    // Initialize sources
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            IF grid[r][c] = 2:
                ENQUEUE(queue, (r, c))
            ELSE IF grid[r][c] = 1:
                freshCount ← freshCount + 1

    minutes ← 0
    directions ← [(1,0),(-1,0),(0,1),(0,-1)]

    WHILE queue NOT EMPTY AND freshCount > 0:
        minutes ← minutes + 1
        levelSize ← SIZE(queue)
        FOR i ← 1 TO levelSize:
            (r, c) ← DEQUEUE(queue)
            FOR (dr, dc) IN directions:
                nr ← r + dr; nc ← c + dc
                IF nr IN [0,rows) AND nc IN [0,cols) AND grid[nr][nc] = 1:
                    grid[nr][nc] ← 2
                    freshCount ← freshCount - 1
                    ENQUEUE(queue, (nr, nc))
    RETURN minutes IF freshCount = 0 ELSE -1
```

## Walkthrough
Consider the first example grid.
| Minute | Grid State |
|--------|------------|
| 0 | `[[2,1,1],[1,1,0],[0,1,1]]` |
| 1 | Rotten spreads to (0,1) and (1,0). |
| 2 | New rotten cells spread further. |
| 3 | All fresh oranges become rotten except one. |
| 4 | Final orange rots; no fresh left. |

The BFS processes cells level by level, matching the minute count.

## Complexity Analysis
- **Time:** O(m × n) – each cell is visited at most once.
- **Space:** O(m × n) in the worst case for the queue.

## Follow‑Up Questions
1. How would you modify the algorithm to return the coordinates of the last orange that rots?
2. What changes are needed if oranges can also spread diagonally?
3. Can you solve the problem using Union‑Find instead of BFS?

## Key Takeaway
Multi‑source BFS treats all initial rotten oranges as simultaneous sources, allowing the minute count to be captured by BFS levels.

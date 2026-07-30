# 864. Shortest Path to Get All Keys

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-to-get-all-keys](https://leetcode.com/problems/shortest-path-to-get-all-keys)
**Companies:** Adobe, Airbnb, Google, Phonepe, Roku, Uber

---

## Problem Description
Given a 2D grid of characters where `@` marks the start, `#` are walls, lowercase letters `a‑f` are keys, and uppercase letters `A‑F` are locks that can be opened with the matching key, determine the minimum number of steps required to collect all keys. If it is impossible, return `-1`.

## Examples
| Grid | Output | Explanation |
|------|--------|-------------|
| `[@.a, ###, b.A]` (as rows) | `8` | Collect `a`, open `A`, then collect `b`.
| `[@#a, ###, b.A]` | `-1` | Wall blocks any path to keys.

## Approach
**Algorithm:** Breadth‑First Search (BFS) with a bitmask representing collected keys.

1. Locate the start cell and count total keys `k`.
2. Represent a set of keys as a `k`‑bit integer.
3. BFS state = `(row, col, keysMask)`. Enqueue the start with mask `0`.
4. For each dequeued state, explore four directions.
   - Skip walls or out‑of‑bounds cells.
   - If the cell is a lock and the corresponding key bit is not set, continue.
   - If the cell is a key, set its bit in the mask.
   - If the new mask equals `(1<<k)-1`, all keys are collected – return steps+1.
   - Enqueue the new state if not visited.
5. If the queue empties without collecting all keys, return `-1`.

**Pseudocode:**
```text
FUNCTION shortestPathAllKeys(grid):
    rows ← number of rows in grid
    cols ← number of cols in grid
    startR, startC ← 0, 0
    totalKeys ← 0

    // Locate start and count keys
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            cell ← grid[r][c]
            IF cell = '@':
                startR ← r; startC ← c
            ELSE IF 'a' ≤ cell ≤ 'f':
                totalKeys ← totalKeys + 1

    allKeysMask ← (1 << totalKeys) - 1
    queue ← empty queue
    ENQUEUE(queue, (startR, startC, 0, 0)) // row, col, keysMask, steps
    visited ← {(startR, startC, 0)}
    directions ← [(1,0),(-1,0),(0,1),(0,-1)]

    WHILE queue NOT EMPTY:
        (r, c, keys, steps) ← DEQUEUE(queue)
        FOR (dr, dc) IN directions:
            nr ← r + dr; nc ← c + dc
            IF nr NOT IN [0,rows) OR nc NOT IN [0,cols): CONTINUE
            cell ← grid[nr][nc]
            IF cell = '#': CONTINUE
            newKeys ← keys
            // Handle lock
            IF 'A' ≤ cell ≤ 'F' AND NOT (keys >> (ORD(cell)-ORD('A'))) & 1:
                CONTINUE
            // Handle key
            IF 'a' ≤ cell ≤ 'f':
                newKeys ← newKeys OR (1 << (ORD(cell)-ORD('a')))
            IF newKeys = allKeysMask:
                RETURN steps + 1
            IF (nr, nc, newKeys) NOT IN visited:
                visited.ADD((nr, nc, newKeys))
                ENQUEUE(queue, (nr, nc, newKeys, steps + 1))
    RETURN -1
```

## Walkthrough
Consider a simple grid:
```
@ . a
# # #
 b A .
```
| Step | Position | KeysMask | Action |
|------|----------|----------|--------|
| 0 | (0,0) | 0 | Start |
| 1‑2 | Move to `a` | set bit for `a` | Collect first key |
| 3‑4 | Move down to `A` | lock opened (key present) |
| 5‑6 | Move to `b` | set bit for `b` | All keys collected → return steps |

## Complexity Analysis
- **Time:** O(m × n × 2^k) – each cell can be visited for each possible key subset.
- **Space:** O(m × n × 2^k) for the visited set and BFS queue.

## Follow‑Up Questions
1. How would the solution change if keys could be collected in any order without locks?
2. Can you adapt the algorithm for a 3‑D grid?
3. What is the impact on complexity if the number of keys grows beyond 6?

## Key Takeaway
Encoding the set of collected keys as a bitmask lets BFS treat each unique combination as a separate state, enabling an optimal shortest‑path search in exponential state space.

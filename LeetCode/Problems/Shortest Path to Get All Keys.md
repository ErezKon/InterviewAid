# 864. Shortest Path to Get All Keys

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-to-get-all-keys](https://leetcode.com/problems/shortest-path-to-get-all-keys)
**Companies:** Adobe, Airbnb, Google, Phonepe, Roku, Uber

---

## Approach: BFS with Bitmask State — O(m·n·2^k) ✅

```
FUNCTION shortestPathAllKeys(grid):
    // Find start and count keys
    start = find '@'
    totalKeys = count of a-f in grid

    // State: (row, col, keysBitmask)
    queue = [(startR, startC, 0, 0)]
    visited = {(startR, startC, 0)}
    allKeys = (1 << totalKeys) - 1

    WHILE queue:
        (r, c, keys, steps) = queue.DEQUEUE()

        FOR (nr, nc) IN 4 directions:
            IF wall OR out of bounds: CONTINUE
            cell = grid[nr][nc]
            newKeys = keys

            IF cell is lock AND corresponding key NOT in keys: CONTINUE
            IF cell is key: newKeys |= (1 << (cell - 'a'))

            IF newKeys == allKeys: RETURN steps + 1

            IF (nr, nc, newKeys) NOT IN visited:
                visited.ADD((nr, nc, newKeys))
                queue.ENQUEUE((nr, nc, newKeys, steps + 1))

    RETURN -1
```

State space: position × key combination. Bitmask for keys makes state comparison O(1).

# Minimax Path Problems

Related: #778 Swim in Rising Water, #1631 Path With Minimum Effort, #1102 Path With Maximum Minimum Value

---

## Pattern: Modified Dijkstra for Minimax/Maximin Paths

```
FUNCTION minimaxPath(grid):
    heap = [(grid[0][0], 0, 0)]
    visited = set()

    WHILE heap:
        (cost, r, c) = heap.POP_MIN()
        IF (r, c) == target: RETURN cost

        IF (r, c) IN visited: CONTINUE
        visited.ADD((r, c))

        FOR neighbor (nr, nc):
            IF NOT visited:
                newCost = MAX(cost, grid[nr][nc])    // minimax
                // or MIN(cost, grid[nr][nc])         // maximin
                heap.PUSH((newCost, nr, nc))
```

| Problem | Objective | Edge Weight |
|---------|-----------|------------|
| Swim in Rising Water | Minimize max elevation | MAX |
| Path With Min Effort | Minimize max diff | MAX of abs diff |
| Path With Max Min Value | Maximize min value | MIN |

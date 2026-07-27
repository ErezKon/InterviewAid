# Multi-Source BFS Pattern

Related: #994, #542, #286, #1162

---

## Template

```
FUNCTION multiSourceBFS(grid, sources):
    queue = all source positions
    visited = mark all sources

    distance = 0
    WHILE queue:
        distance += 1
        FOR each cell in current level:
            FOR each neighbor:
                IF valid AND not visited:
                    visit(neighbor)
                    queue.ENQUEUE(neighbor)

    RETURN distance - 1    // or specific answer
```

### Key Problems

| Problem | Sources | What BFS Computes |
|---------|---------|-------------------|
| Rotting Oranges (#994) | Rotten oranges | Time to rot all |
| 01 Matrix (#542) | All 0 cells | Distance to nearest 0 |
| Walls and Gates (#286) | All gates | Distance to nearest gate |
| As Far from Land (#1162) | All land cells | Max distance from land |

# Grid DFS/BFS Pattern Collection

Related: #200, #130, #695, #733, #994, #542, #286, #417

---

## Grid Traversal Template

```
FUNCTION gridDFS(grid, r, c):
    IF out of bounds OR visited OR invalid: RETURN
    MARK visited
    PROCESS cell
    gridDFS(r+1, c)
    gridDFS(r-1, c)
    gridDFS(r, c+1)
    gridDFS(r, c-1)
```

## Problem Taxonomy

| Category | Problems |
|----------|---------|
| **Count components** | #200 Number of Islands, #547 Provinces |
| **Measure components** | #695 Max Area, #463 Perimeter |
| **Multi-source BFS** | #994 Rotting Oranges, #542 01 Matrix, #286 Walls & Gates |
| **Border DFS** | #130 Surrounded Regions, #417 Pacific Atlantic |
| **Shortest path** | #1091 Shortest Path Binary Matrix, #934 Shortest Bridge |
| **Flood fill** | #733 Flood Fill |

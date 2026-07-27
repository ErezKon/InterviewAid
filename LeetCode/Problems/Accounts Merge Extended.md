# Union-Find Pattern Collection

Related: #200, #547, #684, #721, #990, #1135, #1202, #1584

---

## Union-Find Template

```
CLASS UnionFind:
    CONSTRUCTOR(n):
        parent = [0..n-1]
        rank = [0] * n

    FUNCTION find(x):
        IF parent[x] != x:
            parent[x] = find(parent[x])    // path compression
        RETURN parent[x]

    FUNCTION union(x, y):
        px, py = find(x), find(y)
        IF px == py: RETURN false
        // Union by rank
        IF rank[px] < rank[py]: SWAP(px, py)
        parent[py] = px
        IF rank[px] == rank[py]: rank[px] += 1
        RETURN true
```

### When to Use Union-Find vs BFS/DFS

| Use Union-Find When | Use BFS/DFS When |
|---------------------|------------------|
| Edges arrive incrementally | Full graph available |
| Need to check connectivity quickly | Need shortest path |
| Kruskal's MST | Single-source problems |
| Dynamic connectivity | One-time traversal |

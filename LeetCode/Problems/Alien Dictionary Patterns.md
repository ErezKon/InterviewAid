# Topological Sort Problem Collection

Related: #207, #210, #269, #310, #802, #1136, #2115, #2050

---

## Template

```
FUNCTION topologicalSort(graph, inDegree):
    queue = [node for node if inDegree[node] == 0]
    order = []
    WHILE queue:
        node = queue.DEQUEUE()
        order.ADD(node)
        FOR neighbor IN graph[node]:
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0:
                queue.ENQUEUE(neighbor)
    RETURN order IF len(order) == totalNodes ELSE []    // cycle check
```

| Problem | Graph Source |
|---------|------------|
| Course Schedule (#207, #210) | Prerequisites |
| Alien Dictionary (#269) | Character order from word pairs |
| Min Height Trees (#310) | Leaf pruning (reverse topo) |
| Safe States (#802) | Reverse edges |
| Parallel Courses (#1136, #2050) | Longest path in DAG |

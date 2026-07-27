# Topological Sort Pattern

Related: #207 Course Schedule, #210 Course Schedule II, #269 Alien Dictionary, #310 Min Height Trees

---

## Kahn's Algorithm Template

```
FUNCTION topologicalSort(graph, inDegree):
    queue = all nodes with inDegree == 0
    order = []

    WHILE queue:
        node = queue.DEQUEUE()
        order.ADD(node)
        FOR neighbor IN graph[node]:
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0:
                queue.ENQUEUE(neighbor)

    IF len(order) != totalNodes:
        // Cycle detected
        RETURN null

    RETURN order
```

### When to Use

- **Dependency ordering**: Course Schedule, Build Order
- **Character ordering**: Alien Dictionary
- **DAG processing**: any directed acyclic graph where order matters

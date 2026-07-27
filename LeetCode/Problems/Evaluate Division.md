# 399. Evaluate Division

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-division](https://leetcode.com/problems/evaluate-division)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Dp World, Flipkart, Ge Healthcare, Goldman Sachs, Google, Makemytrip, Meta, Microsoft, Nuro, Phonepe, Rippling, Snapchat, Stripe, Tesla, Tiktok, Tower Research, Uber, Urban Company, Yahoo

---

## 1. Problem Description

Given equations like `a/b = 2.0`, answer queries like `a/c = ?`. Return -1.0 if undetermined.

---

## 2. Approach: Graph BFS/DFS — O(Q·(V+E)) ✅

Build a weighted graph: `a → b` with weight `val`, `b → a` with weight `1/val`. For query `a/c`, find path from `a` to `c` and multiply weights.

```
FUNCTION calcEquation(equations, values, queries):
    graph = {}
    FOR i, [a, b] IN enumerate(equations):
        graph[a].ADD((b, values[i]))
        graph[b].ADD((a, 1.0 / values[i]))

    result = []
    FOR [src, dst] IN queries:
        IF src NOT IN graph OR dst NOT IN graph:
            result.ADD(-1.0)
        ELSE IF src == dst:
            result.ADD(1.0)
        ELSE:
            result.ADD(bfs(graph, src, dst))

    RETURN result

FUNCTION bfs(graph, src, dst):
    visited = {src}
    queue = [(src, 1.0)]
    WHILE queue:
        (node, product) = queue.DEQUEUE()
        IF node == dst: RETURN product
        FOR (neighbor, weight) IN graph[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE((neighbor, product * weight))
    RETURN -1.0
```

| Time | Space |
|------|-------|
| O(Q · (V + E)) | O(V + E) |

---

## Key Takeaway

> Division relationships form a weighted directed graph. `a/c = (a/b) * (b/c)` = multiply edge weights along the path. Classic graph modeling problem.

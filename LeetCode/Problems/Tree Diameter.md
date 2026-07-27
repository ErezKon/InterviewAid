# 1245. Tree Diameter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tree-diameter](https://leetcode.com/problems/tree-diameter)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft, Salesforce, Tiktok

---

## Approach: Two BFS — O(n) ✅

```
FUNCTION treeDiameter(edges):
    graph = adjacency list

    // BFS from any node to find farthest node
    farthest, _ = bfs(0)
    // BFS from farthest to find diameter
    _, diameter = bfs(farthest)

    RETURN diameter

FUNCTION bfs(start):
    visited = set()
    queue = [(start, 0)]
    farthestNode = start
    maxDist = 0
    WHILE queue:
        (node, dist) = queue.DEQUEUE()
        IF dist > maxDist: maxDist = dist; farthestNode = node
        FOR neighbor IN graph[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE((neighbor, dist + 1))
    RETURN (farthestNode, maxDist)
```

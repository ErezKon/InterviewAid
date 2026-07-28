# 1245. Tree Diameter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tree-diameter](https://leetcode.com/problems/tree-diameter)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft, Salesforce, Tiktok

---

## Problem Description
Given an undirected tree (a connected graph with no cycles) represented by an edge list, find the length (number of edges) of the longest path between any two nodes in the tree. This longest path is called the tree's diameter.

## Examples
- **Example 1:**
  Input: `edges = [[0,1],[1,2],[1,3],[3,4]]`
  Output: `4`
  Explanation: The longest path is `0‑1‑3‑4` (4 edges).
- **Example 2:**
  Input: `edges = [[0,1]]`
  Output: `1`
  Explanation: Only two nodes, so the diameter is the single edge connecting them.

## Approach
Perform two breadth‑first searches (BFS). First BFS from any node finds the farthest node `A`. A second BFS starting from `A` finds the farthest node `B` and the distance between `A` and `B`, which is the diameter.

```text
FUNCTION treeDiameter(edges):
    SET graph ← BUILD_ADJACENCY_LIST(edges)
    SET farthestNode, _ ← bfs(graph, START_NODE)
    SET _, diameter ← bfs(graph, farthestNode)
    RETURN diameter

FUNCTION bfs(graph, start):
    SET visited ← SET()
    SET queue ← [(start, 0)]
    SET visited.ADD(start)
    SET farthestNode ← start
    SET maxDist ← 0
    WHILE queue NOT EMPTY:
        SET node, dist ← DEQUEUE(queue)
        IF dist > maxDist:
            SET maxDist ← dist
            SET farthestNode ← node
        FOR neighbor IN graph[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                ENQUEUE(queue, (neighbor, dist + 1))
    RETURN (farthestNode, maxDist)
```

## Walkthrough
| Step | Queue | Visited | farthestNode | maxDist |
|------|-------|---------|--------------|---------|
| Start BFS from node 0 | [(0,0)] | {0} | 0 | 0 |
| Dequeue 0 → enqueue 1 | [(1,1)] | {0,1} | 1 | 1 |
| Dequeue 1 → enqueue 2,3 | [(2,2),(3,2)] | {0,1,2,3} | 2 | 2 |
| Dequeue 2 (leaf) | [(3,2)] | … | 2 | 2 |
| Dequeue 3 → enqueue 4 | [(4,3)] | {0,1,2,3,4} | 4 | 3 |
| Dequeue 4 (leaf) | [] | … | 4 | 3 |
Second BFS from node 4 yields maxDist = 4, the diameter.

## Complexity Analysis
- **Time:** O(N) – each BFS visits every node once.
- **Space:** O(N) – adjacency list and BFS queue.

## Follow‑Up Questions
1. How would you compute the diameter if edge weights were given?
2. Can the algorithm be adapted to return the actual path of the diameter?
3. How does the solution change for a rooted tree where you need the longest root‑to‑leaf path?

## Key Takeaway
Two BFS traversals—first to locate an extreme node, second to measure the farthest distance from it—yield the tree diameter in linear time.

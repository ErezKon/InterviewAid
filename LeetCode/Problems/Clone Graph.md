# 133. Clone Graph

**Difficulty:** 🟡 Medium
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/clone-graph](https://leetcode.com/problems/clone-graph)
**Companies:** Amazon, Apple, Bloomberg, Bytedance, Crowdstrike, Ebay, Flexport, Google, Meta, Microsoft, Mongodb, Nutanix, Nvidia, Oracle, Pocket Gems, Siemens, Uber, Wix

---

## 1. Problem Description

Given a reference of a node in a connected undirected graph, return a **deep copy** of the graph. Each node has a value and a list of neighbors.

---

## 2. Approach: BFS/DFS with HashMap — O(V+E) ✅

Map each original node to its clone. Clone neighbors recursively/iteratively.

```
FUNCTION cloneGraph(node):
    IF node == null: RETURN null

    visited = {}     // original → clone
    visited[node] = new Node(node.val)
    queue = [node]

    WHILE queue not empty:
        curr = queue.DEQUEUE()
        FOR neighbor IN curr.neighbors:
            IF neighbor NOT IN visited:
                visited[neighbor] = new Node(neighbor.val)
                queue.ENQUEUE(neighbor)
            visited[curr].neighbors.ADD(visited[neighbor])

    RETURN visited[node]
```

| Time | Space |
|------|-------|
| O(V + E) | O(V) |

---

## Key Takeaway

> Graph cloning = BFS/DFS with a map from original to clone. The map serves double duty: tracking visited nodes and storing clones.

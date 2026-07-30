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

```text
FUNCTION cloneGraph(node):
    IF node == null: RETURN null
    visited ← {}     // original → clone
    visited[node] ← new Node(node.val)
    queue ← [node]
    WHILE queue NOT EMPTY:
        curr ← queue.DEQUEUE()
        FOR neighbor IN curr.neighbors:
            IF neighbor NOT IN visited:
                visited[neighbor] ← new Node(neighbor.val)
                queue.ENQUEUE(neighbor)
            visited[curr].neighbors.ADD(visited[neighbor])
    RETURN visited[node]
```

---

## 3. Examples

| Input (Adjacency List) | Output (Adjacency List of Clone) |
|------------------------|-----------------------------------|
| `[[2,4],[1,3],[2,4],[1,3]]` (4-node cycle) | A new graph with four nodes, same connections, all nodes are new instances |
| `[[2],[1]]` (two nodes) | Clone with two new nodes linked to each other |
| `null` | `null` |

---

## 4. Walkthrough

Consider the graph `1 ↔ 2 ↔ 3 ↔ 4 ↔ 1` (a cycle).

1. Start with node `1`. Create clone `1'` and enqueue `1`.
2. Dequeue `1`; its neighbors are `2` and `4`.
   - `2` not visited → create `2'`, enqueue `2`, link `1'`↔`2'`.
   - `4` not visited → create `4'`, enqueue `4`, link `1'`↔`4'`.
3. Dequeue `2`; neighbors `1` and `3`.
   - `1` already visited → link `2'`↔`1'`.
   - `3` not visited → create `3'`, enqueue `3`, link `2'`↔`3'`.
4. Dequeue `4`; neighbors `3` and `1`.
   - `3` already visited → link `4'`↔`3'`.
   - `1` already visited → link `4'`↔`1'`.
5. Dequeue `3`; all neighbors already visited, links complete.

Result: cloned cycle `1' ↔ 2' ↔ 3' ↔ 4' ↔ 1'`.

---

## 5. Complexity Analysis

- **Time:** O(V + E) – each node and edge processed once.
- **Space:** O(V) – hashmap stores a clone for every original node plus queue overhead.

---

## Follow-Up Questions

- How would you clone the graph using DFS recursion instead of BFS?
- Can you clone the graph in-place without extra hashmap by modifying the original structure temporarily?

---

## Key Takeaway

> Graph cloning = BFS/DFS with a map from original to clone. The map serves double duty: tracking visited nodes and storing clones.

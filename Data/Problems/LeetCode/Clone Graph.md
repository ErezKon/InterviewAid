# 133. Clone Graph

**Difficulty:** 🟡 Medium
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/clone-graph](https://leetcode.com/problems/clone-graph)
**Companies:** Amazon, Apple, Bloomberg, Bytedance, Crowdstrike, Ebay, Flexport, Google, Meta, Microsoft, Mongodb, Nutanix, Nvidia, Oracle, Pocket Gems, Siemens, Uber, Wix

---

## 1. Problem Description

Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```

**Test case format:**

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with `val == 1`, the second node with `val == 2`, and so on. The graph is represented in the test case using an adjacency list.

An **adjacency list** is a collection of unordered **lists** used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with `val = 1`. You must return the **copy of the given node** as a reference to the cloned graph.

**Constraints:**
- The number of nodes in the graph is in the range `[0, 100]`.
- `1 <= Node.val <= 100`
- `Node.val` is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.

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

```
Example 1:
  Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
  Output: [[2,4],[1,3],[2,4],[1,3]]
  Explanation: There are 4 nodes in the graph.
  1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
  2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
  3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
  4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
```

```
Example 2:
  Input: adjList = [[]]
  Output: [[]]
  Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
```

```
Example 3:
  Input: adjList = []
  Output: []
  Explanation: This an empty graph, it does not have any nodes.
```

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

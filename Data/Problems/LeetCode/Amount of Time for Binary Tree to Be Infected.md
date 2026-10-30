# 2385. Amount of Time for Binary Tree to Be Infected

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected
**Companies:** Adobe, Amazon, Blinkit, Bloomberg, Flipkart, Goldman Sachs, Google, Microsoft, Phonepe, Servicenow, Sharechat, Uber
---

## Problem Description
You are given the `root` of a binary tree with **unique** values, and an integer `start`. At minute `0`, an **infection** starts from the node with value `start`.

Each minute, a node becomes infected if:

- The node is currently uninfected.
- The node is adjacent to an infected node.

Return *the number of minutes needed for the entire tree to be infected.*

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`
- Each node has a **unique** value.
- A node with a value of `start` exists in the tree.

## Examples
```
Example 1:
  Input: root = [1,5,3,null,4,10,6,9,2], start = 3
  Output: 4
  Explanation: The following nodes are infected during:
  - Minute 0: Node 3
  - Minute 1: Nodes 1, 10 and 6
  - Minute 2: Node 5
  - Minute 3: Node 4
  - Minute 4: Nodes 9 and 2
  It takes 4 minutes for the whole tree to be infected so we return 4.
```
```
Example 2:
  Input: root = [1], start = 1
  Output: 0
  Explanation: At minute 0, the only node in the tree is infected so we return 0.
```

## Approach
Convert the binary tree into an undirected graph where each node connects to its children and parent, then perform a breadth‑first search (BFS) starting from `start` to measure the farthest distance.

```text
FUNCTION amountOfTime(root, start):
    graph ← MAP()
    // Helper to build adjacency list recursively
    FUNCTION build(node, parent):
        IF node IS NULL: RETURN
        IF parent IS NOT NULL:
            graph[node.val].ADD(parent.val)
            graph[parent.val].ADD(node.val)
        build(node.left, node)
        build(node.right, node)
    END FUNCTION
    build(root, NULL)

    visited ← SET(start)
    queue ← [start]
    time ← -1
    WHILE queue NOT EMPTY:
        time ← time + 1
        nextLevel ← []
        FOR nodeVal IN queue:
            FOR neighbor IN graph[nodeVal]:
                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    nextLevel.ADD(neighbor)
        queue ← nextLevel
    RETURN time
```

## Walkthrough
Consider the tree `[1,5,3,null,4,10,6]` with `start = 3`.
1. Build graph edges: 1‑5, 1‑3, 5‑4, 3‑10, 3‑6.
2. BFS level 0: {3} → time = 0.
3. Level 1: {1,10,6} → time = 1.
4. Level 2: {5} → time = 2.
5. Level 3: {4} → time = 3.
All nodes infected after 4 minutes.

## Complexity Analysis
*Time*: O(n) – each node visited once to build the graph and once during BFS.
*Space*: O(n) – adjacency list and BFS queue.

## Follow‑Up Questions
1. How would you solve the problem without explicitly building a graph?
2. Can you compute the infection time using a single DFS traversal?
3. What changes are needed if infection spreads only to children, not the parent?

## Key Takeaway
Transforming a tree into an undirected graph enables a straightforward BFS to compute the maximum distance from the start node, yielding the total infection time.

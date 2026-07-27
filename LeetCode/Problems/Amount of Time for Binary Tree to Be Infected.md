# 2385. Amount of Time for Binary Tree to Be Infected

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected
**Companies:** Adobe, Amazon, Blinkit, Bloomberg, Flipkart, Goldman Sachs, Google, Microsoft, Phonepe, Servicenow, Sharechat, Uber
---

## Problem Description
Given the root of a binary tree and an integer `start` representing the value of the initially infected node, the infection spreads to adjacent nodes (parent and children) each minute. Return the number of minutes required for the entire tree to become infected.

## Examples
**Example 1**
```
Input: root = [1,5,3,null,4,10,6], start = 3
Output: 4
Explanation: Infection spreads from node 3 to its neighbors each minute until all nodes are infected.
```

**Example 2**
```
Input: root = [1,2,3,4,5,6,7], start = 1
Output: 2
Explanation: Starting at the root, infection reaches all leaves in two minutes.
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

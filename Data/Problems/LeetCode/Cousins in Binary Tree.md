# 993. Cousins in Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree](https://leetcode.com/problems/cousins-in-binary-tree)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description

Two nodes are **cousins** if they have the same depth but different parents. Given values `x` and `y`, return whether they are cousins.

---

## Examples

**Example 1:**
```
Input: root = [1,2,3,4], x = 4, y = 3
Output: true
Explanation: Node 4 is at depth 2 under parent 2, node 3 is at depth 2 under parent 1. Same depth, different parents → cousins.
```

**Example 2:**
```
Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false
Explanation: Nodes 2 and 3 are at depth 1 but share the same parent (the root), so they are siblings, not cousins.
```

---

## Approach

```
FUNCTION isCousins(root, x, y):
    // BFS tracking parent and depth
    queue = [(root, null, 0)]
    xInfo = yInfo = null

    WHILE queue:
        (node, parent, depth) = queue.DEQUEUE()
        IF node.val == x: xInfo = (parent, depth)
        IF node.val == y: yInfo = (parent, depth)
        IF node.left: queue.ENQUEUE((node.left, node, depth + 1))
        IF node.right: queue.ENQUEUE((node.right, node, depth + 1))

    RETURN xInfo[1] == yInfo[1] AND xInfo[0] != yInfo[0]
```

---

## Walkthrough

| Step | Queue (node, parent, depth) | Action |
|------|-----------------------------|--------|
| 1 | [(1, null, 0)] | Dequeue node 1. Not x or y. Enqueue children (2,1,1) and (3,1,1). |
| 2 | [(2,1,1), (3,1,1)] | Dequeue node 2. Not x or y. Enqueue child (4,2,2). |
| 3 | [(3,1,1), (4,2,2)] | Dequeue node 3. Matches y → yInfo = (1,1). No children. |
| 4 | [(4,2,2)] | Dequeue node 4. Matches x → xInfo = (2,2). |
| 5 | [] | Compare: depths 2 vs 1 → false for this example. (In Example 1 depths are both 2 and parents differ, yielding true.) |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each node visited once |
| **Space** | O(w) – queue size equals maximum width of the tree |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the actual cousin nodes instead of just a boolean?
2. Can you solve the problem using a single DFS traversal while still tracking parent and depth?
3. How would the solution change if the tree were represented as an adjacency list rather than a binary‑tree structure?

---

## Key Takeaway

> **Cousins = same depth, different parents. BFS tracking (parent, depth) for each node, then compare the two target nodes' info.**

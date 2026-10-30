# 993. Cousins in Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree](https://leetcode.com/problems/cousins-in-binary-tree)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description

Given the `root` of a binary tree with unique values and the values of two different nodes of the tree `x` and `y`, return `true` *if the nodes corresponding to the values* `x` *and* `y` *in the tree are **cousins**, or* `false` *otherwise.*

Two nodes of a binary tree are **cousins** if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth `0`, and children of each depth `k` node are at the depth `k + 1`.

**Constraints:**
- The number of nodes in the tree is in the range `[2, 100]`.
- `1 <= Node.val <= 100`
- Each node has a **unique** value.
- `x != y`
- `x` and `y` are exist in the tree.

---

## Examples

```
Example 1:
  Input: root = [1,2,3,4], x = 4, y = 3
  Output: false
  Explanation: Node 4 is at depth 2 while node 3 is at depth 1, so they are not cousins.
```

```
Example 2:
  Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
  Output: true
  Explanation: Nodes 4 and 5 are both at depth 2 with different parents (2 and 3).
```

```
Example 3:
  Input: root = [1,2,3,null,4], x = 2, y = 3
  Output: false
  Explanation: Nodes 2 and 3 share the same parent (the root), so they are siblings, not cousins.
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

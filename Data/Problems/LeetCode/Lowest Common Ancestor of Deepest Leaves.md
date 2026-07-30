# 1123. Lowest Common Ancestor of Deepest Leaves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Find the LCA of the deepest leaves in a binary tree.

---

## Examples

**Example 1:**
```
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: Node with value 2
Explanation: The deepest leaves are 7 and 8. Their lowest common ancestor is the node with value 2.
```

**Example 2:**
```
Input: root = [1,2,3]
Output: Node with value 1
Explanation: All leaves are at depth 2, so the LCA of all leaves is the root.
```

---

## 2. Approach: DFS returning (node, depth) — O(n) ✅

```text
FUNCTION lcaDeepestLeaves(root):
    FUNCTION dfs(node):
        // Returns (lcaNode, maxDepth) for the subtree rooted at node
        IF NOT node: RETURN (null, 0)
        leftNode, leftDepth ← dfs(node.left)
        rightNode, rightDepth ← dfs(node.right)
        IF leftDepth > rightDepth:
            RETURN (leftNode, leftDepth + 1)
        ELSE IF rightDepth > leftDepth:
            RETURN (rightNode, rightDepth + 1)
        ELSE:
            // Both sides have deepest leaves at same depth
            RETURN (node, leftDepth + 1)
    RETURN dfs(root)[0]
```

---

## Walkthrough

Consider Example 1. The DFS explores left and right sub‑trees, returning depths:
| Node | Left Depth | Right Depth | Returned LCA |
|------|------------|-------------|--------------|
| 7    | 0          | 0           | 7            |
| 8    | 0          | 0           | 8            |
| 4    | 1 (7)      | 0           | 7            |
| 6    | 0          | 1 (8)       | 8            |
| 2    | 2 (7)      | 2 (8)       | 2            |
| 3    | 0          | 1 (6)       | 6            |
| 1    | 3 (2)      | 3 (6)       | 1            |
The deepest leaves are 7 and 8 (depth 4). Their LCA is node 2, which the algorithm returns.

---

## Complexity Analysis

- **Time:** O(n) – each node is visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

---

## Follow-Up Questions

1. How would you modify the algorithm to return all deepest leaves instead of their LCA?
2. Can you solve the problem iteratively using a bottom‑up BFS approach?
3. How does the solution change if the tree is a binary search tree?

---

## Key Takeaway

> Return both the LCA candidate and the depth from each subtree. If left is deeper, answer is in the left; if equal, current node is the LCA of both deepest sides.

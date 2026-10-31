# 1123. Lowest Common Ancestor of Deepest Leaves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Given the `root` of a binary tree, return *the lowest common ancestor of its deepest leaves*.

Recall that:

- The node of a binary tree is a leaf if and only if it has no children
- The depth of the root of the tree is `0`. if the depth of a node is `d`, the depth of each of its children is `d + 1`.
- The lowest common ancestor of a set `S` of nodes, is the node `A` with the largest depth such that every node in `S` is in the subtree with root `A`.

**Constraints:**
- The number of nodes in the tree will be in the range `[1, 1000]`.
- `0 <= Node.val <= 1000`
- The values of the nodes in the tree are **unique**.

---

## Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest leaf-nodes of the tree.
Note that nodes 6, 0, and 8 are also leaf nodes, but the depth of them is 2, but the depth of nodes 7 and 4 is 3.
```

**Example 2:**
```
Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree, and it's the lca of itself.
```

**Example 3:**
```
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest leaf node in the tree is 2, the lca of one node is itself.
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

Consider Example 1. The DFS explores left and right sub-trees, returning depths:
| Node | Left Depth | Right Depth | Returned LCA |
|------|------------|-------------|--------------|
| 7    | 0          | 0           | 7            |
| 8    | 0          | 0           | 8            |
| 4    | 1 (7)      | 0           | 7            |
| 6    | 0          | 1 (8)       | 8            |
| 2    | 2 (7)      | 2 (8)       | 2            |
| 3    | 0          | 1 (6)       | 6            |
| 1    | 3 (2)      | 3 (6)       | 1            |
The deepest leaves are 7 and 8 (depth 4). Their LCA is node 2, which the algorithm returns.

---

## Complexity Analysis

- **Time:** O(n) – each node is visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

---

## Follow-Up Questions

1. How would you modify the algorithm to return all deepest leaves instead of their LCA?
2. Can you solve the problem iteratively using a bottom-up BFS approach?
3. How does the solution change if the tree is a binary search tree?

---

## Key Takeaway

> Return both the LCA candidate and the depth from each subtree. If left is deeper, answer is in the left; if equal, current node is the LCA of both deepest sides.

# 865. Smallest Subtree with all the Deepest Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given the `root` of a binary tree, the depth of each node is **the shortest distance to the root**.

Return *the smallest subtree* such that it contains **all the deepest nodes** in the original tree.

A node is called **the deepest** if it has the largest depth possible among any node in the entire tree.

The **subtree** of a node is a tree consisting of that node, plus the set of all descendants of that node.

**Constraints:**
- The number of nodes in the tree will be in the range `[1, 500]`.
- `0 <= Node.val <= 500`
- The values of the nodes in the tree are **unique**.

**Note:** This question is the same as 1123: [Lowest Common Ancestor of Deepest Leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/).

### Examples

```
Example 1:
  Input: root = [3,5,1,6,2,0,8,null,null,7,4]
  Output: [2,7,4]
  Explanation: We return the node with value 2 (highlighted in the official diagram).
    The deepest nodes of the tree are 7 and 4.
    Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 is the smallest subtree among them, so we return it.
```

```
Example 2:
  Input: root = [1]
  Output: [1]
  Explanation: The root is the deepest node in the tree.
```

```
Example 3:
  Input: root = [0,1,3,null,2]
  Output: [2]
  Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of nodes 2, 1 and 0 but the subtree of node 2 is the smallest.
```

## Approach: DFS with Depth — O(n) ✅

**Key Insight:** Return both the candidate node and its depth. If left and right subtrees have equal depth, the current node is the LCA of deepest nodes.

```
FUNCTION subtreeWithAllDeepest(root):
    FUNCTION dfs(node):
        IF NOT node: RETURN (null, 0)
        l, ld = dfs(node.left)
        r, rd = dfs(node.right)
        IF ld > rd: RETURN (l, ld + 1)
        IF rd > ld: RETURN (r, rd + 1)
        RETURN (node, ld + 1)
    RETURN dfs(root)[0]
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(h) — recursion depth |

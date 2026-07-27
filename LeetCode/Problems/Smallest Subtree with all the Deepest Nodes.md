# 865. Smallest Subtree with all the Deepest Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given a binary tree, return the smallest subtree that contains all the deepest nodes. The deepest nodes are those at the maximum depth.

### Examples

- **Input:** `root = [3,5,1,6,2,0,8,null,null,7,4]` → **Output:** node `2` (deepest nodes 7,4 are both under node 2)
- **Input:** `root = [1]` → **Output:** node `1`

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

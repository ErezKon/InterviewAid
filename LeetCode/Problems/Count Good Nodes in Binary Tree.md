# 1448. Count Good Nodes in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-nodes-in-binary-tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree)
**Companies:** Amazon, Docusign, Goldman Sachs, Google, Josh Technology, Meta, Microsoft

---

## Approach: DFS with Max Tracking — O(n) ✅

```
FUNCTION goodNodes(root):
    RETURN dfs(root, -infinity)

FUNCTION dfs(node, maxSoFar):
    IF node == null: RETURN 0
    count = 1 IF node.val >= maxSoFar ELSE 0
    maxSoFar = MAX(maxSoFar, node.val)
    RETURN count + dfs(node.left, maxSoFar) + dfs(node.right, maxSoFar)
```

A node is "good" if no node on the path from root to it has a greater value.

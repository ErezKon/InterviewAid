# 814. Binary Tree Pruning

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-pruning](https://leetcode.com/problems/binary-tree-pruning)
**Companies:** Amazon, Hulu, Meta, Microsoft

---

```
FUNCTION pruneTree(root):
    IF NOT root: RETURN null
    root.left = pruneTree(root.left)
    root.right = pruneTree(root.right)
    IF root.val == 0 AND NOT root.left AND NOT root.right: RETURN null
    RETURN root
```

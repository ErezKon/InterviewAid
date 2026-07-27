# 623. Add One Row to Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-one-row-to-tree](https://leetcode.com/problems/add-one-row-to-tree)
**Companies:** Bloomberg, Gilt Groupe, Google

---

```
FUNCTION addOneRow(root, val, depth):
    IF depth == 1:
        newRoot = TreeNode(val, left=root)
        RETURN newRoot
    queue = [root]; d = 1
    WHILE d < depth - 1:
        queue = [child for node in queue for child in [node.left, node.right] if child]
        d += 1
    FOR node IN queue:
        node.left = TreeNode(val, left=node.left)
        node.right = TreeNode(val, right=node.right)
    RETURN root
```

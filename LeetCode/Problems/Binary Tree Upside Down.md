# 156. Binary Tree Upside Down

**Difficulty:** 🟡 Medium

**Companies:** Google, Linkedin
---

```
FUNCTION upsideDownBinaryTree(root):
    IF NOT root OR NOT root.left: RETURN root
    newRoot = upsideDownBinaryTree(root.left)
    root.left.left = root.right
    root.left.right = root
    root.left = root.right = null
    RETURN newRoot
```

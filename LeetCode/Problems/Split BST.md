# 776. Split BST

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Coupang
---

```
FUNCTION splitBST(root, target):
    IF NOT root: RETURN [null, null]
    IF root.val <= target:
        left, right = splitBST(root.right, target)
        root.right = left
        RETURN [root, right]
    ELSE:
        left, right = splitBST(root.left, target)
        root.left = right
        RETURN [left, root]
```

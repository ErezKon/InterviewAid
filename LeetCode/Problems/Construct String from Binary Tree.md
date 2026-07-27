# 606. Construct String from Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-string-from-binary-tree](https://leetcode.com/problems/construct-string-from-binary-tree)
**Companies:** Amazon, Meta, Tiktok

---

```
FUNCTION tree2str(root):
    IF NOT root: RETURN ""
    s = str(root.val)
    IF root.left OR root.right: s += "(" + tree2str(root.left) + ")"
    IF root.right: s += "(" + tree2str(root.right) + ")"
    RETURN s
```

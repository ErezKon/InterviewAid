# 965. Univalued Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/univalued-binary-tree](https://leetcode.com/problems/univalued-binary-tree)
**Companies:** Box, Google, Twilio

---

```
FUNCTION isUnivalTree(root):
    IF NOT root: RETURN true
    IF root.left AND root.left.val != root.val: RETURN false
    IF root.right AND root.right.val != root.val: RETURN false
    RETURN isUnivalTree(root.left) AND isUnivalTree(root.right)
```

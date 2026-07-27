# 1022. Sum of Root To Leaf Binary Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers)
**Companies:** Amazon, Bloomberg, Google, Lime, Meta, Microsoft

---

```
FUNCTION sumRootToLeaf(root, val=0):
    IF root == null: RETURN 0
    val = val * 2 + root.val
    IF root.left == null AND root.right == null: RETURN val
    RETURN sumRootToLeaf(root.left, val) + sumRootToLeaf(root.right, val)
```

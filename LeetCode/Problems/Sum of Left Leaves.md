# 404. Sum of Left Leaves

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-left-leaves](https://leetcode.com/problems/sum-of-left-leaves)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Meta, Microsoft, Uber

---

```
FUNCTION sumOfLeftLeaves(root):
    IF root == null: RETURN 0
    total = 0
    IF root.left AND root.left.left == null AND root.left.right == null:
        total += root.left.val
    RETURN total + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
```

# 112. Path Sum

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/path-sum](https://leetcode.com/problems/path-sum)
**Companies:** Amazon, Apple, Bloomberg, Datadog, Goldman Sachs, Google, Meta, Microsoft, Palo Alto Networks, Tiktok

---

## Approach: DFS — O(n) ✅

```
FUNCTION hasPathSum(root, targetSum):
    IF root == null: RETURN false

    IF root.left == null AND root.right == null:
        RETURN targetSum == root.val

    RETURN hasPathSum(root.left, targetSum - root.val) OR
           hasPathSum(root.right, targetSum - root.val)
```

Check at leaf nodes only (both children null). Subtract node value as you descend.

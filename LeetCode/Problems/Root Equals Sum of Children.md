# 2236. Root Equals Sum of Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/root-equals-sum-of-children](https://leetcode.com/problems/root-equals-sum-of-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given the `root` of a binary tree with exactly 3 nodes (root + 2 children), return `true` if the root's value equals the sum of its children's values.

---

## Approach

```
FUNCTION checkTree(root):
    RETURN root.val == root.left.val + root.right.val
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

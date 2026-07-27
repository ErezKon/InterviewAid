# 872. Leaf-Similar Trees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/leaf-similar-trees](https://leetcode.com/problems/leaf-similar-trees)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle, Snowflake

---

## 1. Problem Description

Two trees are **leaf-similar** if their leaf value sequences (left to right) are equal.

---

## 2. Approach: DFS to Collect Leaves — O(n) ✅

```
FUNCTION leafSimilar(root1, root2):
    RETURN getLeaves(root1) == getLeaves(root2)

FUNCTION getLeaves(node):
    IF node == null: RETURN []
    IF node.left == null AND node.right == null:
        RETURN [node.val]
    RETURN getLeaves(node.left) + getLeaves(node.right)
```

| Time | Space |
|------|-------|
| O(n₁ + n₂) | O(n₁ + n₂) |

---

## 3. Key Takeaway

> DFS collects leaves in left-to-right order. Compare the two sequences. Simple recursive tree traversal.

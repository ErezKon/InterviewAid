# 337. House Robber III

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/house-robber-iii](https://leetcode.com/problems/house-robber-iii)
**Companies:** Amazon, Bloomberg, Docusign, Google, Linkedin, Meta, Microsoft, Oyo, Phonepe, Salesforce, Sprinklr, Tiktok, Two Sigma, Uber, Zip

---

## 1. Problem Description

Houses form a binary tree. You can't rob two directly-linked houses (parent-child). Return the maximum amount.

---

## 2. Approach: DFS with Rob/Not-Rob — O(n) ✅

```
FUNCTION rob(root):
    (robRoot, skipRoot) = dfs(root)
    RETURN MAX(robRoot, skipRoot)

FUNCTION dfs(node):
    IF node == null: RETURN (0, 0)

    (robLeft, skipLeft) = dfs(node.left)
    (robRight, skipRight) = dfs(node.right)

    // Rob this node: can't rob children
    robNode = node.val + skipLeft + skipRight

    // Skip this node: take best of each child
    skipNode = MAX(robLeft, skipLeft) + MAX(robRight, skipRight)

    RETURN (robNode, skipNode)
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## Key Takeaway

> Return two values per node: (max if robbed, max if skipped). This avoids recomputation and gives a clean O(n) solution.

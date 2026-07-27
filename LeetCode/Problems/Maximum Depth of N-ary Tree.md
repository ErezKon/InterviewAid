# 559. Maximum Depth of N-ary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/maximum-depth-of-n-ary-tree](https://leetcode.com/problems/maximum-depth-of-n-ary-tree)
**Companies:** Amazon, Datadog

---

## 1. Problem Description

Given a n-ary tree, find its maximum depth.

---

## 2. Approach: DFS — O(n) ✅

```
FUNCTION maxDepth(root):
    IF root == null: RETURN 0
    IF root.children is empty: RETURN 1
    RETURN 1 + MAX(maxDepth(child) for child in root.children)
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## Key Takeaway

> Generalization of binary tree max depth. Same recursion, iterate over all children instead of just left/right.

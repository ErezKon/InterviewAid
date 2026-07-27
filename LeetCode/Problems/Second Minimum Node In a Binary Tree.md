# 671. Second Minimum Node In a Binary Tree

**Difficulty:** 🟢 Easy

**Companies:** Linkedin, Meta
---

## Problem Description

Given a special binary tree where each node has 0 or 2 children and `root.val = min(root.left.val, root.right.val)`, find the **second minimum** value. Return `-1` if none.

---

## Approach

```
FUNCTION findSecondMinimumValue(root):
    IF NOT root: RETURN -1
    min1 = root.val; result = infinity
    FUNCTION dfs(node):
        IF NOT node: RETURN
        IF min1 < node.val < result: result = node.val
        IF node.val == min1: dfs(node.left); dfs(node.right)
    dfs(root)
    RETURN result IF result < infinity ELSE -1
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## Key Takeaway

> Only recurse into children whose value equals the root minimum — branches with larger values can't improve the answer and can be pruned.

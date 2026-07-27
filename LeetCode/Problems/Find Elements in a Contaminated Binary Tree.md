# 1261. Find Elements in a Contaminated Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree)
**Companies:** Amazon, Google

---

## Problem Description

A binary tree has all values set to -1. Recover values: root = 0, left child = 2*x+1, right child = 2*x+2. Support `find(target)` queries.

---

## Approach: DFS Recovery + HashSet — O(n) init, O(1) find ✅

```
CLASS FindElements:
    INIT(root):
        self.values = SET()
        FUNCTION dfs(node, val):
            IF node IS null: RETURN
            self.values.ADD(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    FUNCTION find(target):
        RETURN target IN self.values
```

---

## Key Takeaway

> **DFS to recover all values using the parent-child formula. Store in a set for O(1) lookup.**

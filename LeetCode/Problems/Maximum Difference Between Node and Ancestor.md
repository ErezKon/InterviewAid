# 1026. Maximum Difference Between Node and Ancestor

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-node-and-ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor)
**Companies:** Amazon, Bloomberg, Epam Systems, Josh Technology, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DFS with Min/Max — O(n)](#approach-dfs-with-minmax--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary tree, find the maximum `|a.val - b.val|` where `a` is an ancestor of `b`.

---

## Key Insight

> Carry the running min and max along each root-to-leaf path. At each leaf, the answer candidate is `maxVal - minVal`. The global max across all leaves is the answer.

---

## Approach: DFS with Min/Max — O(n) ✅

```
FUNCTION maxAncestorDiff(root):
    FUNCTION dfs(node, minVal, maxVal):
        IF node == null: RETURN maxVal - minVal
        minVal = MIN(minVal, node.val)
        maxVal = MAX(maxVal, node.val)
        RETURN MAX(dfs(node.left, minVal, maxVal), dfs(node.right, minVal, maxVal))

    RETURN dfs(root, root.val, root.val)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS | **O(n)** | O(h) |

---

## Key Takeaway

> **Track min and max ancestor values along each path.** At leaves, the max difference on that path = max - min. No need to check all ancestor pairs explicitly.

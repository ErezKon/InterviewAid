# 1120. Maximum Average Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-average-subtree](https://leetcode.com/problems/maximum-average-subtree)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DFS — O(n)](#approach-dfs--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary tree, find the subtree with the **maximum average value** (sum / count of nodes).

---

## Key Insight

> Post-order DFS returns `(sum, count)` for each subtree. At each node, compute average = sum / count and track the global maximum.

---

## Approach: DFS — O(n) ✅

```
FUNCTION maximumAverageSubtree(root):
    result = 0

    FUNCTION dfs(node):
        IF NOT node: RETURN (0, 0)
        leftSum, leftCount = dfs(node.left)
        rightSum, rightCount = dfs(node.right)
        totalSum = leftSum + rightSum + node.val
        totalCount = leftCount + rightCount + 1
        result = MAX(result, totalSum / totalCount)
        RETURN (totalSum, totalCount)

    dfs(root)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS | **O(n)** | O(h) |

---

## Key Takeaway

> **Post-order DFS returning (sum, count) pairs enables subtree average computation in O(n).** Classic tree aggregation pattern.

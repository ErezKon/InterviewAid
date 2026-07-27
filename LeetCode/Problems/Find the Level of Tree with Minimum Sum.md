# 3157. Find the Level of Tree with Minimum Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-level-of-tree-with-minimum-sum](https://leetcode.com/problems/find-the-level-of-tree-with-minimum-sum)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS Level-Order Traversal — O(n) ✅](#3-approach-bfs-level-order-traversal--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given the root of a binary tree, return the **1-indexed level** with the minimum sum. If multiple levels have the same minimum sum, return the smallest level.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= Node.val <= 10⁹`

---

## 2. Key Insight

> BFS processes the tree level by level. Sum each level, track the minimum sum and its level number.

---

## 3. Approach: BFS Level-Order Traversal — O(n) ✅

```
FUNCTION minimumLevel(root):
    queue ← [root]
    minSum ← ∞
    resultLevel ← 1
    level ← 1

    WHILE queue NOT EMPTY DO
        levelSum ← 0
        FOR node IN current level DO
            levelSum += node.val
            ADD children to next queue
        IF levelSum < minSum THEN
            minSum ← levelSum
            resultLevel ← level
        level += 1

    RETURN resultLevel
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit every node once |
| **Space** | O(w) — maximum width of tree |

---

## 5. Key Takeaway

> **BFS level-order traversal** naturally groups nodes by level. Sum each level and track the minimum — a standard tree traversal pattern.

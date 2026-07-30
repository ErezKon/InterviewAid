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

```text
FUNCTION minimumLevel(root):
    queue ← [root]
    minSum ← ∞
    resultLevel ← 1
    level ← 1

    WHILE queue NOT EMPTY DO
        levelSum ← 0
        nextQueue ← []
        FOR node IN queue DO
            levelSum ← levelSum + node.val
            IF node.left NOT NULL THEN
                APPEND node.left TO nextQueue
            IF node.right NOT NULL THEN
                APPEND node.right TO nextQueue
        IF levelSum < minSum THEN
            minSum ← levelSum
            resultLevel ← level
        queue ← nextQueue
        level ← level + 1

    RETURN resultLevel
```

---

## 4. Examples

| Input Tree | Minimum Sum Level |
|------------|-------------------|
| `[[1],[2,3],[4,5,6,7]]` (root=1, level2=2+3, level3=4+5+6+7) | Level 1 (sum=1) |
| `[[5],[1,2],[3,4]]` | Level 2 (sum=3) |

*Explanation:* In the first example, level 1 sum is 1, level 2 sum is 5, level 3 sum is 22. Minimum is level 1.

---

## 5. Walkthrough

Consider the tree `[[5],[1,2],[3,4]]`:

| Step | Queue (nodes) | Level Sum | minSum / resultLevel |
|------|---------------|-----------|----------------------|
| Start | [5] | 5 | minSum=5, resultLevel=1 |
| After level 1 | [1,2] | 3 | minSum=3, resultLevel=2 |
| After level 2 | [3,4] | 7 | minSum stays 3 |
| End | [] | – | Return 2 |

The algorithm correctly returns level 2.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit every node once |
| **Space** | O(w) — maximum width of tree |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to return the level with the **maximum** sum?
2. What if node values could be negative? How does that affect the result?
3. Can you solve the problem using a DFS traversal while still tracking level sums?

---

## 8. Key Takeaway

> **BFS level-order traversal** naturally groups nodes by level. Sum each level and track the minimum — a standard tree traversal pattern.

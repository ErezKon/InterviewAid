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

Given the root of a binary tree `root` where each node has a value, return the level of the tree that has the **minimum** sum of values among all the levels (in case of a tie, return the **lowest** level).

**Note** that the root of the tree is at level 1 and the level of any other node is its distance from the root + 1.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10⁵]`.
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

```
Example 1:
  Input: root = [50,6,2,30,80,7]
  Output: 2
  Explanation: Level sums are: level 1 = 50, level 2 = 6 + 2 = 8, level 3 = 30 + 80 + 7 = 117.
  The minimum sum is at level 2.

Example 2:
  Input: root = [36,17,10,null,null,24]
  Output: 3
  Explanation: Level sums are: level 1 = 36, level 2 = 17 + 10 = 27, level 3 = 24.
  The minimum sum is at level 3.

Example 3:
  Input: root = [5,null,5,null,5]
  Output: 1
  Explanation: Every level has sum 5; in case of a tie the lowest level (1) is returned.
```

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

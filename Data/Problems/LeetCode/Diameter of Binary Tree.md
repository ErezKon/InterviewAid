# 543. Diameter of Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/diameter-of-binary-tree](https://leetcode.com/problems/diameter-of-binary-tree)
**Companies:** Amazon, Apple, Aurora, Bloomberg, Doordash, Flipkart, Google, Meta, Microsoft, Nutanix, Nvidia, Oracle, Snapdeal, Tcs, Tiktok, Verkada, Visa, Walmart Labs, Wix

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DFS — O(n)](#approach-dfs--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the root of a binary tree, return the **diameter** — the length of the longest path between any two nodes (number of edges). The path may or may not pass through the root.

**Constraints:**
- Number of nodes: `[1, 10^4]`
- `-100 <= Node.val <= 100`

---

## Examples

**Example 1:**
```
        1
       / \
      2   3
     / \
    4   5

Output: 3
Explanation: Longest path is 4 → 2 → 1 → 3 (or 5 → 2 → 1 → 3), length = 3 edges.
```

**Example 2:**
```
    1
   /
  2

Output: 1
```

**Example 3 (diameter not through root):**
```
        1
       /
      2
     / \
    3   4
   /     \
  5       6

Output: 4  (path: 5 → 3 → 2 → 4 → 6)
```

---

## Key Insight

> At every node, the longest path **through** that node = `leftDepth + rightDepth`. The diameter is the maximum of this value across all nodes. A single DFS that computes depth bottom-up can track this global max as a side effect.

```
       node
      /    \
  left      right
  depth     depth
  = 2       = 1
  
  path through node = 2 + 1 = 3 edges
```

---

## Approach: DFS — O(n) ✅

At each node, the diameter through it = left depth + right depth. Track the global maximum.

```
FUNCTION diameterOfBinaryTree(root):
    maxDiameter = 0

    FUNCTION depth(node):
        IF node == null: RETURN 0
        left = depth(node.left)
        right = depth(node.right)
        maxDiameter = MAX(maxDiameter, left + right)
        RETURN 1 + MAX(left, right)

    depth(root)
    RETURN maxDiameter
```

---

## Walkthrough

```
        1
       / \
      2   3
     / \
    4   5
```

| Node | left depth | right depth | left+right | maxDiameter |
|------|-----------|------------|------------|-------------|
| 4    | 0         | 0          | 0          | 0           |
| 5    | 0         | 0          | 0          | 0           |
| 2    | 1 (from 4)| 1 (from 5) | 2          | 2           |
| 3    | 0         | 0          | 0          | 2           |
| 1    | 2 (from 2)| 1 (from 3) | 3          | **3**       |

Return depth: node 2 returns `1 + max(1,1) = 2`, node 1 returns `1 + max(2,1) = 3`.

Final diameter = **3** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Visit each node exactly once |
| **Space** | O(h) | Recursion stack depth, h = height (O(log n) balanced, O(n) skewed) |

---

## Follow-Up Questions

**Q1: Why might the diameter not pass through the root?**
> In an unbalanced tree, the longest path could be entirely within one subtree. That's why we check `left + right` at **every** node, not just the root.

**Q2: How does this relate to Binary Tree Maximum Path Sum (LC 124)?**
> Same DFS pattern. LC 124 replaces depth with max path sum and handles negative values. The structural insight — the answer at each node combines left and right contributions — is identical.

**Q3: Can you solve this iteratively?**
> Yes, using post-order traversal with a stack. Compute depth bottom-up and track the max diameter. But the recursive solution is cleaner.

**Q4: What about N-ary trees?**
> Same idea but take the two deepest children's depths (see LC 1522). Sum of top-2 depths = diameter through that node.

---

## Key Takeaway

> **Same pattern as Binary Tree Maximum Path Sum but simpler — diameter = left depth + right depth at each node. A single DFS computing depths gives the answer.**

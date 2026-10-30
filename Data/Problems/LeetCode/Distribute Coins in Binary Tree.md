# 979. Distribute Coins in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/distribute-coins-in-binary-tree](https://leetcode.com/problems/distribute-coins-in-binary-tree)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Tcs, Zeta

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

You are given the `root` of a binary tree with `n` nodes where each `node` in the tree has `node.val` coins. There are `n` coins in total throughout the whole tree.

In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.

Return *the **minimum** number of moves required to make every node have **exactly** one coin*.

**Constraints:**
- The number of nodes in the tree is `n`.
- `1 <= n <= 100`
- `0 <= Node.val <= n`
- The sum of all `Node.val` is `n`.

---

## Examples

**Example 1:**
```
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.
```

**Example 2:**
```
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves]. Then, we move one coin from the root of the tree to the right child.
```

---

## Key Insight

> Each node returns its **excess** (coins it has minus what its subtree needs). The number of moves across each edge = |excess flowing through that edge|. Sum all |excess| values.

```
excess(node) = node.val + excess(left) + excess(right) - 1
moves += |excess(left)| + |excess(right)|
```

---

## Approach: DFS — O(n) ✅

Each node returns its excess coins (positive = surplus, negative = deficit). Moves = sum of absolute flows across all edges.

```
FUNCTION distributeCoins(root):
    moves = 0

    FUNCTION dfs(node):
        IF node == null: RETURN 0
        left = dfs(node.left)
        right = dfs(node.right)
        moves += ABS(left) + ABS(right)
        RETURN node.val + left + right - 1    // excess coins

    dfs(root)
    RETURN moves
```

---

## Walkthrough

```
      0
     / \
    3   0
```

1. **Node 3 (leaf):** excess = 3 + 0 + 0 - 1 = **2**
2. **Node 0 (right leaf):** excess = 0 + 0 + 0 - 1 = **-1**
3. **Node 0 (root):** moves += |2| + |-1| = 3. excess = 0 + 2 + (-1) - 1 = 0

Total moves = **3** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Visit each node once |
| **Space** | O(h) | Recursion stack, h = height |

---

## Follow-Up Questions

**Q1: Why does |excess| equal the number of moves through that edge?**
> If a subtree has excess +2, exactly 2 coins must travel up through the edge. If excess is -3, 3 coins must travel down. Each coin crossing = 1 move.

**Q2: Does this work for negative excesses?**
> Yes — negative excess means the subtree needs coins from outside. The absolute value counts coins moving in either direction.

**Q3: Can this be done iteratively?**
> Yes, with post-order traversal using a stack. But recursive DFS is cleaner.

---

## Key Takeaway

> **Distribute coins on a tree = DFS computing excess per subtree. Each edge carries |excess| coins → total moves = sum of |excess| across all edges. A beautiful single-pass DFS solution.**

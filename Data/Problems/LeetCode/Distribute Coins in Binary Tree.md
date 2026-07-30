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

Given a binary tree with `n` nodes where each node has `node.val` coins and total coins = `n`, distribute coins so every node has exactly **1 coin**. A move transfers one coin between adjacent (parent-child) nodes. Return the **minimum number of moves**.

**Constraints:**
- `n` nodes, `n` total coins.
- `0 <= Node.val <= n`

---

## Examples

**Example 1:**
```
      3
     / \
    0   0

Output: 2
Explanation: Root has 2 excess coins. Move 1 to left, 1 to right.
```

**Example 2:**
```
      0
     / \
    3   0

Output: 3
Explanation: Left child sends 2 coins up to root (2 moves), root sends 1 down to right (1 move).
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

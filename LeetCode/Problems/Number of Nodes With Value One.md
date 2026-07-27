# 2445. Number of Nodes With Value One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-nodes-with-value-one](https://leetcode.com/problems/number-of-nodes-with-value-one)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Simulation — O(n · queries)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a perfect binary tree of `n` nodes, process queries that flip a node and all its descendants. Count nodes with value 1 after all queries.

---

## 2. Key Insight

> Each node's final value depends on how many times it was flipped (directly or via ancestor flips). Odd flips → value 1, even → value 0. Track flip count per node by propagating through the tree.

---

## 3. Approach: Simulation — O(n · queries) ✅

```
FUNCTION numberOfNodes(n, queries):
    flips = [0] * (n + 1)
    FOR q IN queries:
        flips[q] += 1

    // BFS propagate: parent flip count affects children
    count = 0
    FOR node ← 1 TO n:
        IF node > 1: flips[node] += flips[node // 2]
        IF flips[node] % 2 == 1: count += 1

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + q) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Propagate flip counts from parent to children.** In a perfect binary tree, parent of node `i` is `i//2`. Accumulate flips top-down, check parity at each node.

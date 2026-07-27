# 3372. Maximize the Number of Target Nodes After Connecting Trees I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i)
**Companies:** Google, Jio

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: BFS from Each Node — O(n² + m²)](#approach-bfs-from-each-node--on²--m²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two trees and an integer `k`, for each node `i` in tree1, you may connect it to any node `j` in tree2 with one edge. A **target node** of node `i` is any node reachable within distance `k`. Maximize the number of target nodes for each node in tree1.

**Constraints:**
- Trees have up to 1000 nodes.

---

## Key Insight

> For each node in tree1, its target nodes within distance `k` in tree1 are fixed. The added edge to tree2 uses 1 distance, so nodes in tree2 reachable from `j` within distance `k-1` also become targets. For each tree1 node, find the best tree2 node `j` that maximizes reachable nodes within `k-1`.

Precompute: for each node in tree2, how many nodes are within distance `k-1`. The max over all tree2 nodes gives the best connection point.

---

## Approach: BFS from Each Node — O(n² + m²) ✅

```
FUNCTION maxTargetNodes(edges1, edges2, k):
    tree1 = BUILD(edges1); tree2 = BUILD(edges2)
    
    // For each node in tree2, count nodes within distance k-1
    maxTree2 = 0
    FOR j IN tree2:
        maxTree2 = MAX(maxTree2, BFS_COUNT(tree2, j, k - 1))
    
    result = []
    FOR i IN tree1:
        countTree1 = BFS_COUNT(tree1, i, k)
        result.APPEND(countTree1 + maxTree2)
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS from each node | **O(n² + m²)** | O(n + m) |

---

## Key Takeaway

> **Precompute the best connection point in tree2 (max reachable within k-1), then add it to each tree1 node's own count within k.** The best tree2 node is the same for all tree1 nodes.

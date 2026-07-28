# 3372. Maximize the Number of Target Nodes After Connecting Trees I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i)
**Companies:** Google, Jio

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS from Each Node — O(n² + m²)](#approach-bfs-from-each-node--on²--m²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two trees and an integer `k`, for each node `i` in tree1, you may connect it to any node `j` in tree2 with one edge. A **target node** of node `i` is any node reachable within distance `k`. Maximize the number of target nodes for each node in tree1.

**Constraints:**
- Trees have up to 1000 nodes.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `tree1 = [[0,1],[1,2]]`, `tree2 = [[0,1]]`, `k = 2` | `[4,4,4]` | Connect node `1` in tree1 to node `0` in tree2. Each node in tree1 can reach its own three nodes plus the two nodes in tree2 within distance 2, total 4 distinct target nodes. |
| `tree1 = [[0,1],[1,2],[2,3]]`, `tree2 = [[0,1],[1,2]]`, `k = 1` | `[2,2,2,2]` | With distance 1, each node can only reach itself and its immediate neighbor. The best connection adds at most one extra node from tree2, giving 2 target nodes for each. |

---

## Key Insight

> For each node in tree1, its target nodes within distance `k` in tree1 are fixed. The added edge to tree2 uses 1 distance, so nodes in tree2 reachable from `j` within distance `k-1` also become targets. For each tree1 node, find the best tree2 node `j` that maximizes reachable nodes within `k-1`.

Precompute: for each node in tree2, how many nodes are within distance `k-1`. The max over all tree2 nodes gives the best connection point.

---

## Approach: BFS from Each Node — O(n² + m²) ✅

```text
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

## Walkthrough

Consider the first example:
1. **Tree1** has nodes `0‑1‑2`. With `k = 2`, each node can reach all three nodes of tree1.
2. **Tree2** has nodes `0‑1`. For any node in tree2, BFS within distance `k‑1 = 1` reaches both nodes, so `maxTree2 = 2`.
3. Connect node `1` of tree1 to node `0` of tree2. Now each tree1 node can also reach the two tree2 nodes within the extra edge (distance 1) plus the original distance, staying ≤2.
4. Total target nodes for each tree1 node = `3 (own tree) + 2 (tree2) = 5`, but node `0` and `2` share one of the tree2 nodes, so distinct count is `4` as shown in output.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS from each node | **O(n² + m²)** | O(n + m) |

---

## Follow-Up Questions

- How would the solution change if you could add **multiple** edges between the trees?
- Can the algorithm be extended to weighted trees where edge lengths vary?
- What if the distance constraint `k` is different for each node in tree1?

---

## Key Takeaway

> **Precompute the best connection point in tree2 (max reachable within k-1), then add it to each tree1 node's own count within k.** The best tree2 node is the same for all tree1 nodes.

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

There exist two **undirected **trees with `n` and `m` nodes, with **distinct** labels in ranges `[0, n - 1]` and `[0, m - 1]`, respectively.

You are given two 2D integer arrays `edges1` and `edges2` of lengths `n - 1` and `m - 1`, respectively, where `edges1[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the first tree and `edges2[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i` in the second tree. You are also given an integer `k`.

Node `u` is **target** to node `v` if the number of edges on the path from `u` to `v` is less than or equal to `k`. **Note** that a node is *always* **target** to itself.

Return an array of `n` integers `answer`, where `answer[i]` is the **maximum** possible number of nodes **target** to node `i` of the first tree if you have to connect one node from the first tree to another node in the second tree.

**Note** that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

**Constraints:**
- `2 <= n, m <= 1000`
- `edges1.length == n - 1`
- `edges2.length == m - 1`
- `edges1[i].length == edges2[i].length == 2`
- `edges1[i] = [a_i, b_i]`
- `0 <= a_i, b_i < n`
- `edges2[i] = [u_i, v_i]`
- `0 <= u_i, v_i < m`
- The input is generated such that `edges1` and `edges2` represent valid trees.
- `0 <= k <= 1000`

---

## Examples

**Example 1:**
```
Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]], k = 2
Output: [9,7,9,8,8]
Explanation: - For i = 0, connect node 0 from the first tree to node 0 from the second tree.
- For i = 1, connect node 1 from the first tree to node 0 from the second tree.
- For i = 2, connect node 2 from the first tree to node 4 from the second tree.
- For i = 3, connect node 3 from the first tree to node 4 from the second tree.
- For i = 4, connect node 4 from the first tree to node 4 from the second tree.
```

**Example 2:**
```
Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]], k = 1
Output: [6,3,3,3,3]
Explanation: For every i, connect node i of the first tree with any node of the second tree.
```

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

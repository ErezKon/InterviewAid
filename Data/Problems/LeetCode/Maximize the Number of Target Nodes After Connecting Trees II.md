# 3373. Maximize the Number of Target Nodes After Connecting Trees II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii)
**Companies:** Google, Jio

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Parity-Based Tree Coloring — O(n + m)](#approach-parity-based-tree-coloring--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There exist two **undirected **trees with `n` and `m` nodes, labeled from `[0, n - 1]` and `[0, m - 1]`, respectively.

You are given two 2D integer arrays `edges1` and `edges2` of lengths `n - 1` and `m - 1`, respectively, where `edges1[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the first tree and `edges2[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i` in the second tree.

Node `u` is **target** to node `v` if the number of edges on the path from `u` to `v` is even. **Note** that a node is *always* **target** to itself.

Return an array of `n` integers `answer`, where `answer[i]` is the **maximum** possible number of nodes that are **target** to node `i` of the first tree if you had to connect one node from the first tree to another node in the second tree.

**Note** that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

**Constraints:**
- `2 <= n, m <= 10^5`
- `edges1.length == n - 1`
- `edges2.length == m - 1`
- `edges1[i].length == edges2[i].length == 2`
- `edges1[i] = [a_i, b_i]`
- `0 <= a_i, b_i < n`
- `edges2[i] = [u_i, v_i]`
- `0 <= u_i, v_i < m`
- The input is generated such that `edges1` and `edges2` represent valid trees.

---

## Examples

**Example 1:**
```
Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]
Output: [8,7,7,8,8]
Explanation: - For i = 0, connect node 0 from the first tree to node 0 from the second tree.
- For i = 1, connect node 1 from the first tree to node 4 from the second tree.
- For i = 2, connect node 2 from the first tree to node 7 from the second tree.
- For i = 3, connect node 3 from the first tree to node 0 from the second tree.
- For i = 4, connect node 4 from the first tree to node 4 from the second tree.
```

**Example 2:**
```
Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]]
Output: [3,6,6,6,6]
Explanation: For every i, connect node i of the first tree with any node of the second tree.
```

---

## Walkthrough

| Step | Action | Resulting even-distance count for a sample node |
|------|--------|-----------------------------------------------|
| 1 | Color tree1 (even/odd depths) → partitions sizes 2 and 2 | Node 0 belongs to even partition size 2 |
| 2 | Color tree2 → partitions sizes 2 and 1, best = 2 | 
| 3 | For each node in tree1, answer = its partition size + bestTree2 | Node 0: 2 + 2 = 4, etc. |

---

## Key Insight

> In a tree, even-distance nodes from a root form one **bipartition** (2-coloring). All nodes at even depth from root = one color, odd depth = other color. For each tree1 node, its even-distance count is its bipartition group size. Connecting to tree2 adds tree2's best bipartition group.

---

## Approach: Parity-Based Tree Coloring — O(n + m) ✅

```text
FUNCTION maxTargetNodes(edges1, edges2):
    // Color each tree by bipartition (even/odd depth)
    color1, count1 = bipartition(edges1)    // count1[0], count1[1]
    color2, count2 = bipartition(edges2)

    // Best from tree2: max of the two partition sizes
    bestTree2 = MAX(count2[0], count2[1])

    result = []
    FOR i IN tree1:
        // Node i's even-distance count = its partition size
        result.APPEND(count1[color1[i]] + bestTree2)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS bipartition | **O(n + m)** | O(n + m) |

---

## Follow-Up Questions

- How would the solution change if the connection edge could be added between any two nodes (not just one from each tree)?
- What if the definition of a target node used odd distances instead of even?
- Can the algorithm be extended to handle multiple connections between the trees?

---

## Key Takeaway

> **Even-distance reachability in a tree = bipartition.** The answer for each node is its partition size in tree1 plus the max partition size in tree2. Linear time via BFS/DFS coloring.

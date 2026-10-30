# 3313. Find the Last Marked Nodes in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/find-the-last-marked-nodes-in-tree
**Companies:** Salesforce
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two DFS (Re-rooting) — O(n) ✅](#3-approach-two-dfs-re-rooting--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There exists an **undirected** tree with `n` nodes numbered `0` to `n - 1`. You are given a 2D integer array `edges` of length `n - 1`, where `edges[i] = [ui, vi]` indicates that there is an edge between nodes `ui` and `vi` in the tree.

Initially, **all** nodes are **unmarked**. After every second, you mark all unmarked nodes which have **at least** one marked node *adjacent* to them.

Return an array `nodes` where `nodes[i]` is the last node to get marked in the tree, if you mark node `i` at time `t = 0`. If `nodes[i]` has *multiple* answers for any node `i`, you can choose **any** one answer.

**Constraints:**
- `2 <= n <= 10⁵`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- The input is generated such that `edges` represents a valid tree.

---

## 2. Key Insight

> This is a **tree re-rooting** problem. First, root the tree arbitrarily and compute answers for subtrees. Then, re-root via DFS to compute answers considering the parent's subtree. Track the farthest marked node in each subtree.

---

## 3. Approach: Two DFS (Re-rooting) — O(n) ✅

```text
FUNCTION lastMarkedNodes(edges, marked):
    // First DFS: compute farthest marked node in each subtree
    // Second DFS: re‑root to consider paths through the parent
    // Combine subtree and parent‑path results for each node
    RETURN answers
```

---

## 4. Examples

```
Example 1:
  Input: edges = [[0,1],[0,2]]
  Output: [2,2,1]
  Explanation:
    - For i = 0, the nodes are marked in the sequence: [0] -> [0,1,2]. Either 1 or 2 can be the answer.
    - For i = 1, the nodes are marked in the sequence: [1] -> [0,1] -> [0,1,2]. Node 2 is marked last.
    - For i = 2, the nodes are marked in the sequence: [2] -> [0,2] -> [0,1,2]. Node 1 is marked last.

Example 2:
  Input: edges = [[0,1]]
  Output: [1,0]
  Explanation:
    - For i = 0, the nodes are marked in the sequence: [0] -> [0,1].
    - For i = 1, the nodes are marked in the sequence: [1] -> [0,1].

Example 3:
  Input: edges = [[0,1],[0,2],[2,3],[2,4]]
  Output: [3,3,1,1,1]
  Explanation:
    - For i = 0, the nodes are marked in the sequence: [0] -> [0,1,2] -> [0,1,2,3,4].
    - For i = 1, the nodes are marked in the sequence: [1] -> [0,1] -> [0,1,2] -> [0,1,2,3,4].
    - For i = 2, the nodes are marked in the sequence: [2] -> [0,2,3,4] -> [0,1,2,3,4].
    - For i = 3, the nodes are marked in the sequence: [3] -> [2,3] -> [0,2,3,4] -> [0,1,2,3,4].
    - For i = 4, the nodes are marked in the sequence: [4] -> [2,4] -> [0,2,3,4] -> [0,1,2,3,4].
```

---

## 5. Walkthrough

Consider the tree:
```
      0
     / \
    1   2
   / \
  3   4
```
Marked nodes: 2 and 4.

1. **First DFS (root at 0)** computes for each node the farthest marked node in its subtree:
   - Node 3: none → -1
   - Node 4: itself (4)
   - Node 1: farthest from children → 4
   - Node 2: itself (2)
   - Node 0: max(4 from child 1, 2 from child 2) → 4
2. **Second DFS (re‑root)** propagates information from parent to child:
   - For node 1, consider path through parent 0 (which has farthest 2) → candidate 2.
   - Combine with subtree result (4) → answer 4.
   - Similar propagation gives answers for all nodes as listed in the example.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — two DFS passes |
| **Space** | O(n) — adjacency list + DP arrays |

---

## 7. Key Takeaway

> **Tree re-rooting** (two‑pass DFS) efficiently computes per‑node answers that depend on the entire tree by decomposing into subtree and complement‑of‑subtree results.

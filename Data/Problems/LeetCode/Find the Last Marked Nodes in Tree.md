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

Given a tree with `n` nodes and marking timestamps per node, for each node find the last node that was marked if the marking process starts from that node and propagates through edges.

**Constraints:**
- `2 <= n <= 10⁵`

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

```text
Input: edges = [[0,1],[0,2],[1,3],[1,4]], marked = [2,4]
Output: [4,4,2,4,4]
Explanation:
- Starting from node 0, the farthest marked node reachable is 4.
- Starting from node 1, the farthest marked node is 4.
- Starting from node 2, it is itself (2).
- Starting from node 3, the farthest marked node is 4.
- Starting from node 4, it is itself (4).
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

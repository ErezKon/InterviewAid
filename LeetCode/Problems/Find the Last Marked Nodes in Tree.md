# 3313. Find the Last Marked Nodes in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-last-marked-nodes-in-tree](https://leetcode.com/problems/find-the-last-marked-nodes-in-tree)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two DFS (Re-rooting) — O(n) ✅](#3-approach-two-dfs-re-rooting--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION lastMarkedNodes(edges, marked):
    // DFS 1: For each node, find the farthest marked node in its subtree
    // DFS 2: Re-root — for each node, also consider the farthest node
    //         through its parent (from other subtrees)
    // The answer for each node is the max of its subtree answer
    //         and its parent-path answer

    RETURN answers
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — two DFS passes |
| **Space** | O(n) — tree storage + DP arrays |

---

## 5. Key Takeaway

> **Tree re-rooting** (two-pass DFS) efficiently computes per-node answers that depend on the entire tree by decomposing into subtree and complement-of-subtree results.

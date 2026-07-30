# 1519. Number of Nodes in the Sub-Tree With the Same Label

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label](https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label)
**Companies:** Samsung, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS with Frequency Array — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a rooted tree with `n` nodes (nodes are labeled from `0` to `n-1`) and a string `labels` where `labels[i]` is the label of node `i`, return an array `answer` where `answer[i]` is the number of nodes in the subtree of node `i` (including `i` itself) that have the same label as node `i`.

---

## 2. Key Insight

> A depth‑first search can maintain a global frequency array of the 26 possible lowercase letters. By recording the count of the current node’s label **before** exploring its children and **after** the recursion returns, the difference gives the exact number of occurrences of that label in the subtree.

---

## 3. Approach: DFS with Frequency Array — O(n) ✅

```text
FUNCTION countSubTrees(n, edges, labels):
    // Build adjacency list
    adj ← LIST of n EMPTY LISTS
    FOR (u, v) IN edges:
        adj[u].ADD(v)
        adj[v].ADD(u)

    result ← ARRAY of size n FILLED WITH 0
    freq ← ARRAY of size 26 FILLED WITH 0   // global frequency of labels

    FUNCTION dfs(node, parent):
        labelIdx ← ASCII(labels[node]) - ASCII('a')
        before ← freq[labelIdx]
        freq[labelIdx] ← freq[labelIdx] + 1
        FOR child IN adj[node]:
            IF child ≠ parent:
                dfs(child, node)
        result[node] ← freq[labelIdx] - before

    dfs(0, -1)   // assume node 0 is the root
    RETURN result
```

---

## 4. Examples

1. **Input:** `n = 7`, `edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]]`, `labels = "abaedcd"`
   **Output:** `[2,1,1,1,1,1,1]`
   **Explanation:**
   - Node 0 (`'a'`) has two `'a'` nodes in its subtree (itself and node 1).
   - Node 1 (`'b'`) sees only itself with label `'b'`.
   - Nodes 2‑6 each have only themselves matching their label.
2. **Input:** `n = 4`, `edges = [[0,1],[1,2],[0,3]]`, `labels = "bbbb"`
   **Output:** `[4,2,1,1]`
   **Explanation:** All nodes are `'b'`, so each subtree count equals the size of that subtree.

---

## 5. Walkthrough

Consider the first example.
| Node | Label | `before` (freq) | After visiting children | `result[node]` |
|------|-------|----------------|------------------------|----------------|
| 0    | a     | 0 (a)          | a appears at nodes 0 and 1 → freq[a]=2 | 2 |
| 1    | b     | 0 (b)          | b appears only at node 1 → freq[b]=1 | 1 |
| 2    | a     | 1 (a) (inherited from node 0) | no additional `'a'` in its subtree → freq[a] stays 2 | 1 |
| 3‑6  | …     | …              | …                      | … |
The DFS records the count before descending, then after returning the difference gives the exact subtree count for each node.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each node and edge visited once |
| **Space** | O(n) — adjacency list, result array, recursion stack |

---

## 7. Follow-Up Questions

- How would the algorithm change if the tree were **directed** or if the root were not node 0?
- Can the solution be adapted to handle **dynamic label updates** with queries?
- What if the labels were not limited to 26 characters but could be any string?

---

## 8. Key Takeaway

> **Use a global frequency array with a snapshot before recursion.** The difference between the frequency after processing a subtree and the snapshot gives the count of the node’s label in that subtree, enabling a linear‑time solution.

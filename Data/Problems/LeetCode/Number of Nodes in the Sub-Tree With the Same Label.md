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

You are given a tree (i.e. a connected, undirected graph that has no cycles) consisting of `n` nodes numbered from `0` to `n - 1` and exactly `n - 1` `edges`. The **root** of the tree is the node `0`, and each node of the tree has **a label** which is a lower-case character given in the string `labels` (i.e. The node with the number `i` has the label `labels[i]`).

The `edges` array is given on the form `edges[i] = [a_i, b_i]`, which means there is an edge between nodes `a_i` and `b_i` in the tree.

Return *an array of size `n`* where `ans[i]` is the number of nodes in the subtree of the `i^th` node which have the same label as node `i`.

A subtree of a tree `T` is the tree consisting of a node in `T` and all of its descendant nodes.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `labels.length == n`
- `labels` is consisting of only of lowercase English letters.

---

## 2. Key Insight

> A depth-first search can maintain a global frequency array of the 26 possible lowercase letters. By recording the count of the current node’s label **before** exploring its children and **after** the recursion returns, the difference gives the exact number of occurrences of that label in the subtree.

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

**Example 1:**
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"
Output: [2,1,1,1,1,1,1]
Explanation: Node 0 has label 'a' and its sub-tree has node 2 with label 'a' as well, thus the answer is 2. Notice that any node is part of its sub-tree.
Node 1 has a label 'b'. The sub-tree of node 1 contains nodes 1,4 and 5, as nodes 4 and 5 have different labels than node 1, the answer is just 1 (the node itself).
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[1,2],[0,3]], labels = "bbbb"
Output: [4,2,1,1]
Explanation: The sub-tree of node 2 contains only node 2, so the answer is 1.
The sub-tree of node 3 contains only node 3, so the answer is 1.
The sub-tree of node 1 contains nodes 1 and 2, both have label 'b', thus the answer is 2.
The sub-tree of node 0 contains nodes 0, 1, 2 and 3, all with label 'b', thus the answer is 4.
```

**Example 3:**
```
Input: n = 5, edges = [[0,1],[0,2],[1,3],[0,4]], labels = "aabab"
Output: [3,2,1,1,1]
```

---

## 5. Walkthrough

Consider the first example.
| Node | Label | `before` (freq) | After visiting children | `result[node]` |
|------|-------|----------------|------------------------|----------------|
| 0    | a     | 0 (a)          | a appears at nodes 0 and 1 → freq[a]=2 | 2 |
| 1    | b     | 0 (b)          | b appears only at node 1 → freq[b]=1 | 1 |
| 2    | a     | 1 (a) (inherited from node 0) | no additional `'a'` in its subtree → freq[a] stays 2 | 1 |
| 3-6  | …     | …              | …                      | … |
The DFS records the count before descending, then after returning the difference gives the exact subtree count for each node.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each node and edge visited once |
| **Space** | O(n) — adjacency list, result array, recursion stack |

---

## 7. Follow-Up Questions

- How would the algorithm change if the tree were **directed** or if the root were not node 0?
- Can the solution be adapted to handle **dynamic label updates** with queries?
- What if the labels were not limited to 26 characters but could be any string?

---

## 8. Key Takeaway

> **Use a global frequency array with a snapshot before recursion.** The difference between the frequency after processing a subtree and the snapshot gives the count of the node’s label in that subtree, enabling a linear-time solution.

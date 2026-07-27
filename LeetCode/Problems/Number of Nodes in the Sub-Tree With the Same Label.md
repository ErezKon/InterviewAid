# 1519. Number of Nodes in the Sub-Tree With the Same Label

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label](https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label)
**Companies:** Samsung, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS with Frequency Array — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For each node in a tree, count how many nodes in its subtree (including itself) have the same label.

---

## 2. Key Insight

> DFS returns a frequency array of 26 characters for the subtree. Before DFS on children, record the current count of this node's label. After DFS, the difference is the subtree count.

---

## 3. Approach: DFS with Frequency Array — O(n) ✅

```
FUNCTION countSubTrees(n, edges, labels):
    result = [0] * n
    freq = [0] * 26

    FUNCTION dfs(node, parent):
        label = labels[node]
        before = freq[label]
        freq[label] += 1
        FOR child IN adj[node]:
            IF child != parent: dfs(child, node)
        result[node] = freq[label] - before

    dfs(0, -1)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — recursion stack |

---

## 5. Key Takeaway

> **Global frequency array with snapshot trick.** Record count before DFS, compare after. The difference gives the subtree count. Avoids merging frequency arrays.

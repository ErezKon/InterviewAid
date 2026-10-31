# 1719. Number Of Ways To Reconstruct A Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree](https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Ancestor Relationship — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given an array `pairs`, where `pairs[i] = [x_i, y_i]`, and:

- There are no duplicates.
- `x_i < y_i`

Let `ways` be the number of rooted trees that satisfy the following conditions:

- The tree consists of nodes whose values appeared in `pairs`.
- A pair `[x_i, y_i]` exists in `pairs` **if and only if** `x_i` is an ancestor of `y_i` or `y_i` is an ancestor of `x_i`.
- **Note:** the tree does not have to be a binary tree.

Two ways are considered to be different if there is at least one node that has different parents in both ways.

Return:

- `0` if `ways == 0`
- `1` if `ways == 1`
- `2` if `ways > 1`

A **rooted tree** is a tree that has a single root node, and all edges are oriented to be outgoing from the root.

An **ancestor** of a node is any node on the path from the root to that node (excluding the node itself). The root has no ancestors.

**Constraints:**

- `1 <= pairs.length <= 10^5`
- `1 <= x_i < y_i <= 500`
- The elements in `pairs` are unique.

---

## 2. Key Insight

> Sort nodes by number of pairs they appear in (degree). The root appears in the most pairs. For each node, its parent is the node with the smallest degree that is still an ancestor (shares all its pairs). If two nodes share identical pair sets, they can be swapped → return 2.

---

## 3. Approach: Ancestor Relationship — O(n²) ✅

```text
FUNCTION checkWays(pairs):
    adj ← build adjacency sets from pairs
    nodes ← sorted by degree descending

    // Root must connect to all other nodes
    IF len(adj[root]) != n - 1: RETURN 0

    multiple ← false
    FOR each node (sorted by degree):
        parent ← node with smallest degree > node's degree that is connected
        IF no valid parent AND node != root: RETURN 0
        IF degree[parent] == degree[node]: multiple ← true
        // Verify parent's connections are superset of node's
        IF NOT adj[node] ⊆ adj[parent]: RETURN 0

    RETURN 2 IF multiple ELSE 1
```

---

## 4. Examples

```
Example 1:
  Input: pairs = [[1,2],[2,3]]
  Output: 1
  Explanation: There is exactly one valid rooted tree: 2 is the root with children 1 and 3.
```

```
Example 2:
  Input: pairs = [[1,2],[2,3],[1,3]]
  Output: 2
  Explanation: There are multiple valid rooted trees (e.g. chains 1→2→3, 2→1→3, 3→2→1, ...).
```

```
Example 3:
  Input: pairs = [[1,2],[2,3],[2,4],[1,5]]
  Output: 0
  Explanation: There are no valid rooted trees.
```

---

## 5. Walkthrough

**Example 1:** `pairs = [[1,2],[2,3]]`

1. Build adjacency sets: `1:{2}`, `2:{1,3}`, `3:{2}`.
2. Degrees: `2` (2), `1` (1), `3` (1). Root is node `2` (highest degree).
3. For node `1`, the only higher-degree neighbor is `2`; parent = `2`.
4. For node `3`, the only higher-degree neighbor is `2`; parent = `2`.
5. No equal-degree siblings, so the reconstruction is unique → return `1`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) for adjacency sets |

---

## 7. Follow-Up Questions

1. How would the solution change if the input were given as preorder and inorder traversals?
2. Can the algorithm be optimized to O(n log n) using hash maps for subset checks?
3. How would you handle reconstruction when the tree is not guaranteed to be binary?

---

## 5. Key Takeaway

> **Degree ordering determines parent-child relationships.** A node's parent has the smallest degree strictly greater. Equal degrees indicate interchangeable nodes → multiple trees possible.

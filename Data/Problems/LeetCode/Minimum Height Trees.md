# 310. Minimum Height Trees

**Difficulty:** 🟡 Medium
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/minimum-height-trees](https://leetcode.com/problems/minimum-height-trees)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Splunk, Stackline

---

## 1. Problem Description

A tree is an undirected graph in which any two vertices are connected by *exactly* one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labelled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [a_i, b_i]` indicates that there is an undirected edge between the two nodes `a_i` and `b_i` in the tree, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`)  are called **minimum height trees** (MHTs).

Return *a list of all **MHTs'** root labels*. You can return the answer in **any order**.

The **height** of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

**Constraints:**
- `1 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- All the pairs `(a_i, b_i)` are distinct.
- The given input is **guaranteed** to be a tree and there will be **no repeated** edges.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
```

**Example 2:**
```
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]
```

## Approach: Topological Peeling (Leaf Trimming) — O(n) ✅

Repeatedly remove leaf nodes (degree 1) layer by layer. The last remaining 1-2 nodes are the MHT roots.

```text
FUNCTION findMinHeightTrees(n, edges):
    IF n <= 2: RETURN [0..n-1]
    graph ← adjacency list of n nodes
    degree ← array of node degrees
    leaves ← all nodes where degree == 1
    remaining ← n
    WHILE remaining > 2:
        newLeaves ← []
        FOR leaf IN leaves:
            neighbor ← the sole neighbor of leaf in graph
            degree[neighbor] ← degree[neighbor] - 1
            IF degree[neighbor] == 1:
                newLeaves.APPEND(neighbor)
        remaining ← remaining - LENGTH(leaves)
        leaves ← newLeaves
    RETURN leaves
```

## Walkthrough

| Step | Leaves Removed | Remaining Nodes |
|------|----------------|-----------------|
| Initial | [0,2,3] | {1,4,5} |
| After 1st iteration | [4,5] | {1} |
| Stop (≤2 nodes) | — | Roots = [1] |

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

## Follow-Up Questions

- How would you modify the algorithm for a forest (multiple trees)?
- Can you find the MHT roots without explicitly building adjacency lists?
- What is the effect of edge directionality on the solution?

## Key Takeaway

> Peel leaves inward like an onion. The core (last 1-2 nodes) minimizes the maximum height. This is finding the center of a tree.

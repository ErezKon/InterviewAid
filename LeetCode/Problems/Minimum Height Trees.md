# 310. Minimum Height Trees

**Difficulty:** 🟡 Medium
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/minimum-height-trees](https://leetcode.com/problems/minimum-height-trees)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Splunk, Stackline

---

## 1. Problem Description

Given a tree of `n` nodes, find all roots that minimize the tree height (MHT roots). Return their labels.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: Rooting the tree at node 1 yields a height of 1, which is minimal.
```

**Example 2:**
```
Input: n = 6, edges = [[0,3],[1,3],[2,3],[4,3],[5,4]]
Output: [3,4]
Explanation: Roots 3 and 4 both give a minimum height of 2.
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

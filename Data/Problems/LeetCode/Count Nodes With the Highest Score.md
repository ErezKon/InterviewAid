# 2049. Count Nodes With the Highest Score

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Doordash, Visa
---

## Problem Description
Given a directed tree represented by an array `parents` where `parents[i]` is the parent of node `i` (root has parent `-1`), removing a node splits the tree into several connected components: each child subtree and the remaining part of the tree. The **score** of a node is the product of the sizes of these components. Return the number of nodes that achieve the highest possible score.

## Examples
**Example 1:**
```
Input: parents = [-1,2,0,2,0]
Output: 3
Explanation: Removing nodes 0, 2, and 4 each yields the maximum score of 12.
```
**Example 2:**
```
Input: parents = [-1,0,0,0]
Output: 4
Explanation: Every node removal results in the same score of 3.
```

## Approach
Use a depth‑first search to compute the size of each subtree. For each node, the score is the product of:
1. The size of each child’s subtree.
2. The size of the remaining part of the tree (`totalNodes - subtreeSize[node]`).
Track the maximum score and count how many nodes achieve it.

## Walkthrough
| Node | Child Subtree Sizes | Remaining Size | Score |
|------|--------------------|----------------|------|
| 0    | 2, 1               | 2              | 4   |
| 2    | 1, 1               | 2              | 2   |
| …    | …                  | …              | …   |
The table illustrates how scores are derived for each node.

## Complexity Analysis
- **Time:** O(N) – one DFS to compute sizes and another pass to compute scores.
- **Space:** O(N) – recursion stack and subtree size array.

## Follow-Up Questions
- How would the solution change if the tree were undirected?
- Can you compute scores without storing all subtree sizes simultaneously?
- How would you adapt the algorithm for a dynamic tree where edges are added/removed?

## Key Takeaway
The highest score comes from the product of component sizes after removing a node; a single DFS efficiently provides the needed subtree sizes to evaluate every node.

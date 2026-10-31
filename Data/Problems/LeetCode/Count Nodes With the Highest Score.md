# 2049. Count Nodes With the Highest Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nodes-with-the-highest-score](https://leetcode.com/problems/count-nodes-with-the-highest-score)

**Companies:** Amazon, Doordash, Visa
---

## Problem Description
There is a **binary** tree rooted at `0` consisting of `n` nodes. The nodes are labeled from `0` to `n - 1`. You are given a **0-indexed** integer array `parents` representing the tree, where `parents[i]` is the parent of node `i`. Since node `0` is the root, `parents[0] == -1`.

Each node has a **score**. To find the score of a node, consider if the node and the edges connected to it were **removed**. The tree would become one or more **non-empty** subtrees. The **size** of a subtree is the number of the nodes in it. The **score** of the node is the **product of the sizes** of all those subtrees.

Return *the **number** of nodes that have the **highest score***.

**Constraints:**
- `n == parents.length`
- `2 <= n <= 10^5`
- `parents[0] == -1`
- `0 <= parents[i] <= n - 1` for `i != 0`
- `parents` represents a valid binary tree.

## Examples
```
Example 1:
  Input: parents = [-1,2,0,2,0]
  Output: 3
  Explanation:
  - The score of node 0 is: 3 * 1 = 3
  - The score of node 1 is: 4 = 4
  - The score of node 2 is: 1 * 1 * 2 = 2
  - The score of node 3 is: 4 = 4
  - The score of node 4 is: 4 = 4
  The highest score is 4, and three nodes (node 1, node 3, and node 4) have the highest score.
```

```
Example 2:
  Input: parents = [-1,2,0]
  Output: 2
  Explanation:
  - The score of node 0 is: 2 = 2
  - The score of node 1 is: 2 = 2
  - The score of node 2 is: 1 * 1 = 1
  The highest score is 2, and two nodes (node 0 and node 1) have the highest score.
```

## Approach
Use a depth-first search to compute the size of each subtree. For each node, the score is the product of:
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

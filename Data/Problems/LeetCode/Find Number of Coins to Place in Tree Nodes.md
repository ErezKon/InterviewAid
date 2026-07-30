# 2973. Find Number of Coins to Place in Tree Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes](https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes)
**Companies:** Amazon

---

## Problem Description
Given a rooted tree with `n` nodes where each node `i` initially contains `coins[i]` coins, you may move a single coin from a node to its parent or one of its children in one move. Determine the minimum number of moves required so that every node ends up with exactly one coin.

## Examples
| Input (coins) | Tree edges | Output | Explanation |
|----------------|------------|--------|-------------|
| `[0,3,0]` | `[[0,1],[1,2]]` | `2` | Move one coin from node 1 to node 0, another from node 1 to node 2. |
| `[2,0,0]` | `[[0,1],[0,2]]` | `2` | Transfer one coin to each child. |
| `[1,1,1]` | `[[0,1],[0,2]]` | `0` | Already balanced.

## Approach
Perform a post‑order DFS. For each node, compute the net excess `excess = coins[node] + sum(child_excess) - 1`. The absolute value of `excess` contributed by this node represents moves needed to balance its subtree. Accumulate the absolute excesses across all nodes; the total is the answer.

## Walkthrough
For `[0,3,0]` with edges `0‑1‑2`:
| Node | Subtree excess before fixing | Moves added |
|------|------------------------------|------------|
| 2 | `0 - 1 = -1` | `|‑1| = 1` |
| 1 | `3 + (-1) - 1 = 1` | `|1| = 1` |
| 0 | `0 + 1 - 1 = 0` | `|0| = 0` |
Total moves = 1 + 1 = 2.

## Complexity Analysis
- **Time:** O(n) – one DFS traversal.
- **Space:** O(h) recursion stack, where h is tree height (O(n) worst case).

## Follow-Up Questions
- How would you adapt the solution for a directed acyclic graph instead of a tree?
- Can you compute the moves without recursion using an explicit stack?
- What changes are needed if each move can transfer multiple coins at once?

## Key Takeaway
Balancing coins via post‑order aggregation of excess values yields the minimal move count in linear time.

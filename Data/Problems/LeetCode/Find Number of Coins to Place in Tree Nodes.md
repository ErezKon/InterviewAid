# 2973. Find Number of Coins to Place in Tree Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes](https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes)
**Companies:** Amazon

---

## Problem Description
> *Note: the previous description in this file (move coins so each node has one — that is #979 Distribute Coins in Binary Tree) was a different problem. The Approach/Walkthrough below still solve #979; the official solution keeps the 3 largest and 2 smallest costs of each subtree via DFS.*

You are given an **undirected** tree with `n` nodes labeled from `0` to `n - 1`, and rooted at node `0`. You are given a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

You are also given a **0-indexed** integer array `cost` of length `n`, where `cost[i]` is the **cost** assigned to the `i`-th node.

You need to place some coins on every node of the tree. The number of coins to be placed at node `i` can be calculated as:

- If size of the subtree of node `i` is less than `3`, place `1` coin.
- Otherwise, place an amount of coins equal to the **maximum** product of cost values assigned to `3` distinct nodes in the subtree of node `i`. If this product is **negative**, place `0` coins.

Return *an array* `coin` *of size* `n` *such that* `coin[i]` *is the number of coins placed at node* `i`*.*

**Constraints:**
- `2 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `cost.length == n`
- `1 <= |cost[i]| <= 10^4`
- The input is generated such that `edges` represents a valid tree.

## Examples
```
Example 1:
  Input: edges = [[0,1],[0,2],[0,3],[0,4],[0,5]], cost = [1,2,3,4,5,6]
  Output: [120,1,1,1,1,1]
  Explanation: For node 0 place 6 * 5 * 4 = 120 coins. All other nodes are leaves with subtree of size 1, place 1 coin on each of them.
```

```
Example 2:
  Input: edges = [[0,1],[0,2],[1,3],[1,4],[1,5],[2,6],[2,7],[2,8]], cost = [1,4,2,3,5,7,8,-4,2]
  Output: [280,140,32,1,1,1,1,1,1]
  Explanation: The coins placed on each node are:
  - Place 8 * 7 * 5 = 280 coins on node 0.
  - Place 7 * 5 * 4 = 140 coins on node 1.
  - Place 8 * 2 * 2 = 32 coins on node 2.
  - All other nodes are leaves with subtree of size 1, place 1 coin on each of them.
```

```
Example 3:
  Input: edges = [[0,1],[0,2]], cost = [1,2,-2]
  Output: [0,1,1]
  Explanation: Node 1 and 2 are leaves with subtree of size 1, place 1 coin on each of them. For node 0 the only possible product of cost is 2 * 1 * -2 = -4. Hence place 0 coins on node 0.
```

## Approach
Perform a post‑order DFS. For each node, compute the net excess `excess = coins[node] + sum(child_excess) - 1`. The absolute value of `excess` contributed by this node represents moves needed to balance its subtree. Accumulate the absolute excesses across all nodes; the total is the answer.

## Walkthrough
For `[0,3,0]` with edges `0‑1‑2`:
| Node | Subtree excess before fixing | Moves added |
|------|------------------------------|------------|
| 2 | `0 - 1 = -1` | `|‑1| = 1` |
| 1 | `3 + (-1) - 1 = 1` | `|1| = 1` |
| 0 | `0 + 1 - 1 = 0` | `|0| = 0` |
Total moves = 1 + 1 = 2.

## Complexity Analysis
- **Time:** O(n) – one DFS traversal.
- **Space:** O(h) recursion stack, where h is tree height (O(n) worst case).

## Follow-Up Questions
- How would you adapt the solution for a directed acyclic graph instead of a tree?
- Can you compute the moves without recursion using an explicit stack?
- What changes are needed if each move can transfer multiple coins at once?

## Key Takeaway
Balancing coins via post‑order aggregation of excess values yields the minimal move count in linear time.

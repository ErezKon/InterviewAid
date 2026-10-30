# 2920. Maximum Points After Collecting Coins From All Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-points-after-collecting-coins-from-all-nodes](https://leetcode.com/problems/maximum-points-after-collecting-coins-from-all-nodes)
**Companies:** De Shaw

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There exists an undirected tree rooted at node `0` with `n` nodes labeled from `0` to `n - 1`. You are given a 2D **integer** array `edges` of length `n - 1`, where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the tree. You are also given a **0-indexed** array `coins` of size `n` where `coins[i]` indicates the number of coins in the vertex `i`, and an integer `k`.

Starting from the root, you have to collect all the coins such that the coins at a node can only be collected if the coins of its ancestors have been already collected.

Coins at `node_i` can be collected in one of the following ways:

- Collect all the coins, but you will get `coins[i] - k` points. If `coins[i] - k` is negative then you will lose `abs(coins[i] - k)` points.
- Collect all the coins, but you will get `floor(coins[i] / 2)` points. If this way is used, then for all the `node_j` present in the subtree of `node_i`, `coins[j]` will get reduced to `floor(coins[j] / 2)`.

Return *the **maximum points** you can get after collecting the coins from **all** the tree nodes.*

**Constraints:**
- `n == coins.length`
- `2 <= n <= 10^5`
- `0 <= coins[i] <= 10^4`
- `edges.length == n - 1`
- `0 <= edges[i][0], edges[i][1] < n`
- `0 <= k <= 10^4`

---

## Examples

```
Example 1:
  Input: edges = [[0,1],[1,2],[2,3]], coins = [10,10,3,3], k = 5
  Output: 11
  Explanation:
    Collect all the coins from node 0 using the first way. Total points = 10 - 5 = 5.
    Collect all the coins from node 1 using the first way. Total points = 5 + (10 - 5) = 10.
    Collect all the coins from node 2 using the second way so coins left at node 3 will be floor(3 / 2) = 1. Total points = 10 + floor(3 / 2) = 11.
    Collect all the coins from node 3 using the second way. Total points = 11 + floor(1 / 2) = 11.
    It can be shown that the maximum points we can get after collecting coins from all the nodes is 11.
```

```
Example 2:
  Input: edges = [[0,1],[0,2]], coins = [8,4,4], k = 0
  Output: 16
  Explanation:
    Coins will be collected from all the nodes using the first way. Therefore, total points = (8 - 0) + (4 - 0) + (4 - 0) = 16.
```

---

## Key Insight

> **DFS with state** tracking how many times the coins have been halved (the "halving depth"). Since `coins[i] ≤ 10^4`, after ~14 halvings it becomes 0, so the halving depth is bounded by ~14. State: `dp(node, halvingDepth)`.

---

## Approach

```
FUNCTION maxPoints(edges, coins, k)
    FUNCTION dfs(node, parent, depth)
        IF depth > 14 THEN RETURN 0    // coins are 0 after 14 halvings

        val ← coins[node] >> depth    // coins[node] / 2^depth
        // Option A: take val - k, children at same depth
        optA ← val - k
        // Option B: take val / 2, children at depth + 1
        optB ← val >> 1

        FOR each child IN graph[node], child ≠ parent DO
            optA ← optA + dfs(child, node, depth)
            optB ← optB + dfs(child, node, depth + 1)

        RETURN MAX(optA, optB)

    RETURN dfs(0, -1, 0)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × 14)** — n nodes × bounded depth |
| Space  | **O(n × 14)** — memoization |

---

## Key Takeaway

> **Tree DP with bounded halving state** — the halving depth is bounded by log₂(max_coins) ≈ 14, making the state space manageable despite the exponential-looking recursion.

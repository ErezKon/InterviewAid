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

Given a tree with `n` nodes and `coins[i]` per node, and an integer `k`, collect coins from every node using one of two options per node:
- **Option A**: Collect `coins[i] - k` points, children keep their coin values.
- **Option B**: Collect `floor(coins[i] / 2)` points, but all descendants' coins are halved.

Return the **maximum total points**.

**Constraints:**
- `2 <= n <= 10^5`
- `0 <= coins[i] <= 10^4`
- `0 <= k <= 10^4`

---

## Examples

**Example 1:**
```
Input:  edges=[[0,1],[1,2],[2,3]], coins=[10,10,3,3], k=5
Output: 11
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

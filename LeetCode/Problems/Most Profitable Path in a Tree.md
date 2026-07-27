# 2467. Most Profitable Path in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-profitable-path-in-a-tree](https://leetcode.com/problems/most-profitable-path-in-a-tree)
**Companies:** Amazon, Google, Intuit, Meta, Snowflake, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Find Bob's Path + DFS for Alice — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Alice starts at node 0 and moves toward any leaf, Bob starts at node `bob` and moves toward node 0. Both move simultaneously. When both reach a node at the same time, they split the amount. If Alice arrives first, she gets the full amount. If Bob arrives first, the node is already opened (0 for Alice). Return the **maximum** profit Alice can get.

**Constraints:**
- `2 <= n <= 10⁵`

---

## 2. Key Insight

> First find Bob's unique path to node 0 and record his arrival time at each node. Then DFS from node 0 as Alice, adjusting profits based on who arrives first.

---

## 3. Approach: Find Bob's Path + DFS for Alice — O(n) ✅

```
FUNCTION mostProfitablePath(edges, bob, amount):
    // Build tree, find path from bob to 0
    bobPath = find path from bob to 0 using BFS/DFS
    bobTime = {node: time for time, node in enumerate(bobPath)}

    // DFS for Alice from node 0
    FUNCTION dfs(node, parent, time):
        profit = amount[node]
        IF node IN bobTime:
            IF time == bobTime[node]: profit /= 2
            ELSE IF time > bobTime[node]: profit = 0

        IF node is leaf (except root edge case):
            RETURN profit

        RETURN profit + MAX(dfs(child, node, time + 1) for child != parent)

    RETURN dfs(0, -1, 0)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — two DFS/BFS passes |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Two-phase tree traversal** — first compute Bob's deterministic path, then DFS as Alice with time-aware profit adjustment. The tree structure ensures Bob has a unique path.

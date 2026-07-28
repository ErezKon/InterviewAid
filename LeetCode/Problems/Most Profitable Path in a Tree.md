# 2467. Most Profitable Path in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-profitable-path-in-a-tree](https://leetcode.com/problems/most-profitable-path-in-a-tree)
**Companies:** Amazon, Google, Intuit, Meta, Snowflake, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Find Bob's Path + DFS for Alice — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
FUNCTION mostProfitablePath(edges, bob, amount):
    // Build adjacency list
    graph ← BUILD_GRAPH(edges)
    // Find Bob's path to root (0) using DFS/BFS
    bobPath ← FIND_PATH(graph, bob, 0)
    bobTime ← {node: index FOR index, node IN ENUMERATE(bobPath)}

    FUNCTION dfs(node, parent, time):
        profit ← amount[node]
        IF node IN bobTime:
            IF time == bobTime[node]:
                profit ← profit / 2
            ELSE IF time > bobTime[node]:
                profit ← 0
        maxChild ← 0
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            childProfit ← dfs(child, node, time + 1)
            maxChild ← MAX(maxChild, childProfit)
        RETURN profit + maxChild

    RETURN dfs(0, -1, 0)
```

---

## 4. Examples

**Example 1:**
```
edges = [[0,1],[0,2],[1,3],[1,4]]
amount = [0,3,2,5,4]
bob = 4
```
Bob's path to root is 4 → 1 → 0 (times 0,1,2). Alice can choose path 0→1→3 collecting 0 (root, Alice arrives after Bob) + 3 (Alice arrives after Bob, profit 0) + 5 (Alice arrives before Bob, full profit) = 5. The optimal profit is **5**.

**Example 2 (tie on arrival):**
```
edges = [[0,1],[1,2]]
amount = [10,10,10]
bob = 2
```
Bob reaches node 1 at time 1, Alice also reaches node 1 at time 1, so node 1 profit is halved to 5. Alice's best path 0→1→2 yields profit 10 (root) + 5 (half) + 0 (Bob arrives first at leaf) = 15.

---

## 5. Walkthrough

Take Example 1.
1. Build adjacency list from edges.
2. Find Bob's path: start at 4, parent 1, then 0 → `bobPath = [4,1,0]`.
3. Record times: `bobTime = {4:0, 1:1, 0:2}`.
4. Start DFS at node 0, time 0. Profit at 0 = 0, but Alice arrives **after** Bob (Bob time 2 > 0), so profit stays 0.
5. Explore child 1 (time 1): Bob arrives at 1 at time 1 → profit halved: 3/2 = 1.5 (integer division assumed floor → 1).
6. From node 1, explore child 3 (time 2): Bob never visits 3, profit = 5.
7. Child 4 (time 2): Bob arrives at 4 at time 0 (earlier), so profit = 0.
8. Max child profit from node 1 = max(1.5+5, 1.5+0) = 6.5.
9. Total profit = 0 (root) + 6.5 = 6.5 → integer 6 (depending on rounding). The algorithm returns the maximum integer profit.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — two traversals (BFS for Bob's path, DFS for Alice) |
| **Space** | O(n) — adjacency list and recursion stack |

---

## 7. Follow-Up Questions

- How would the solution change if Bob could also choose any path rather than the unique shortest path to the root?
- Can you adapt the algorithm to handle multiple Bobs moving simultaneously?
- What modifications are needed if the amount at each node can be negative?

---

## 8. Key Takeaway

> **Two‑phase tree traversal** — first compute Bob's deterministic path, then DFS as Alice with time‑aware profit adjustment. The tree structure ensures Bob has a unique path.

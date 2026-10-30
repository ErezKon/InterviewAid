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

There is an undirected tree with `n` nodes labeled from `0` to `n - 1`, rooted at node `0`. You are given a 2D integer array `edges` of length `n - 1` where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

At every node `i`, there is a gate. You are also given an array of even integers `amount`, where `amount[i]` represents:

- the price needed to open the gate at node `i`, if `amount[i]` is negative, or,
- the cash reward obtained on opening the gate at node `i`, otherwise.

The game goes on as follows:

- Initially, Alice is at node `0` and Bob is at node `bob`.
- At every second, Alice and Bob **each** move to an adjacent node. Alice moves towards some **leaf node**, while Bob moves towards node `0`.
- For **every** node along their path, Alice and Bob either spend money to open the gate at that node, or accept the reward. Note that:

- If the gate is **already open**, no price will be required, nor will there be any cash reward.
- If Alice and Bob reach the node **simultaneously**, they share the price/reward for opening the gate there. In other words, if the price to open the gate is `c`, then both Alice and Bob pay `c / 2` each. Similarly, if the reward at the gate is `c`, both of them receive `c / 2` each.

- If Alice reaches a leaf node, she stops moving. Similarly, if Bob reaches node `0`, he stops moving. Note that these events are **independent** of each other.

Return* the **maximum** net income Alice can have if she travels towards the optimal leaf node.*

**Constraints:**
- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `edges` represents a valid tree.
- `1 <= bob < n`
- `amount.length == n`
- `amount[i]` is an **even** integer in the range `[-10^4, 10^4]`.

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
Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
Output: 6
Explanation: The above diagram represents the given tree. The game goes as follows:
- Alice is initially on node 0, Bob on node 3. They open the gates of their respective nodes.
  Alice's net income is now -2.
- Both Alice and Bob move to node 1.
  Since they reach here simultaneously, they open the gate together and share the reward.
  Alice's net income becomes -2 + (4 / 2) = 0.
- Alice moves on to node 3. Since Bob already opened its gate, Alice's income remains unchanged.
  Bob moves on to node 0, and stops moving.
- Alice moves on to node 4 and opens the gate there. Her net income becomes 0 + 6 = 6.
Now, neither Alice nor Bob can make any further moves, and the game ends.
It is not possible for Alice to get a higher net income.
```

**Example 2:**
```
Input: edges = [[0,1]], bob = 1, amount = [-7280,2350]
Output: -7280
Explanation: Alice follows the path 0->1 whereas Bob follows the path 1->0.
Thus, Alice opens the gate at node 0 only. Hence, her net income is -7280.
```

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

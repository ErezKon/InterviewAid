# 2858. Minimum Edge Reversals So Every Node Is Reachable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable](https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable)
**Companies:** Amazon, Cashfree, Google, Mathworks, Meesho, Microsoft, Oracle, Paypal, Phonepe, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Rerooting DP — O(n)](#approach-rerooting-dp--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a **simple directed graph** with `n` nodes labeled from `0` to `n - 1`. The graph would form a **tree** if its edges were bi-directional.

You are given an integer `n` and a **2D** integer array `edges`, where `edges[i] = [u_i, v_i]` represents a **directed edge** going from node `u_i` to node `v_i`.

An **edge reversal** changes the direction of an edge, i.e., a directed edge going from node `u_i` to node `v_i` becomes a directed edge going from node `v_i` to node `u_i`.

For every node `i` in the range `[0, n - 1]`, your task is to **independently** calculate the **minimum** number of **edge reversals** required so it is possible to reach any other node starting from node `i` through a **sequence** of **directed edges**.

Return *an integer array *`answer`*, where *`answer[i]`* is the** * ***minimum** number of **edge reversals** required so it is possible to reach any other node starting from node *`i`* through a **sequence** of **directed edges**.*

**Constraints:**
- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= u_i == edges[i][0] < n`
- `0 <= v_i == edges[i][1] < n`
- `u_i != v_i`
- The input is generated such that if the edges were bi-directional, the graph would be a tree.

---

## Examples

**Example 1:**
```
Input: n = 4, edges = [[2,0],[2,1],[1,3]]
Output: [1,1,0,2]
Explanation: The image above shows the graph formed by the edges.
For node 0: after reversing the edge [2,0], it is possible to reach any other node starting from node 0.
So, answer[0] = 1.
For node 1: after reversing the edge [2,1], it is possible to reach any other node starting from node 1.
So, answer[1] = 1.
For node 2: it is already possible to reach any other node starting from node 2.
So, answer[2] = 0.
For node 3: after reversing the edges [1,3] and [2,1], it is possible to reach any other node starting from node 3.
So, answer[3] = 2.
```

**Example 2:**
```
Input: n = 3, edges = [[1,2],[2,0]]
Output: [2,0,1]
Explanation: The image above shows the graph formed by the edges.
For node 0: after reversing the edges [2,0] and [1,2], it is possible to reach any other node starting from node 0.
So, answer[0] = 2.
For node 1: it is already possible to reach any other node starting from node 1.
So, answer[1] = 0.
For node 2: after reversing the edge [1, 2], it is possible to reach any other node starting from node 2.
So, answer[2] = 1.
```

---

## Key Insight

> **Rerooting technique**: First DFS from any root (say 0) to count reversals. Then re-root to each child in O(1): moving the root across an edge flips that edge's direction — forward becomes +1, backward becomes -1.

---

## Approach: Rerooting DP — O(n) ✅

```
FUNCTION minEdgeReversals(n, edges):
    // Build bidirectional graph with edge direction info
    graph = adjacency list    // (neighbor, cost) where cost=0 if forward, 1 if reverse

    // Step 1: DFS from node 0 to compute reversals needed for root=0
    reversals0 = DFS counting reverse edges from 0

    // Step 2: Reroot — when moving root from parent to child:
    //   If edge parent→child exists (forward): child needs 1 more reversal
    //   If edge child→parent exists (reverse): child needs 1 fewer reversal
    result = [0] * n
    result[0] = reversals0

    FUNCTION reroot(node, parent):
        FOR (child, cost) IN graph[node]:
            IF child == parent: CONTINUE
            IF cost == 0:    // node→child is forward
                result[child] = result[node] + 1
            ELSE:            // child→node is forward
                result[child] = result[node] - 1
            reroot(child, node)

    reroot(0, -1)
    RETURN result
```

---

## Walkthrough

```
n=4, edges: 0→1, 0→2, 1→3  (tree rooted at 0, all edges point away)
```

**Step 1:** DFS from 0 — all edges are forward → 0 reversals for root 0.

**Step 2:** Rerooting:
| Node | Parent | Edge direction | result |
|------|--------|---------------|--------|
| 0 | — | — | 0 |
| 1 | 0 | 0→1 forward: +1 | 1 |
| 2 | 0 | 0→2 forward: +1 | 1 |
| 3 | 1 | 1→3 forward: result[1]+1 | 2 |

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — two DFS passes |
| **Space** | O(n) — adjacency list + result array |

---

## Follow-Up Questions

1. **Why does rerooting work?** Moving root from parent to child flips exactly one edge (parent↔child). All other edges stay the same.
2. **What if the graph isn't a tree?** Rerooting only works on trees. For general graphs, use BFS/DFS from each node (O(n²)).
3. **Can we compute for a single root efficiently?** Yes — single DFS from that root, counting reversals: O(n).

---

## Key Takeaway

> The **rerooting technique** computes answers for all roots in O(n) total: solve for one root via DFS, then propagate to children by observing that crossing each edge flips exactly one direction.

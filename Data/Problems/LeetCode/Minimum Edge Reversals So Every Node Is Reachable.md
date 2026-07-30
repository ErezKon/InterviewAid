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

Given a directed tree with `n` nodes, for each node compute the **minimum number of edge reversals** needed so that every other node is reachable from it. Return an array of size `n`.

**Constraints:**
- `2 ≤ n ≤ 10⁵`
- `edges.length == n - 1`

---

## Examples

**Example 1:**
```
Input: n=4, edges=[[2,0],[2,1],[1,3]]
Output: [2,0,1,3] (varies by direction definition)
Explanation: From node 1: edges 2→0, 2→1, 1→3. To reach all from node 1:
  reverse 2→0 to 0→2? Depends on exact edge directions.
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

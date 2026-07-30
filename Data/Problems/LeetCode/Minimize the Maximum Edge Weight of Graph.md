# 3419. Minimize the Maximum Edge Weight of Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph](https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph)
**Companies:** Google, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a weighted directed graph with `n` nodes, find a subgraph where every node can reach node 0, while minimizing the **maximum edge weight** used. Each node must have at most one outgoing edge in the subgraph.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3`, `edges = [[0,1,5],[1,2,3],[2,0,4]]` | `4` | Selecting edges with weights ≤ 4 (`[1,2,3]` and `[2,0,4]`) allows all nodes to reach node 0. The maximum weight used is 4, which is minimal. |
| `n = 4`, `edges = [[0,1,2],[1,2,6],[2,3,5],[3,0,1]]` | `5` | With threshold 5, edges `[0,1,2]`, `[2,3,5]`, `[3,0,1]` keep connectivity. Threshold 4 fails because node 2 cannot reach node 0. |

---

## Approach: Binary Search + BFS ✅

```text
FUNCTION minMaxWeight(n, edges):
    // Collect all unique weights
    weights ← SORTED SET of edge weights
    
    // Binary search on the threshold weight
    lo ← 0, hi ← LEN(weights) - 1
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        threshold ← weights[mid]
        // Build reverse graph with edges ≤ threshold
        // BFS from node 0 on reverse graph
        IF all nodes reachable THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    
    RETURN weights[lo] IF all reachable ELSE -1
```

---

## Walkthrough

Consider the first example: `n = 3`, `edges = [[0,1,5],[1,2,3],[2,0,4]]`.

| Step | Threshold `w` | Edges ≤ w | Reachable from 0 (reverse) | Decision |
|------|---------------|----------|----------------------------|----------|
| 1 | 3 | `[1,2,3]` | Nodes reachable: 0 (none) | Not all reachable → increase `w` |
| 2 | 4 | `[1,2,3]`, `[2,0,4]` | Reverse graph: 0←2←1 → all nodes reachable | Feasible, try lower bound |
| 3 | Binary search converges to `w = 4` | → answer `4` |

The algorithm narrows down to the smallest `w` that makes the reverse graph fully reachable.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + BFS | **O((n + m) log m)** | **O(n + m)** |

---

## Follow-Up Questions

- How would the solution change if each node could have multiple outgoing edges?
- Can you adapt the approach for undirected graphs?
- What if the goal is to minimize the **sum** of selected edge weights instead of the maximum?

---

## Key Takeaway

> **Binary search on edge weight threshold** — a common pattern for "minimize the max edge" problems. Validate reachability with BFS/DFS on the filtered graph.

---
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

You are given two integers, `n` and `threshold`, as well as a **directed** weighted graph of `n` nodes numbered from 0 to `n - 1`. The graph is represented by a **2D** integer array `edges`, where `edges[i] = [A_i, B_i, W_i]` indicates that there is an edge going from node `A_i` to node `B_i` with weight `W_i`.

You have to remove some edges from this graph (possibly **none**), so that it satisfies the following conditions:

- Node 0 must be reachable from all other nodes.
- The **maximum** edge weight in the resulting graph is **minimized**.
- Each node has **at most** `threshold` outgoing edges.

Return the **minimum** possible value of the **maximum** edge weight after removing the necessary edges. If it is impossible for all conditions to be satisfied, return -1.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= threshold <= n - 1`
- `1 <= edges.length <= min(10^5, n * (n - 1) / 2).`
- `edges[i].length == 3`
- `0 <= A_i, B_i < n`
- `A_i != B_i`
- `1 <= W_i <= 10^6`
- There **may be** multiple edges between a pair of nodes, but they must have unique weights.

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[1,0,1],[2,0,2],[3,0,1],[4,3,1],[2,1,1]], threshold = 2
Output: 1
Explanation: Remove the edge 2 -> 0. The maximum weight among the remaining edges is 1.
```

**Example 2:**
```
Input: n = 5, edges = [[0,1,1],[0,2,2],[0,3,1],[0,4,1],[1,2,1],[1,4,1]], threshold = 1
Output: -1
Explanation: It is impossible to reach node 0 from node 2.
```

**Example 3:**
```
Input: n = 5, edges = [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[3,4,2],[4,0,1]], threshold = 1
Output: 2
Explanation: Remove the edges 1 -> 3 and 1 -> 4. The maximum weight among the remaining edges is 2.
```

**Example 4:**
```
Input: n = 5, edges = [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[4,0,1]], threshold = 1
Output: -1
```

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
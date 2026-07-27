# 2204. Distance to a Cycle in Undirected Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distance-to-a-cycle-in-undirected-graph](https://leetcode.com/problems/distance-to-a-cycle-in-undirected-graph)
**Companies:** Microsoft, Oracle

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Topological Peeling + BFS](#approach-topological-peeling--bfs)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an undirected graph with `n` nodes (0-indexed) where every node has **degree ≥ 2** and the graph contains **exactly one cycle**, return an array `answer` where `answer[i]` is the minimum distance from node `i` to the nearest node on the cycle.

**Constraints:**
- `n == edges.length`
- `3 <= n <= 10^5`
- The graph is connected with exactly one cycle.

---

## Examples

**Example 1:**
```
    0 - 1 - 2
    |       |
    7   3 - 4
    |
    6 - 5

Cycle: 0-1-2-4-3-0 (or some subset)
Nodes on cycle: distance 0
Nodes off cycle: distance = hops to nearest cycle node
```

---

## Key Insight

> **Step 1:** Identify cycle nodes by **topological peeling** — repeatedly remove nodes with degree 1 (leaves). Whatever remains is the cycle.
> **Step 2:** Multi-source BFS from all cycle nodes simultaneously to compute distances.

---

## Approach: Topological Peeling + BFS ✅

```
FUNCTION distanceToCycle(n, edges):
    // Build adjacency list and degree array
    adj ← adjacency list from edges
    degree ← array of degrees

    // Step 1: Topological peeling — remove leaves iteratively
    queue ← all nodes with degree 1
    removed ← set()

    WHILE queue is not empty DO
        node ← queue.DEQUEUE()
        removed.ADD(node)
        FOR neighbor IN adj[node] DO
            IF neighbor NOT IN removed THEN
                degree[neighbor] -= 1
                IF degree[neighbor] = 1 THEN
                    queue.ENQUEUE(neighbor)

    // Remaining nodes are cycle nodes
    cycleNodes ← all nodes NOT in removed

    // Step 2: Multi-source BFS from cycle nodes
    dist ← array of -1, size n
    bfsQueue ← empty queue

    FOR node IN cycleNodes DO
        dist[node] ← 0
        bfsQueue.ENQUEUE(node)

    WHILE bfsQueue is not empty DO
        node ← bfsQueue.DEQUEUE()
        FOR neighbor IN adj[node] DO
            IF dist[neighbor] = -1 THEN
                dist[neighbor] ← dist[node] + 1
                bfsQueue.ENQUEUE(neighbor)

    RETURN dist
END FUNCTION
```

---

## Walkthrough

```
Graph: 0-1, 1-2, 2-3, 3-0, 3-4, 4-5
```

**Step 1 — Peel leaves:**
- Node 5: degree 1 → remove. Node 4 degree drops to 1 → remove.
- All other nodes have degree ≥ 2.
- Cycle = {0, 1, 2, 3}

**Step 2 — BFS from cycle:**
- dist[0]=0, dist[1]=0, dist[2]=0, dist[3]=0
- From node 3: dist[4]=1
- From node 4: dist[5]=2

Result: `[0, 0, 0, 0, 1, 2]` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Peeling + BFS each visit all nodes/edges once |
| **Space** | O(n) | Adjacency list, distance array, queues |

---

## Follow-Up Questions

**Q1: Why does topological peeling find the cycle?**
> Leaves (degree 1) can't be on a cycle. Removing them may create new leaves. Iterating until no leaves remain leaves exactly the cycle nodes.

**Q2: What if there are multiple cycles?**
> This problem guarantees exactly one cycle. For multiple cycles, the same approach works — remaining nodes after peeling form all cycle components.

**Q3: Could you find the cycle with DFS instead?**
> Yes — DFS with parent tracking detects the cycle via back edges. But topological peeling is simpler and cleaner for this problem.

---

## Key Takeaway

> **To find a cycle in a graph with exactly one cycle, use topological peeling (iteratively remove degree-1 nodes). Then multi-source BFS from cycle nodes gives shortest distances to the cycle in O(n).**

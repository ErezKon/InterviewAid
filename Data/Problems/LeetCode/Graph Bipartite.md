# 785. Is Graph Bipartite?

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/is-graph-bipartite](https://leetcode.com/problems/is-graph-bipartite)
**Companies:** Amazon, Bloomberg, Google, Lime, Linkedin, Meta, Microsoft, Samsung, Tiktok, Uber

---

## 1. Problem Description

There is an **undirected** graph with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to. More formally, for each `v` in `graph[u]`, there is an undirected edge between node `u` and node `v`. The graph has the following properties:

- There are no self-edges (`graph[u]` does not contain `u`).
- There are no parallel edges (`graph[u]` does not contain duplicate values).
- If `v` is in `graph[u]`, then `u` is in `graph[v]` (the graph is undirected).
- The graph may not be connected, meaning there may be two nodes `u` and `v` such that there is no path between them.

A graph is **bipartite** if the nodes can be partitioned into two independent sets `A` and `B` such that **every** edge in the graph connects a node in set `A` and a node in set `B`.

Return `true` *if and only if it is **bipartite***.

**Constraints:**
- `graph.length == n`
- `1 <= n <= 100`
- `0 <= graph[u].length < n`
- `0 <= graph[u][i] <= n - 1`
- `graph[u]` does not contain `u`.
- All the values of `graph[u]` are **unique**.
- If `graph[u]` contains `v`, then `graph[v]` contains `u`.

---

## 2. Approach: BFS/DFS Coloring — O(V+E) ✅

```text
FUNCTION isBipartite(graph):
    n ← LENGTH(graph)
    color ← ARRAY of -1 size n
    FOR i ← 0 TO n - 1:
        IF color[i] != -1: CONTINUE
        queue ← [i]
        color[i] ← 0
        WHILE queue NOT EMPTY:
            node ← DEQUEUE(queue)
            FOR neighbor IN graph[node]:
                IF color[neighbor] = -1:
                    color[neighbor] ← 1 - color[node]
                    ENQUEUE(queue, neighbor)
                ELSE IF color[neighbor] = color[node]:
                    RETURN false
    RETURN true
```

---

## 3. Examples

```
Example 1:
  Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
  Output: false
  Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.
```
```
Example 2:
  Input: graph = [[1,3],[0,2],[1,3],[0,2]]
  Output: true
  Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
```

---

## 4. Walkthrough

Consider the first example `[[1,3],[0,2],[1,3],[0,2]]`.

| Step | Queue | Color Array |
|------|-------|-------------|
| Start | `[0]` | `[-1,-1,-1,-1]` → set `color[0]=0` |
| Dequeue 0 | `[]` | `color[0]=0` |
| Process neighbors 1,3 | `[1,3]` | `color[1]=1`, `color[3]=1` |
| Dequeue 1 | `[3]` | `color[2]=0` (neighbor 2) |
| Dequeue 3 | `[]` | all neighbors already colored with opposite colors |
| Result | — | No conflicts → `true` |

---

## 5. Complexity Analysis

- **Time:** `O(V + E)` – each vertex and edge is visited once during BFS/DFS.
- **Space:** `O(V)` – for the color array and BFS queue.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual two color groups?
- Can you detect the smallest odd cycle that makes the graph non‑bipartite?
- How would the solution change for a directed graph?

---

## Key Takeaway

> Bipartite = 2‑colorable = no odd‑length cycles. BFS/DFS coloring: assign alternating colors, fail if a neighbor has the same color. Check all components.

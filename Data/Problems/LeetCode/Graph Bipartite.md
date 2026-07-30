# 785. Is Graph Bipartite?

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/is-graph-bipartite](https://leetcode.com/problems/is-graph-bipartite)
**Companies:** Amazon, Bloomberg, Google, Lime, Linkedin, Meta, Microsoft, Samsung, Tiktok, Uber

---

## 1. Problem Description

Given an undirected graph, determine if it is bipartite — can nodes be colored with two colors such that no two adjacent nodes share a color?

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

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,3],[0,2],[1,3],[0,2]]` | `true` | The graph can be colored as {0,2}=Red, {1,3}=Blue. |
| `[[1,2,3],[0,2],[0,1,3],[0,2]]` | `false` | An odd cycle forces a conflict. |

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

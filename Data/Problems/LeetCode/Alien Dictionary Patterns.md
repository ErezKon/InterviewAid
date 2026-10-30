# Topological Sort Problem Collection

Related: #207, #210, #269, #310, #802, #1136, #2115, #2050

---

## Problem Description
> *Note: constraints and examples are derived, not from an official LeetCode source.*

Given a directed acyclic graph (DAG) representing dependencies (e.g., course prerequisites, character ordering), produce a linear ordering of its vertices such that for every directed edge `u → v`, `u` appears before `v` in the ordering.

Formally: given `n` vertices labeled `0..n-1` and a list of directed edges `edges[i] = [u, v]` (meaning `u` must come before `v`), return any valid topological ordering of all vertices. If the graph contains a cycle, no ordering exists and an empty list is returned.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= edges.length <= 10^5`
- `edges[i].length == 2`
- `0 <= u, v < n`, `u != v`
- There are no duplicate edges.

## Examples
```
Example 1 (Course Schedule II style):
  Input: numCourses = 2, prerequisites = [[1,0]]
  Output: [0,1]
  Explanation: To take course 1 you must first complete course 0 (edge 0 → 1).
```
```
Example 2 (Alien Dictionary style):
  Input: words = ["wrt","wrf","er","ett","rftt"]
  Output: "wertf"
  Explanation: Adjacent word pairs give the edges t→f, w→e, r→t, e→r; the only topological
  order of w→e→r→t→f is "wertf".
```
```
Example 3 (generic DAG):
  Input: n = 3, edges = [[0,1],[0,2]]
  Output: [0,1,2]
  Explanation: Node 0 is the only node with indegree 0. After removing it, nodes 1 and 2 both
  have indegree 0 and are dequeued in order. ([0,2,1] is also valid.)
```
```
Example 4 (cycle):
  Input: n = 2, edges = [[0,1],[1,0]]
  Output: []
  Explanation: 0 → 1 → 0 is a cycle, so no node ever reaches indegree 0.
```

## Approach
**Algorithm:** Kahn's algorithm for topological sorting (BFS on indegree 0 nodes).
1. Build adjacency list and indegree count for each vertex.
2. Initialize a queue with all vertices whose indegree is 0.
3. Repeatedly dequeue a vertex, append it to the ordering, and decrease indegree of its neighbors; enqueue any neighbor whose indegree becomes 0.
4. If the ordering contains all vertices, return it; otherwise a cycle exists.

## Walkthrough
| Step | Processed node | Queue after step | Ordering |
|------|----------------|------------------|----------|
| 1 | dequeue 0 (indegree 0) | [1,2] | [0] |
| 2 | dequeue 1 | [2] | [0,1] |
| 3 | dequeue 2 | [] | [0,1,2] |

## Complexity Analysis
- **Time:** O(V + E) where V is number of vertices and E is number of edges.
- **Space:** O(V + E) for the graph, indegree map, and queue.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible topological orders?
2. Can you detect a cycle and return the nodes involved?
3. What changes are needed if the graph is given as an edge list rather than adjacency list?

## Key Takeaway
Kahn's algorithm repeatedly removes vertices with zero indegree, yielding a valid linear ordering for any DAG.

---

```text
FUNCTION topologicalSort(graph, indegree):
    queue ← [v FOR v IN indegree IF indegree[v] = 0]
    order ← []
    WHILE queue NOT EMPTY:
        v ← DEQUEUE(queue)
        APPEND v TO order
        FOR nb IN graph[v]:
            indegree[nb] ← indegree[nb] - 1
            IF indegree[nb] = 0:
                ENQUEUE(nb, queue)
    IF len(order) != SIZE(graph):
        RETURN []  // cycle detected
    RETURN order
```
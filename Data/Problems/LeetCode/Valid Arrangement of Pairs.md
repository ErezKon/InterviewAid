# 2097. Valid Arrangement of Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-arrangement-of-pairs](https://leetcode.com/problems/valid-arrangement-of-pairs)
**Companies:** Amazon, Goldman Sachs, Google, Snapchat

---

## Problem Description
Given an array `pairs` where each element is a two‑element array `[a, b]`, arrange all pairs in a sequence such that for every consecutive pair `[x, y]` and `[y, z]` the second element of the first equals the first element of the next. Return any valid arrangement or an empty array if none exists.

## Examples
| pairs | Valid Arrangement |
|-------|-------------------|
| [[5,1],[4,5],[11,9],[9,4]] | [[11,9],[9,4],[4,5],[5,1]] |
| [[1,3],[3,2],[2,1]] | [[1,3],[3,2],[2,1]] |
*Each arrangement forms a continuous chain where adjacent pairs match on the connecting value.*

## Approach
Model the pairs as directed edges of a graph and find an Eulerian path that uses every edge exactly once. Use Hierholzer’s algorithm to construct the path.

```text
FUNCTION ValidArrangement(pairs):
    // Build adjacency list and degree counts
    CREATE graph AS map from node → list of neighbors
    CREATE inDeg, outDeg AS map from node → integer
    FOR each [a, b] IN pairs:
        APPEND b TO graph[a]
        INCREMENT outDeg[a]
        INCREMENT inDeg[b]
    
    // Choose start node: node with outDeg - inDeg == 1, else any node
    SET start ← pairs[0][0]
    FOR node IN outDeg KEYS:
        IF outDeg[node] - inDeg.get(node,0) == 1:
            SET start ← node
            BREAK
    
    // Hierholzer's algorithm
    CREATE stack ← [start]
    CREATE path ← []
    WHILE stack NOT EMPTY:
        SET v ← stack[-1]
        IF graph[v] IS NOT EMPTY:
            SET next ← POP_LAST(graph[v])
            PUSH next ONTO stack
        ELSE:
            APPEND POP(stack) TO path
    REVERSE path
    // Convert node list to pair list
    CREATE result ← []
    FOR i ← 0 TO LENGTH(path)-2:
        APPEND [path[i], path[i+1]] TO result
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Build adjacency list and compute in/out degrees for each node. |
| 2 | Identify start node (out‑degree exceeds in‑degree by one) or fallback to any node. |
| 3 | Perform Hierholzer’s algorithm: traverse edges depth‑first, pushing nodes onto `stack`. |
| 4 | When a node has no outgoing edges, pop it to `path`. |
| 5 | Reverse `path` to obtain the Eulerian trail, then translate consecutive nodes into pairs. |

## Complexity Analysis
- **Time:** O(E) where E = number of pairs (each edge visited once). |
- **Space:** O(V + E) for the adjacency list, degree maps, and recursion stack (`stack` and `path`). |

## Follow-Up Questions
1. How would you modify the algorithm to return the lexicographically smallest valid arrangement? |
2. Can the approach be extended to handle multiple disconnected components? |
3. What changes are needed if pairs can contain duplicate edges? |

## Key Takeaway
Transforming the problem into an Eulerian path on a directed graph and applying Hierholzer’s algorithm yields a linear‑time solution that uses every pair exactly once.

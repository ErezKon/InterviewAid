# 3787. Find Diameter Endpoints of a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-diameter-endpoints-of-a-tree](https://leetcode.com/problems/find-diameter-endpoints-of-a-tree)
**Companies:** Agoda

---

## Problem Description

Find the two endpoint nodes of the diameter (longest path) of a tree. Return any valid pair.

---

## Examples

| n | edges | Expected |
|---|-------|----------|
| 4 | [[0,1],[1,2],[2,3]] | [0,3] |
| 5 | [[0,1],[0,2],[0,3],[3,4]] | [1,4] |

---

## Approach: Two BFS — O(n) ✅

```text
FUNCTION findDiameterEndpoints(n, edges):
    // Build adjacency list
    adj ← LIST of LIST size n
    FOR each [u, v] IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    // BFS from arbitrary node (0) to find farthest node u
    u ← BFS_farthest(0, adj)
    // BFS from u to find farthest node v and distance
    v ← BFS_farthest(u, adj)
    RETURN [u, v]
```

---

## Walkthrough

1. Build adjacency list for quick neighbor lookup.
2. Perform BFS starting at node 0; the node reached last (`u`) is one endpoint of the diameter.
3. Perform BFS again starting from `u`; the farthest node reached (`v`) is the opposite endpoint.
4. Return `[u, v]`. For the first example, BFS from 0 reaches node 3 last, so `u=3`; BFS from 3 reaches node 0 last, giving `[3,0]` (order irrelevant).

---

## Complexity Analysis

- **Time:** O(n) – each BFS visits every node and edge once.
- **Space:** O(n) – adjacency list and BFS queue.

---

## Follow-Up Questions

- How would you modify the algorithm to also return the length of the diameter?
- Can you compute the diameter endpoints in a single DFS traversal?

---

## Key Takeaway

> **Classic two-BFS tree diameter: BFS from any node finds one endpoint, BFS from that finds the other. O(n) time.**
# 3787. Find Diameter Endpoints of a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-diameter-endpoints-of-a-tree](https://leetcode.com/problems/find-diameter-endpoints-of-a-tree)
**Companies:** Agoda

---

## Problem Description

You are given an **undirected tree** with `n` nodes, numbered from 0 to `n - 1`. It is represented by a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

A node is called **special** if it is an **endpoint** of any **diameter path** of the tree.

Return a binary string `s` of length `n`, where `s[i] = '1'` if node `i` is special, and `s[i] = '0'` otherwise.

A **diameter path** of a tree is the **longest** simple path between any two nodes. A tree may have multiple diameter paths.

An **endpoint** of a path is the **first** or **last** node on that path.

**Constraints:**

- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [a_i, b_i]`
- `0 <= a_i, b_i < n`
- The input is generated such that `edges` represents a valid tree.

---

## Examples

```
Example 1:
  Input: n = 3, edges = [[0,1],[1,2]]
  Output: "101"
  Explanation:
  - The diameter of this tree consists of 2 edges.
  - The only diameter path is the path from node 0 to node 2
  - The endpoints of this path are nodes 0 and 2, so they are special.
```

```
Example 2:
  Input: n = 7, edges = [[0,1],[1,2],[2,3],[3,4],[3,5],[1,6]]
  Output: "1000111"
  Explanation: The diameter of this tree consists of 4 edges. There are 4 diameter paths:
  - The path from node 0 to node 4
  - The path from node 0 to node 5
  - The path from node 6 to node 4
  - The path from node 6 to node 5
  The special nodes are nodes 0, 4, 5, 6, as they are endpoints in at least one diameter path.
```

```
Example 3:
  Input: n = 2, edges = [[0,1]]
  Output: "11"
  Explanation:
  - The diameter of this tree consists of 1 edge.
  - The only diameter path is the path from node 0 to node 1
  - The endpoints of this path are nodes 0 and 1, so they are special.
```

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
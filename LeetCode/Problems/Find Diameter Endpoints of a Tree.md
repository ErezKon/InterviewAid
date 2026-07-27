# 3787. Find Diameter Endpoints of a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-diameter-endpoints-of-a-tree](https://leetcode.com/problems/find-diameter-endpoints-of-a-tree)
**Companies:** Agoda

---

## Problem Description

Find the two endpoint nodes of the diameter (longest path) of a tree. Return any valid pair.

---

## Approach: Two BFS — O(n) ✅

```
FUNCTION findDiameterEndpoints(n, edges):
    // BFS from any node to find farthest node u
    u = BFS_farthest(0)
    // BFS from u to find farthest node v
    v = BFS_farthest(u)
    RETURN [u, v]
```

---

## Key Takeaway

> **Classic two-BFS tree diameter: BFS from any node finds one endpoint, BFS from that finds the other. O(n) time.**

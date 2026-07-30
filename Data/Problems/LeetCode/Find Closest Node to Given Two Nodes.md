# 2359. Find Closest Node to Given Two Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-closest-node-to-given-two-nodes](https://leetcode.com/problems/find-closest-node-to-given-two-nodes)
**Companies:** Amazon, Bloomberg, Google, Juspay

---

## Problem Description

A directed graph where each node has at most one outgoing edge. Find the node reachable from both `node1` and `node2` that minimizes `max(dist1, dist2)`. Return smallest index on tie.

---

## Examples

**Example 1:**
```
edges = [2,2,3,-1]
node1 = 0
node2 = 1
Output: 2
Explanation: From node 0 we reach 2 in 2 steps, from node 1 we reach 2 in 1 step. max(2,1)=2 which is minimal.
```

**Example 2:**
```
edges = [1,2,-1]
node1 = 0
node2 = 2
Output: -1
Explanation: Node 2 is not reachable from node 0, so no common reachable node exists.
```

---

## Approach: Two Traversals — O(n) ✅

```text
FUNCTION closestMeetingNode(edges, node1, node2):
    FUNCTION getDists(start):
        SET n ← LENGTH(edges)
        SET dist ← ARRAY OF -1 WITH SIZE n
        SET d ← 0
        SET curr ← start
        WHILE curr != -1 AND dist[curr] == -1:
            SET dist[curr] ← d
            SET d ← d + 1
            SET curr ← edges[curr]
        RETURN dist

    SET d1 ← getDists(node1)
    SET d2 ← getDists(node2)
    SET result ← -1
    SET minDist ← INFINITY
    FOR i ← 0 TO n - 1:
        IF d1[i] != -1 AND d2[i] != -1:
            SET maxD ← MAX(d1[i], d2[i])
            IF maxD < minDist:
                SET minDist ← maxD
                SET result ← i
    RETURN result
```

---

## Walkthrough

| Step | node1 distance array `d1` | node2 distance array `d2` | max(d1[i], d2[i]) | Current best |
|------|---------------------------|---------------------------|------------------|--------------|
| 0    | [-1,-1,-1,-1]             | [-1,-1,-1,-1]             | N/A              | -1 (∞)       |
| 1    | [0,-1,-1,-1] (node0)      | [-1,-1,-1,-1]             | N/A              | -1 (∞)       |
| 2    | [0,1,-1,-1] (node1)       | [-1,-1,-1,-1]             | N/A              | -1 (∞)       |
| 3    | [0,1,2,-1] (node2)        | [-1,-1,-1,-1]             | N/A              | -1 (∞)       |
| …    | continue until both traversals finish. The algorithm then scans all indices, finds index 2 with max distance 2, which is minimal. |

---

## Complexity Analysis

- **Time:** O(n) – each traversal visits each node at most once, and the final scan is linear.
- **Space:** O(n) – two distance arrays of size n.

---

## Follow-Up Questions

1. How would the solution change if each node could have multiple outgoing edges?
2. Can you extend the approach to find the *k* closest common nodes?
3. What if edge weights were introduced; how would you compute the minimal maximum weighted distance?

---

## Key Takeaway

> **Compute distances from both sources, find node minimizing the max of both distances. Each node has ≤ 1 outgoing edge, so traversal is linear.**
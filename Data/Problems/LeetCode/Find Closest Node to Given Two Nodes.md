# 2359. Find Closest Node to Given Two Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-closest-node-to-given-two-nodes](https://leetcode.com/problems/find-closest-node-to-given-two-nodes)
**Companies:** Amazon, Bloomberg, Google, Juspay

---

## Problem Description

You are given a **directed** graph of `n` nodes numbered from `0` to `n - 1`, where each node has **at most one** outgoing edge.

The graph is represented with a given **0-indexed** array `edges` of size `n`, indicating that there is a directed edge from node `i` to node `edges[i]`. If there is no outgoing edge from `i`, then `edges[i] == -1`.

You are also given two integers `node1` and `node2`.

Return *the **index** of the node that can be reached from both* `node1` *and* `node2`*, such that the **maximum** between the distance from* `node1` *to that node, and from* `node2` *to that node is **minimized***. If there are multiple answers, return the node with the **smallest** index, and if no possible answer exists, return `-1`.

Note that `edges` may contain cycles.

**Constraints:**

- `n == edges.length`
- `2 <= n <= 10^5`
- `-1 <= edges[i] < n`
- `edges[i] != i`
- `0 <= node1, node2 < n`

---

## Examples

```
Example 1:
  Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
  Output: 2
  Explanation: The distance from node 0 to node 2 is 1, and the distance from node 1 to node 2 is 1.
  The maximum of those two distances is 1. It can be proven that we cannot get a node with a smaller maximum distance than 1, so we return node 2.
```

```
Example 2:
  Input: edges = [1,2,-1], node1 = 0, node2 = 2
  Output: 2
  Explanation: The distance from node 0 to node 2 is 2, and the distance from node 2 to itself is 0.
  The maximum of those two distances is 2. It can be proven that we cannot get a node with a smaller maximum distance than 2, so we return node 2.
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
| …    | continue until both traversals finish. The algorithm then scans all indices, finds index 2 with max distance 2, which is minimal. |

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
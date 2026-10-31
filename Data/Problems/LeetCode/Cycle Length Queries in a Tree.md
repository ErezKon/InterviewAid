# 2509. Cycle Length Queries in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cycle-length-queries-in-a-tree](https://leetcode.com/problems/cycle-length-queries-in-a-tree)
**Companies:** Arcesium

---

## Problem Description

You are given an integer `n`. There is a **complete binary tree** with `2^n - 1` nodes. The root of that tree is the node with the value `1`, and every node with a value `val` in the range `[1, 2^n - 1 - 1]` has two children where:

- The left node has the value `2 * val`, and
- The right node has the value `2 * val + 1`.

You are also given a 2D integer array `queries` of length `m`, where `queries[i] = [a_i, b_i]`. For each query, solve the following problem:

- Add an edge between the nodes with values `a_i` and `b_i`.
- Find the length of the cycle in the graph.
- Remove the added edge between nodes with values `a_i` and `b_i`.

**Note** that:

- A **cycle** is a path that starts and ends at the same node, and each edge in the path is visited only once.
- The length of a cycle is the number of edges visited in the cycle.
- There could be multiple edges between two nodes in the tree after adding the edge of the query.

Return *an array *`answer`* of length *`m`* where* `answer[i]` *is the answer to the* `i^th` *query.*

**Constraints:**
- `2 <= n <= 30`
- `m == queries.length`
- `1 <= m <= 10^5`
- `queries[i].length == 2`
- `1 <= a_i, b_i <= 2^n - 1`
- `a_i != b_i`

---

## Examples

**Example 1:**
```
Input: n = 3, queries = [[5,3],[4,7],[2,3]]
Output: [4,5,3]
Explanation: The diagrams above show the tree of 2^3 - 1 nodes. Nodes colored in red describe the nodes in the cycle after adding the edge.
- After adding the edge between nodes 3 and 5, the graph contains a cycle of nodes [5,2,1,3]. Thus answer to the first query is 4. We delete the added edge and process the next query.
- After adding the edge between nodes 4 and 7, the graph contains a cycle of nodes [4,2,1,3,7]. Thus answer to the second query is 5. We delete the added edge and process the next query.
- After adding the edge between nodes 2 and 3, the graph contains a cycle of nodes [2,1,3]. Thus answer to the third query is 3. We delete the added edge.
```

**Example 2:**
```
Input: n = 2, queries = [[1,2]]
Output: [2]
Explanation: The diagram above shows the tree of 2^2 - 1 nodes. Nodes colored in red describe the nodes in the cycle after adding the edge.
- After adding the edge between nodes 1 and 2, the graph contains a cycle of nodes [2,1]. Thus answer for the first query is 2. We delete the added edge.
```

---

## Approach

```
FUNCTION cycleLengthQueries(n, queries):
    result = []
    FOR [a, b] IN queries:
        length = 1
        WHILE a != b:
            IF a > b: a = a // 2
            ELSE: b = b // 2
            length += 1
        result.ADD(length)
    RETURN result
```

---

## Walkthrough

**Query `[5,6]` in a tree of height 3**

| Step | a | b | Action | Length |
|------|---|---|--------|--------|
| 1 | 5 | 6 | a < b → b = b // 2 (6→3) | 2 |
| 2 | 5 | 3 | a > b → a = a // 2 (5→2) | 3 |
| 3 | 2 | 3 | a < b → b = b // 2 (3→1) | 4 |
| 4 | 2 | 1 | a > b → a = a // 2 (2→1) | 5 |
| 5 | 1 | 1 | Stop (LCA reached) | **Cycle length = 4** (edges traversed before adding edge) |

The algorithm counts the steps taken to bring both nodes to their lowest common ancestor, then adds the extra edge.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × n) where n = tree height |
| **Space** | O(1) per query |

---

## Follow-Up Questions

1. How would you preprocess the tree to answer queries in O(log n) time?
2. Extend the solution to a general (non-perfect) binary tree.
3. What changes are needed if multiple edges are added simultaneously?

---

## Key Takeaway

> **LCA in a perfect binary tree: repeatedly halve the larger node. Steps to LCA from both nodes + 1 (the added edge) = cycle length. No preprocessing needed.**
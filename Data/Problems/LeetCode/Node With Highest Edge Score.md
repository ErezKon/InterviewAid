# 2374. Node With Highest Edge Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/node-with-highest-edge-score](https://leetcode.com/problems/node-with-highest-edge-score)
**Companies:** Juspay

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Sum Incoming Edges — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a directed graph with `n` nodes labeled from `0` to `n - 1`, where each node has **exactly one** outgoing edge.

The graph is represented by a given **0-indexed** integer array `edges` of length `n`, where `edges[i]` indicates that there is a **directed** edge from node `i` to node `edges[i]`.

The **edge score** of a node `i` is defined as the sum of the **labels** of all the nodes that have an edge pointing to `i`.

Return *the node with the highest **edge score***. If multiple nodes have the same **edge score**, return the node with the **smallest** index.

**Constraints:**

- `n == edges.length`
- `2 <= n <= 10^5`
- `0 <= edges[i] < n`
- `edges[i] != i`

---

## 2. Examples

```
Example 1:
  Input: edges = [1,0,0,0,0,7,7,5]
  Output: 7
  Explanation:
  - The nodes 1, 2, 3 and 4 have an edge pointing to node 0. The edge score of node 0 is 1 + 2 + 3 + 4 = 10.
  - The node 0 has an edge pointing to node 1. The edge score of node 1 is 0.
  - The node 7 has an edge pointing to node 5. The edge score of node 5 is 7.
  - The nodes 5 and 6 have an edge pointing to node 7. The edge score of node 7 is 5 + 6 = 11.
  Node 7 has the highest edge score so return 7.
```

```
Example 2:
  Input: edges = [2,0,0,2]
  Output: 0
  Explanation:
  - The nodes 1 and 2 have an edge pointing to node 0. The edge score of node 0 is 1 + 2 = 3.
  - The nodes 0 and 3 have an edge pointing to node 2. The edge score of node 2 is 0 + 3 = 3.
  Nodes 0 and 2 both have an edge score of 3. Since node 0 has a smaller index, we return 0.
```

---

## 3. Approach: Sum Incoming Edges — O(n) ✅

```text
FUNCTION edgeScore(edges):
    SET n ← LENGTH(edges)
    SET score[0…n-1] ← 0
    FOR i ← 0 TO n - 1:
        SET dest ← edges[i]
        SET score[dest] ← score[dest] + i
    SET bestNode ← 0
    FOR i ← 1 TO n - 1:
        IF score[i] > score[bestNode] OR (score[i] = score[bestNode] AND i < bestNode):
            SET bestNode ← i
    RETURN bestNode
```

---

## 4. Walkthrough

**Example:** `edges = [1,0,0,1,0]`

1. Initialise `score = [0,0,0,0,0]`.
2. Iterate indices:
   - i=0, dest=1 → score[1]=0+0=0
   - i=1, dest=0 → score[0]=0+1=1
   - i=2, dest=0 → score[0]=1+2=3
   - i=3, dest=1 → score[1]=0+3=3
   - i=4, dest=0 → score[0]=3+4=7
3. Scores become `[7,3,0,0,0]`.
4. Scan scores: max is 7 at node 0 → return `0`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass to accumulate scores and another pass to find max |
| **Space** | O(n) for the `score` array |

---

## 6. Follow-Up Questions

1. How would you modify the solution if each node could have multiple outgoing edges?
2. Can you compute the node with the **second** highest edge score efficiently?
3. What if the graph is huge and cannot fit in memory—how would you stream the edges?

---

## 7. Key Takeaway

> **Accumulate edge scores and find max.** Simple aggregation problem — sum source indices per destination, then pick the node with the highest total.

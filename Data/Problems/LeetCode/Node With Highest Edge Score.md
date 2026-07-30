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

Given a directed graph where each node has exactly one outgoing edge, the **edge score** of a node is the sum of indices of all nodes pointing to it. Return the node with the highest edge score (smallest index for ties).

---

## 2. Examples

| Input `edges` | Output | Explanation |
|---------------|--------|-------------|
| `[1,0,0,1,0]` | `0` | Nodes `1`, `2`, and `4` point to node `0`. Edge score of `0` = 1+2+4 = 7, which is highest. |
| `[0,0,0]` | `0` | All nodes point to `0`; its score = 0+1+2 = 3, others have score 0. |
| `[2,2,2]` | `2` | All edges point to node `2`; its score = 0+1+2 = 3, which is maximal.

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

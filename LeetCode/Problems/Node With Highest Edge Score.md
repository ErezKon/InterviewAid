# 2374. Node With Highest Edge Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/node-with-highest-edge-score](https://leetcode.com/problems/node-with-highest-edge-score)
**Companies:** Juspay

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sum Incoming Edges — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a directed graph where each node has exactly one outgoing edge, the **edge score** of a node is the sum of indices of all nodes pointing to it. Return the node with the highest edge score (smallest index for ties).

---

## 2. Key Insight

> For each edge `i → edges[i]`, add `i` to the score of `edges[i]`. Track the node with the max score.

---

## 3. Approach: Sum Incoming Edges — O(n) ✅

```
FUNCTION edgeScore(edges):
    score = [0] * n
    FOR i ← 0 TO n - 1:
        score[edges[i]] += i

    bestNode = 0
    FOR i ← 1 TO n - 1:
        IF score[i] > score[bestNode]:
            bestNode = i
    RETURN bestNode
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Accumulate edge scores and find max.** Simple aggregation problem — sum source indices per destination, return the node with highest score.

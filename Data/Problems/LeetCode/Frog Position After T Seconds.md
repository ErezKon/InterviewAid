# 1377. Frog Position After T Seconds

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frog-position-after-t-seconds](https://leetcode.com/problems/frog-position-after-t-seconds)
**Companies:** Google, Inmobi
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an undirected tree consisting of `n` vertices numbered from `1` to `n`. A frog starts jumping from **vertex 1**. In one second, the frog jumps from its current vertex to another **unvisited** vertex if they are directly connected. The frog can not jump back to a visited vertex. In case the frog can jump to several vertices, it jumps randomly to one of them with the same probability. Otherwise, when the frog can not jump to any unvisited vertex, it jumps forever on the same vertex.

The edges of the undirected tree are given in the array `edges`, where `edges[i] = [a_i, b_i]` means that exists an edge connecting the vertices `a_i` and `b_i`.

*Return the probability that after `t` seconds the frog is on the vertex `target`. *Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `1 <= n <= 100`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `1 <= a_i, b_i <= n`
- `1 <= t <= 50`
- `1 <= target <= n`

---

## 2. Examples

**Example 1:**
```
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 2, target = 4
Output: 0.16666666666666666
Explanation: The figure above shows the given graph. The frog starts at vertex 1, jumping with 1/3 probability to the vertex 2 after second 1 and then jumping with 1/2 probability to vertex 4 after second 2. Thus the probability for the frog is on the vertex 4 after 2 seconds is 1/3 * 1/2 = 1/6 = 0.16666666666666666.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2021/12/21/frog2.jpg)
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 1, target = 7
Output: 0.3333333333333333
Explanation: The figure above shows the given graph. The frog starts at vertex 1, jumping with 1/3 = 0.3333333333333333 probability to the vertex 7 after second 1.
```

---

## 3. Approach

```
FUNCTION frogPosition(n, edges, t, target):
    adj ← adjacency list from edges
    prob ← [0] * (n + 1); prob[1] ← 1.0
    visited ← {1}
    queue ← [1]

    FOR step ← 1 TO t DO
        nextQueue ← []
        FOR node IN queue DO
            children ← [c for c in adj[node] if c NOT IN visited]
            IF LENGTH(children) == 0:
                CONTINUE
            FOR child IN children DO
                prob[child] ← prob[node] / LENGTH(children)
                visited.ADD(child)
                nextQueue.ADD(child)
            prob[node] ← 0
        queue ← nextQueue

    RETURN prob[target]
```

---

## 4. Walkthrough

**Example 1:** `n=7`, `t=1`, `target=2`
1. Start at node `1` with probability `1.0`.
2. Node `1` has three unvisited neighbors `[2,3,7]`.
3. Probability to each child = `1.0 / 3 = 0.33`.
4. After 1 second, frog is at node `2` with `0.33` probability.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 6. Follow-Up Questions

1. How would the solution change if the frog could revisit nodes?
2. What if the tree were weighted and jump probabilities depended on edge weights?

---

## 7. Key Takeaway

> BFS level by level, distributing probability equally among unvisited children. If the frog reaches a leaf before time `t`, it stays there (probability persists).

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

An undirected tree with `n` nodes. A frog starts at node 1. Each second, it jumps to a random unvisited neighbor (with equal probability). After `t` seconds, find the probability it's on node `target`.

**Constraints:**
- `1 <= n <= 100`
- `1 <= t <= 50`

---

## 2. Examples

| n | edges | t | target | probability |
|---|-------|---|--------|-------------|
| 7 | `[[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]]` | 1 | 2 | `0.33` |
| 7 | `[[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]]` | 2 | 4 | `0.1667` |

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

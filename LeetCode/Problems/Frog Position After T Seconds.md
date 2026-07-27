# 1377. Frog Position After T Seconds

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frog-position-after-t-seconds](https://leetcode.com/problems/frog-position-after-t-seconds)
**Companies:** Google, Inmobi

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS on Tree — O(n) ✅](#3-approach-bfs-on-tree--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

An undirected tree with `n` nodes. A frog starts at node 1. Each second, it jumps to a random unvisited neighbor (with equal probability). After `t` seconds, find the probability it's on node `target`.

**Constraints:**
- `1 <= n <= 100`
- `1 <= t <= 50`

---

## 2. Key Insight

> BFS from node 1, tracking probability at each node. At each step, the frog's probability is divided equally among unvisited children. If the frog reaches a leaf (no unvisited neighbors) it stays there.

---

## 3. Approach: BFS on Tree — O(n) ✅

```
FUNCTION frogPosition(n, edges, t, target):
    adj ← adjacency list from edges
    prob ← [0] * (n + 1); prob[1] ← 1.0
    visited ← {1}
    queue ← [1]

    FOR step ← 1 TO t DO
        nextQueue ← []
        FOR node IN queue DO
            children ← [c for c in adj[node] if c not in visited]
            IF LENGTH(children) == 0 THEN CONTINUE
            FOR child IN children DO
                prob[child] ← prob[node] / LENGTH(children)
                visited.ADD(child)
                nextQueue.ADD(child)
            prob[node] ← 0    // frog moved away
        queue ← nextQueue

    RETURN prob[target]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> BFS level by level, distributing probability equally among unvisited children. If the frog reaches a leaf before time `t`, it stays there (probability persists).

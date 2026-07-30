# 305. Number of Islands II

**Difficulty:** 🔴 Hard
**Acceptance:** 37.0%
**LeetCode:** [https://leetcode.com/problems/number-of-islands-ii](https://leetcode.com/problems/number-of-islands-ii)
**Companies:** Amazon, Aurora, Google, Meta, Moloco, Phonepe, Tiktok, Uber, Walmart Labs, Waymo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(L·α(mn))](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m × n` grid initially filled with water, a list of positions adds land one by one. After each addition, report the current number of islands.

---

## 2. Key Insight

> Treat each newly added land cell as a new component (+1 island). Then union it with any adjacent land cells, decreasing the count for each successful merge. Union‑Find efficiently maintains component connectivity in an online fashion.

---

## 3. Approach: Union-Find — O(L·α(mn)) ✅

```text
FUNCTION numIslands2(m, n, positions):
    parent ← MAP()
    rank ← MAP()
    count ← 0
    result ← []

    FOR (r, c) IN positions:
        IF (r, c) IN parent:
            APPEND count TO result
            CONTINUE
        parent[(r,c)] ← (r,c)
        rank[(r,c)] ← 0
        count ← count + 1
        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            nr ← r + dr
            nc ← c + dc
            IF (nr, nc) IN parent:
                IF union((r,c), (nr,nc)):
                    count ← count - 1
        APPEND count TO result

    RETURN result

FUNCTION find(x):
    WHILE parent[x] != x:
        parent[x] ← parent[parent[x]]   // path compression
        x ← parent[x]
    RETURN x

FUNCTION union(a, b):
    ra ← find(a)
    rb ← find(b)
    IF ra == rb: RETURN FALSE
    // union by rank
    IF rank[ra] < rank[rb]:
        parent[ra] ← rb
    ELSE IF rank[ra] > rank[rb]:
        parent[rb] ← ra
    ELSE:
        parent[rb] ← ra
        rank[ra] ← rank[ra] + 1
    RETURN TRUE
```

---

## 4. Examples

| `m` | `n` | `positions` | Output | Explanation |
|-----|-----|-------------|--------|-------------|
| 3 | 3 | `[[0,0],[0,1],[1,2],[2,1]]` | `[1,1,2,3]` | After each addition, islands count evolves as shown. |
| 1 | 1 | `[[0,0],[0,0]]` | `[1,1]` | Adding land to an existing island does not change count.

---

## 5. Walkthrough

Consider `m=3, n=3, positions=[[0,0],[0,1],[1,2],[2,1]]`.

1. Add `(0,0)`: new island → count=1.
2. Add `(0,1)`: adjacent to `(0,0)`, union merges them → count stays 1.
3. Add `(1,2)`: isolated → count=2.
4. Add `(2,1)`: isolated → count=3.

The `result` list `[1,1,2,3]` matches the output.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(L·α(m·n)) — near‑linear per addition |
| **Space** | O(m·n) for parent and rank maps |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to support removal of land cells?
- Can you extend the solution to count the size of each island after every addition?
- What changes are needed if diagonal adjacency also connects islands?

---

## 8. Key Takeaway

> **Union‑Find for dynamic connectivity.** Each land addition creates a component, then merges with neighboring components, giving an online island count.

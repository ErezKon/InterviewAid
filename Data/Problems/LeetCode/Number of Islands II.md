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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an empty 2D binary grid `grid` of size `m x n`. The grid represents a map where `0`'s represent water and `1`'s represent land. Initially, all the cells of `grid` are water cells (i.e., all the cells are `0`'s).

We may perform an add land operation which turns the water at position into a land. You are given an array `positions` where `positions[i] = [r_i, c_i]` is the position `(r_i, c_i)` at which we should operate the `i^th` operation.

Return *an array of integers* `answer` *where* `answer[i]` *is the number of islands after turning the cell* `(r_i, c_i)` *into a land*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Follow up:** Could you solve it in time complexity `O(k log(mn))`, where `k == positions.length`?

**Constraints:**
- `1 <= m, n, positions.length <= 10^4`
- `1 <= m * n <= 10^4`
- `positions[i].length == 2`
- `0 <= r_i < m`
- `0 <= c_i < n`

---

## 2. Key Insight

> Treat each newly added land cell as a new component (+1 island). Then union it with any adjacent land cells, decreasing the count for each successful merge. Union-Find efficiently maintains component connectivity in an online fashion.

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

**Example 1:**
```
Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
Explanation: Initially, the 2d grid is filled with water.
- Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land. We have 1 island.
- Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land. We still have 1 island.
- Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land. We have 2 islands.
- Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land. We have 3 islands.
```

**Example 2:**
```
Input: m = 1, n = 1, positions = [[0,0]]
Output: [1]
```

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
| **Time** | O(L·α(m·n)) — near-linear per addition |
| **Space** | O(m·n) for parent and rank maps |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to support removal of land cells?
- Can you extend the solution to count the size of each island after every addition?
- What changes are needed if diagonal adjacency also connects islands?

---

## 8. Key Takeaway

> **Union-Find for dynamic connectivity.** Each land addition creates a component, then merges with neighboring components, giving an online island count.

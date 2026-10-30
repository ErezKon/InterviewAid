# 947. Most Stones Removed with Same Row or Column

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-stones-removed-with-same-row-or-column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column)
**Companies:** Amazon, Bloomberg, Google, Medianet, Meta, Microsoft, Phonepe, Snapchat, Snowflake, Tekion

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(n · α(n))](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either **the same row or the same column** as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [x_i, y_i]` represents the location of the `i^th` stone, return *the largest possible number of stones that can be removed*.

**Constraints:**
- `1 <= stones.length <= 1000`
- `0 <= x_i, y_i <= 10^4`
- No two stones are at the same coordinate point.

---

## 2. Key Insight

> Stones sharing a row or column are "connected." Within each connected component of `k` stones, we can remove `k - 1` (leaving one). Answer = `total stones - number of connected components`.

---

## 3. Approach: Union-Find — O(n · α(n)) ✅

```text
FUNCTION removeStones(stones):
    uf ← UnionFind()
    FOR each [r, c] IN stones:
        // Union row index with column index (offset column to avoid collision)
        uf.union(r, c + 10001)
    // Count unique roots among all row and column nodes used
    roots ← SET()
    FOR each [r, c] IN stones:
        roots.ADD(uf.find(r))
        roots.ADD(uf.find(c + 10001))
    numComponents ← SIZE(roots)
    RETURN LENGTH(stones) - numComponents
```

---

## 4. Examples

**Example 1:**
```
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
```

**Example 2:**
```
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
```

**Example 3:**
```
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.
```

---

## 5. Walkthrough

We illustrate the first example step‑by‑step.

| Step | Operation | Union‑Find State (representative roots) |
|------|-----------|------------------------------------------|
| 1 | Initialize Union‑Find | each row and column is its own set |
| 2 | Union (0,0) → union(0, 0+10001) | {0 ↔ 10001}
| 3 | Union (0,1) → union(0, 1+10001) | {0 ↔ 10001, 0 ↔ 10002} → rows 0, columns 0 & 1 share root 0 |
| 4 | Union (1,0) → union(1, 0+10001) | connects row 1 to the existing component via column 0 |
| 5 | Union (1,2) → union(1, 2+10001) | adds column 2 to the component |
| 6 | Union (2,1) → union(2, 1+10001) | connects row 2 to component via column 1 |
| 7 | Union (2,2) → union(2, 2+10001) | all nodes now share a single root |

After processing all stones, there is **1** connected component. Hence answer = 6 stones – 1 component = **5**.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · α(n)) — near‑linear Union‑Find |
| **Space** | O(n) |

---

## 7. Key Takeaway

> **Union rows with columns via Union‑Find.** Each stone connects its row and column. The answer = stones − components. Offset columns by 10001 to avoid collision with row indices.

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

Remove a stone if it shares a row or column with another remaining stone. Return the **maximum** stones that can be removed.

**Constraints:**
- `1 <= stones.length <= 1000`

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
Explanation: One possible removal order leaves the stone at (2,2) as the last stone.
```

**Example 2:**
```
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: Remove stones sharing rows/columns until three stones remain.
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

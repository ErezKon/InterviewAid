# 1267. Count Servers that Communicate

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-servers-that-communicate](https://leetcode.com/problems/count-servers-that-communicate)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid where `1` represents a server and `0` is empty, count the number of servers that can communicate with at least one other server. Two servers communicate if they are in the **same row or same column**.

**Constraints:**
- `1 <= m, n <= 250`

---

## Examples

**Example 1:**
- **Input:** `grid = [[1,0],[1,1]]`
- **Output:** `3`
- **Explanation:** All three servers can communicate (row 1 has two, and (0,0) shares column 0 with (1,0)).

**Example 2:**
- **Input:** `grid = [[1,0],[0,1]]`
- **Output:** `0`
- **Explanation:** Neither server shares a row or column with another.

---

## Key Insight

A server communicates iff its row or column has **more than one** server. First count servers per row and per column. Then a second pass checks each server against these counts.

---

## Approach

```
FUNCTION countServers(grid):
    rowCount = [0] * m
    colCount = [0] * n
    FOR r, c where grid[r][c] == 1:
        rowCount[r] += 1
        colCount[c] += 1

    count = 0
    FOR r, c where grid[r][c] == 1:
        IF rowCount[r] > 1 OR colCount[c] > 1:
            count += 1
    RETURN count
```

---

## Walkthrough

**Input:** `grid = [[1,1,0],[0,0,1],[0,0,1]]`

```
rowCount = [2, 1, 1]
colCount = [1, 1, 2]

Server (0,0): rowCount[0]=2 > 1 → communicates ✅
Server (0,1): rowCount[0]=2 > 1 → communicates ✅
Server (1,2): colCount[2]=2 > 1 → communicates ✅
Server (2,2): colCount[2]=2 > 1 → communicates ✅

Result: 4
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) — two passes over the grid |
| **Space** | O(m + n) — row and column count arrays |

---

## Follow-Up Questions

**Q1: Why not use Union-Find?**
Union-Find works but is overkill. The row/column count approach is simpler and O(m×n) with no extra log factor.

**Q2: How does this differ from counting connected components?**
We don't need connected components — we just need to know if a server has *any* neighbor in the same row/column. The count arrays give this in O(1) per server.

**Q3: What if communication required direct adjacency?**
Then you'd need BFS/DFS or Union-Find for connected component detection, since row/column sharing wouldn't be sufficient.

---

## Key Takeaway

> **When the connectivity rule is "shares a row or column," precompute row/column counts in a first pass, then check each element against those counts. Two passes, O(m×n), no graph needed.**

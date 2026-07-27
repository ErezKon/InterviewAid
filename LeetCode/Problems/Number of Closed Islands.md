# 1254. Number of Closed Islands

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-closed-islands](https://leetcode.com/problems/number-of-closed-islands)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two-Pass DFS — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count **closed islands** — groups of `0`s completely surrounded by `1`s (not touching the border).

---

## 2. Key Insight

> First flood-fill all border-connected `0`s to eliminate non-closed islands. Then count remaining `0` components — each is a closed island.

---

## 3. Approach: Two-Pass DFS — O(m·n) ✅

```
FUNCTION closedIsland(grid):
    // Flood fill border-connected land first
    FOR r, c on border:
        IF grid[r][c] == 0:
            dfs(grid, r, c)    // mark as visited

    // Count remaining islands
    count = 0
    FOR r, c IN interior:
        IF grid[r][c] == 0:
            dfs(grid, r, c)
            count += 1

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — recursion stack |

---

## 5. Key Takeaway

> **Eliminate border-connected components first.** Two-pass DFS: first remove border islands, then count interior components. Same pattern as "Number of Enclaves".

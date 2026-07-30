# 2672. Number of Adjacent Elements With the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color](https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color)
**Companies:** Amazon, Capital One, Meta, Roblox, Tiktok, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Incremental Update — O(q)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Array of `n` elements, initially uncolored. Process queries that set `colors[idx] = color`. After each query, report the count of adjacent same-color pairs.

---

## 2. Examples

**Example 1:**
```
n = 4, queries = [[0,1],[1,2],[1,1],[2,1]]
Output: [0,0,1,2]
```
Explanation: Initially all zeros → 0 pairs. After first query, colors = [1,0,0,0] → 0 pairs. After second, colors = [1,2,0,0] → 0 pairs. After third, colors = [1,1,0,0] → pair (0,1) matches → 1. After fourth, colors = [1,1,1,0] → pairs (0,1) and (1,2) match → 2.

**Example 2:**
```
n = 3, queries = [[0,5],[2,5],[1,5]]
Output: [0,0,2]
```
Explanation: After first two queries, colors = [5,0,5] → no adjacent matches. After third, colors = [5,5,5] → pairs (0,1) and (1,2) match → 2.

---

## 3. Key Insight

> Maintain a running count. Before changing a color, subtract its old adjacency contributions. After setting the new color, add new contributions. Only neighbors at `idx-1` and `idx+1` are affected.

---

## 4. Approach: Incremental Update — O(q) ✅

```text
FUNCTION colorTheArray(n, queries):
    SET colors ← ARRAY of size n filled with 0
    SET same ← 0
    SET result ← []

    FOR each [idx, color] IN queries:
        // Remove old adjacency contributions
        IF colors[idx] != 0:
            IF idx > 0 AND colors[idx] == colors[idx-1]:
                SET same ← same - 1
            IF idx < n-1 AND colors[idx] == colors[idx+1]:
                SET same ← same - 1
        // Apply new color
        SET colors[idx] ← color
        // Add new adjacency contributions
        IF idx > 0 AND colors[idx] == colors[idx-1]:
            SET same ← same + 1
        IF idx < n-1 AND colors[idx] == colors[idx+1]:
            SET same ← same + 1
        APPEND same TO result
    RETURN result
```

---

## 5. Walkthrough

Consider Example 1 step‑by‑step:

| Query | colors after update | Adjacent same‑color pairs | `same` value |
|-------|---------------------|---------------------------|-------------|
| [0,1] | [1,0,0,0] | none | 0 |
| [1,2] | [1,2,0,0] | none | 0 |
| [1,1] | [1,1,0,0] | pair (0,1) | 1 |
| [2,1] | [1,1,1,0] | pairs (0,1) and (1,2) | 2 |

The algorithm updates `same` only using the two neighbors of the changed index, matching the table above.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(q) — constant work per query |
| **Space** | O(n) for the `colors` array |

---

## 7. Key Takeaway

> **Incremental delta tracking.** Remove old contributions before update, add new ones after. Each query only affects at most 2 neighbor pairs → O(1) per query.

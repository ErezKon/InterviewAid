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

You are given an integer `n` representing an array `colors` of length `n` where all elements are set to 0's meaning **uncolored**. You are also given a 2D integer array `queries` where `queries[i] = [index_i, color_i]`. For the `i^th` **query**:

- Set `colors[index_i]` to `color_i`.
- Count the number of adjacent pairs in `colors` which have the same color (regardless of `color_i`).

Return an array `answer` of the same length as `queries` where `answer[i]` is the answer to the `i^th` query.

**Constraints:**

- `1 <= n <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `0 <= index_i <= n - 1`
- `1 <= color_i <= 10^5`

---

## 2. Examples

```
Example 1:
  Input: n = 4, queries = [[0,2],[1,2],[3,1],[1,1],[2,1]]
  Output: [0,1,1,0,2]
  Explanation:
  - Initially array colors = [0,0,0,0], where 0 denotes uncolored elements of the array.
  - After the 1st query colors = [2,0,0,0]. The count of adjacent pairs with the same color is 0.
  - After the 2nd query colors = [2,2,0,0]. The count of adjacent pairs with the same color is 1.
  - After the 3rd query colors = [2,2,0,1]. The count of adjacent pairs with the same color is 1.
  - After the 4th query colors = [2,1,0,1]. The count of adjacent pairs with the same color is 0.
  - After the 5th query colors = [2,1,1,1]. The count of adjacent pairs with the same color is 2.
```

```
Example 2:
  Input: n = 1, queries = [[0,100000]]
  Output: [0]
  Explanation: After the 1st query colors = [100000]. The count of adjacent pairs with the same color is 0.
```

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

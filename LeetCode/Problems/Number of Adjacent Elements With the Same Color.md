# 2672. Number of Adjacent Elements With the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color](https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color)
**Companies:** Amazon, Capital One, Meta, Roblox, Tiktok, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Incremental Update — O(q)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Array of `n` elements, initially uncolored. Process queries that set `colors[idx] = color`. After each query, report the count of adjacent same-color pairs.

---

## 2. Key Insight

> Maintain a running count. Before changing a color, subtract its old adjacency contributions. After setting the new color, add new contributions. Only neighbors at `idx-1` and `idx+1` are affected.

---

## 3. Approach: Incremental Update — O(q) ✅

```
FUNCTION colorTheArray(n, queries):
    colors = [0] * n
    same = 0
    result = []

    FOR [idx, color] IN queries:
        // Remove old adjacent matches
        IF colors[idx] != 0:
            IF idx > 0 AND colors[idx] == colors[idx-1]: same -= 1
            IF idx < n-1 AND colors[idx] == colors[idx+1]: same -= 1

        colors[idx] = color

        // Add new adjacent matches
        IF idx > 0 AND colors[idx] == colors[idx-1]: same += 1
        IF idx < n-1 AND colors[idx] == colors[idx+1]: same += 1

        result.ADD(same)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(q) — O(1) per query |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Incremental delta tracking.** Remove old contributions before update, add new ones after. Each query only affects at most 2 neighbor pairs → O(1) per query.

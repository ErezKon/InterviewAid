# 2606. Find the Substring With Maximum Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-substring-with-maximum-cost](https://leetcode.com/problems/find-the-substring-with-maximum-cost)
**Companies:** Amazon, Josh Technology

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Kadane's Algorithm — O(n) ✅](#3-approach-kadanes-algorithm--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a string `s` and optional `chars`/`vals` mapping overriding character values (default: 'a'=1, 'b'=2, ...), find the **maximum cost** of any substring. Cost = sum of character values.

**Constraints:**
- `1 <= s.length <= 10⁵`

---

## 2. Key Insight

> Map each character to its value, then apply Kadane's algorithm to find the maximum subarray sum.

---

## 3. Approach: Kadane's Algorithm — O(n) ✅

```
FUNCTION maximumCostSubstring(s, chars, vals):
    // Build value mapping
    value ← default: c → ord(c) - ord('a') + 1
    FOR i, c IN enumerate(chars): value[c] ← vals[i]

    maxCost ← 0; current ← 0
    FOR c IN s DO
        current ← MAX(0, current + value[c])
        maxCost ← MAX(maxCost, current)

    RETURN maxCost
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Map characters to values, then apply **Kadane's algorithm** for maximum subarray sum. The minimum cost is 0 (empty substring).

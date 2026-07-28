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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
FUNCTION maximumCostSubstring(s, chars, vals):
    // Build value mapping
    value ← default: c → ord(c) - ord('a') + 1
    FOR i, c IN enumerate(chars):
        value[c] ← vals[i]

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

## 5. Examples

**Example 1:**
```
Input: s = "abcd", chars = ["a","b"], vals = [1,2]
Output: 10
Explanation: Values are a=1, b=2, c=3, d=4. The whole string gives maximum cost 1+2+3+4=10.
```

**Example 2:**
```
Input: s = "zz", chars = [], vals = []
Output: 52
Explanation: Each 'z' has value 26, so best substring is "zz" with cost 52.
```

---

## 6. Walkthrough

| Step | Index | Char | Value | Current Sum | Max Cost |
|------|-------|------|-------|-------------|----------|
| 1 | 0 | 'z' | 26 | 26 | 26 |
| 2 | 1 | 'z' | 26 | 52 | 52 |

The algorithm accumulates the sum and resets to 0 when negative, yielding 52 as maximum.

---

## 7. Follow-Up Questions

- How would you modify the solution if substrings must be of length at least `k`?
- Can you extend this to 2‑D grids where you need the maximum‑cost sub‑matrix?
- What if the cost function is non‑linear, e.g., product of values?

---

## 8. Key Takeaway

> Map characters to values, then apply **Kadane's algorithm** for maximum subarray sum. The minimum cost is 0 (empty substring).
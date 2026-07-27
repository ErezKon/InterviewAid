# 1980. Find Unique Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-unique-binary-string](https://leetcode.com/problems/find-unique-binary-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Cantor's Diagonalization — O(n) ✅](#3-approach-cantors-diagonalization--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` unique binary strings of length `n`, return a binary string of length `n` that is **not** in `nums`. Multiple answers may exist.

**Constraints:**
- `1 <= n <= 16`

---

## 2. Key Insight

> Cantor's diagonalization: flip the i-th bit of the i-th string. The result differs from string `i` at position `i`, so it can't equal any input string.

---

## 3. Approach: Cantor's Diagonalization — O(n) ✅

```
FUNCTION findDifferentBinaryString(nums):
    // Cantor's diagonalization
    result = ""
    FOR i, s IN enumerate(nums):
        result += '0' IF s[i] == '1' ELSE '1'
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Cantor's diagonalization** guarantees a unique result in O(n) — a beautiful application of set theory to coding problems.

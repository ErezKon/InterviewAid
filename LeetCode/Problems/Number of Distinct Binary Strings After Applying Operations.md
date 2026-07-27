# 2450. Number of Distinct Binary Strings After Applying Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations](https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given binary string `s` of length `n` and integer `k`, you can flip any substring of length `k`. Return the number of distinct strings reachable.

---

## 2. Key Insight

> Each flip of a window of length `k` toggles those bits. The reachable set has size `2^(n - k + 1)` — we can independently control `n - k + 1` positions.

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION countDistinctStrings(s, k):
    RETURN pow(2, len(s) - k + 1) % (10^9 + 7)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) for modular exponentiation |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Each window position gives independent control.** The answer is simply `2^(n - k + 1)` — a pure math problem disguised as string manipulation.

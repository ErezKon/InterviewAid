# 1621. Number of Sets of K Non-Overlapping Line Segments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` points on a line, choose `k` non-overlapping segments. Count valid selections mod 10⁹+7.

---

## 2. Key Insight

> This is equivalent to choosing `2k` endpoints from `n + k - 1` positions (stars and bars). Answer = C(n + k - 1, 2k).

---

## 3. Approach: Combinatorics — O(1) ✅

```
FUNCTION numberOfSets(n, k):
    MOD = 10^9 + 7
    // C(n + k - 1, 2k) mod MOD
    RETURN comb(n + k - 1, 2 * k) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) for computing combination |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Stars and bars transformation.** Allow shared endpoints by adding `k-1` dummy points, converting to a simple combination. C(n+k-1, 2k).

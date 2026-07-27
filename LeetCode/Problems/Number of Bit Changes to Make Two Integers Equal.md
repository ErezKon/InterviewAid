# 3226. Number of Bit Changes to Make Two Integers Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal](https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal)
**Companies:** Thoughtworks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bit Manipulation — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` and `k`, you can only change 1-bits of `n` to 0. Return the number of changes needed to make `n == k`, or `-1` if impossible.

---

## 2. Key Insight

> Impossible if `k` has a 1-bit where `n` has 0 (can't set 0→1). Otherwise, count bits that are 1 in `n` but 0 in `k`: `popcount(n & ~k)`. Check `(k & ~n) == 0` for validity.

---

## 3. Approach: Bit Manipulation — O(1) ✅

```
FUNCTION minChanges(n, k):
    IF (k & ~n) != 0: RETURN -1    // k has bit n doesn't have
    RETURN popcount(n ^ k)         // bits that differ (all are 1→0)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **One-directional bit flips.** Only 1→0 allowed. Check feasibility with `k & ~n`, count changes with `popcount(n ^ k)`.

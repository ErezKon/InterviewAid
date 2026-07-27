# 3783. Mirror Distance of an Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/mirror-distance-of-an-integer](https://leetcode.com/problems/mirror-distance-of-an-integer)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Reverse Digits — O(d)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an integer `n`, the "mirror" of `n` is the number formed by reversing its digits. Return the **absolute difference** between `n` and its mirror.

**Constraints:**
- `1 <= n <= 10⁹`

---

## 2. Key Insight

> Simply reverse the digits of `n` and compute `|n - reverse(n)|`.

---

## 3. Approach: Reverse Digits — O(d) ✅

```
FUNCTION mirrorDistance(n):
    rev = 0; x = n
    WHILE x > 0:
        rev = rev * 10 + x % 10
        x = x / 10
    RETURN ABS(n - rev)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d) — d = number of digits |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Digit reversal** — extract digits with mod/div, build reversed number. Basic math operation.

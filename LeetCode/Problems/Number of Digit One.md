# 233. Number of Digit One

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-digit-one](https://leetcode.com/problems/number-of-digit-one)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Digit DP — O(log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the total number of digit `1` appearing in all non-negative integers ≤ `n`.

---

## 2. Key Insight

> For each digit position, the count of `1`s depends on the digits above (higher), at (curr), and below (lower). Three cases: curr=0, curr=1, curr≥2.

---

## 3. Approach: Digit DP — O(log n) ✅

```
FUNCTION countDigitOne(n):
    count = 0
    factor = 1

    WHILE factor <= n:
        lower = n % factor
        curr = (n / factor) % 10
        higher = n / (factor * 10)

        IF curr == 0: count += higher * factor
        ELSE IF curr == 1: count += higher * factor + lower + 1
        ELSE: count += (higher + 1) * factor

        factor *= 10

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — one pass per digit |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Per-position digit counting.** For each decimal position, count 1s contributed by higher/current/lower digits. Three cases based on whether the current digit is 0, 1, or ≥2.

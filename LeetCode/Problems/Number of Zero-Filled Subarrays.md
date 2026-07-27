# 2348. Number of Zero-Filled Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-zero-filled-subarrays](https://leetcode.com/problems/number-of-zero-filled-subarrays)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Consecutive Zeros — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays filled entirely with zeros.

---

## 2. Key Insight

> A run of `k` consecutive zeros contributes `k*(k+1)/2` subarrays. Incrementally add `consecutive` at each zero.

---

## 3. Approach: Count Consecutive Zeros — O(n) ✅

```
FUNCTION zeroFilledSubarray(nums):
    count = 0
    consecutive = 0

    FOR num IN nums:
        IF num == 0:
            consecutive += 1
            count += consecutive
        ELSE:
            consecutive = 0

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Running count for consecutive elements.** Each new zero extends all subarrays ending here. Same pattern as "Number of Substrings With Only 1s".

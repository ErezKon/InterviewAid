# 961. N-Repeated Element in Size 2N Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-repeated-element-in-size-2n-array](https://leetcode.com/problems/n-repeated-element-in-size-2n-array)
**Companies:** Akamai, Amazon, Bloomberg, Google, Meta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Set — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Array of size `2n` has `n+1` unique elements, one of which appears `n` times. Return the element that appears `n` times.

---

## 2. Key Insight

> Since one element appears n times and the rest appear once, the first duplicate we find is the answer.

---

## 3. Approach: Hash Set — O(n) ✅

```
FUNCTION repeatedNTimes(nums):
    seen = set()
    FOR num IN nums:
        IF num IN seen: RETURN num
        seen.ADD(num)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **First duplicate = n-repeated element.** With n+1 unique values and 2n slots, the repeated element must appear as a duplicate early.

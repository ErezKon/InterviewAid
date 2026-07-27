# 1052. Grumpy Bookstore Owner

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grumpy-bookstore-owner](https://leetcode.com/problems/grumpy-bookstore-owner)
**Companies:** Amazon, Bloomberg, Capital One, Google, Ibm, Meta, Microsoft, Nutanix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n) ✅](#3-approach-sliding-window--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

A bookstore owner can suppress grumpiness for `minutes` consecutive minutes once. Maximize total satisfied customers.

---

## 2. Key Insight

> Base satisfied = sum when not grumpy. Extra satisfied = grumpy-minute customers "saved" by the technique. Slide a window of size `minutes` over grumpy slots to maximize extra.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION maxSatisfied(customers, grumpy, minutes):
    // Base: customers when owner is not grumpy
    base = SUM(customers[i] for i where grumpy[i] == 0)

    // Sliding window: find best window of 'minutes' to suppress grumpiness
    extra = SUM(customers[i] for i in range(minutes) if grumpy[i] == 1)
    maxExtra = extra

    FOR i ← minutes TO n - 1:
        IF grumpy[i] == 1: extra += customers[i]
        IF grumpy[i - minutes] == 1: extra -= customers[i - minutes]
        maxExtra = MAX(maxExtra, extra)

    RETURN base + maxExtra
```

---

## 4. Key Takeaway

> Fixed-size sliding window over "salvageable" customers. Answer = base + max window sum.

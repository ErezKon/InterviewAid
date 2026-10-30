# 1052. Grumpy Bookstore Owner

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grumpy-bookstore-owner](https://leetcode.com/problems/grumpy-bookstore-owner)
**Companies:** Amazon, Bloomberg, Capital One, Google, Ibm, Meta, Microsoft, Nutanix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n) ✅](#3-approach-sliding-window)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There is a bookstore owner that has a store open for `n` minutes. You are given an integer array `customers` of length `n` where `customers[i]` is the number of the customers that enter the store at the start of the `i`th minute and all those customers leave after the end of that minute.

During certain minutes, the bookstore owner is grumpy. You are given a binary array `grumpy` where `grumpy[i]` is `1` if the bookstore owner is grumpy during the `i`th minute, and is `0` otherwise.

When the bookstore owner is grumpy, the customers entering during that minute are not **satisfied**. Otherwise, they are satisfied.

The bookstore owner knows a secret technique to remain **not grumpy** for `minutes` consecutive minutes, but this technique can only be used **once**.

Return the **maximum** number of customers that can be *satisfied* throughout the day.

**Constraints:**
- `n == customers.length == grumpy.length`
- `1 <= minutes <= n <= 2 * 10^4`
- `0 <= customers[i] <= 1000`
- `grumpy[i]` is either `0` or `1`.

---

## 2. Key Insight

> Base satisfied = sum when not grumpy. Extra satisfied = grumpy‑minute customers "saved" by the technique. Slide a window of size `minutes` over grumpy slots to maximize extra.

---

## 3. Approach: Sliding Window — O(n) ✅

```text
FUNCTION maxSatisfied(customers, grumpy, minutes):
    // Base: customers when owner is not grumpy
    base ← SUM(customers[i] FOR i WHERE grumpy[i] = 0)

    // Initial window sum of grumpy minutes
    extra ← SUM(customers[i] FOR i = 0 TO minutes-1 IF grumpy[i] = 1)
    maxExtra ← extra

    FOR i ← minutes TO LENGTH(customers)-1 DO
        IF grumpy[i] = 1: extra ← extra + customers[i]
        IF grumpy[i - minutes] = 1: extra ← extra - customers[i - minutes]
        maxExtra ← MAX(maxExtra, extra)

    RETURN base + maxExtra
```

---

## 4. Examples

```
Example 1:
  Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
  Output: 16
  Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes.
  The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
```
```
Example 2:
  Input: customers = [1], grumpy = [0], minutes = 1
  Output: 1
```

---

## 5. Walkthrough

**Example 1**

1. Base satisfied = customers where `grumpy=0` → `1 + 1 + 1 + 7 = 10`.
2. Sliding window of size 3 over grumpy positions captures extra customers:
   - Window `[0,1,2]` adds `0` (since only index 1 is grumpy with 0 customers).
   - Window `[1,2,3]` adds `0 + 2 = 2`.
   - Window `[2,3,4]` adds `2`.
   - Window `[3,4,5]` adds `2 + 1 = 3`.
   - Window `[4,5,6]` adds `1`.
   - Window `[5,6,7]` adds `1 + 5 = 6` → **maxExtra = 6**.
3. Result = `base (10) + maxExtra (6) = 16`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass for base sum and sliding window.
- **Space:** O(1) – only a few integer variables.

---

## 7. Follow-Up Questions

1. How would the solution change if the owner could use the technique multiple times?
2. What if the suppression duration `minutes` could vary for each use?
3. Can we extend the approach to handle weighted satisfaction scores per minute?

---

## 8. Key Takeaway

> Fixed‑size sliding window over "salvageable" customers. Answer = base + max window sum.

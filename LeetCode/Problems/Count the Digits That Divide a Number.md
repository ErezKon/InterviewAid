# 2520. Count the Digits That Divide a Number

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Tcs

---

## Problem Description

Given an integer `num`, return the count of digits in `num` that divide `num` evenly.

---

## Approach

```
FUNCTION countDigits(num):
    RETURN SUM(1 for d in str(num) if num % int(d) == 0)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(d) where d = number of digits |
| **Space** | O(1) |

---

## Key Takeaway

> **Simple digit iteration with modulo check. Guaranteed no digit is 0 per constraints.**

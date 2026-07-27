# 66. Plus One

**Difficulty:** 🟢 Easy
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/plus-one](https://leetcode.com/problems/plus-one)
**Companies:** Accenture, Amazon, Bloomberg, Capgemini, Google, Ibm, Intuit, Meta, Microsoft, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

Given a large integer represented as an array of digits, increment it by one.

---

## 2. Approach: Right-to-Left Carry — O(n) ✅

```
FUNCTION plusOne(digits):
    FOR i ← len(digits) - 1 DOWN TO 0:
        IF digits[i] < 9:
            digits[i] += 1
            RETURN digits
        digits[i] = 0

    RETURN [1] + digits    // overflow (e.g., 999 → 1000)
```

| Time | Space |
|------|-------|
| O(n) | O(1) amortized |

---

## Key Takeaway

> Handle carry propagation. If a digit < 9, increment and return immediately. If all digits are 9, prepend a 1.

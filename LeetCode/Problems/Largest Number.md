# 179. Largest Number

**Difficulty:** 🟡 Medium
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/largest-number](https://leetcode.com/problems/largest-number)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Clevertap, Cvent, Google, Graviton, Infosys, Josh Technology, Meta, Microsoft, Myntra, Nvidia, Nykaa, Oracle, Servicenow, Tcs, Tiktok, Tracxn, Works Applications, Zoho

---

## 1. Problem Description

Given a list of non-negative integers `nums`, arrange them to form the largest number. Return as a string.

---

## 2. Approach: Custom Sort — O(n log n) ✅

Compare `a+b` vs `b+a` (string concatenation).

```
FUNCTION largestNumber(nums):
    strs = [str(n) for n in nums]

    // Custom comparator: a before b if a+b > b+a
    SORT strs with comparator: (a, b) → compare b+a vs a+b

    result = JOIN(strs)
    RETURN "0" IF result[0] == '0' ELSE result
```

Example: `[3, 30, 34, 5, 9]` → compare "330" vs "303" → 3 before 30 → "9534330"

| Time | Space |
|------|-------|
| O(n log n · k) where k = avg digit length | O(n) |

---

## Key Takeaway

> Custom comparator: `a+b > b+a` determines which should come first. This comparison is transitive, so sorting works correctly.

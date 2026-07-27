# 2843. Count Symmetric Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-symmetric-integers](https://leetcode.com/problems/count-symmetric-integers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

A symmetric integer has an even number of digits, and the sum of the first half of its digits equals the sum of the second half. Count symmetric integers in `[low, high]`.

**Constraints:**
- `1 <= low <= high <= 10^4`

---

## Approach

```
FUNCTION countSymmetricIntegers(low, high):
    count = 0
    FOR num ← low TO high:
        s = str(num)
        IF len(s) % 2 == 0:
            mid = len(s) / 2
            IF SUM(int(d) for d in s[:mid]) == SUM(int(d) for d in s[mid:]):
                count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O((high - low) × d) where d = number of digits |
| **Space** | O(1) |

---

## Key Takeaway

> **Small range (≤ 10^4) makes brute force perfectly fine. Split digits in half and compare sums.**

# 3340. Check Balanced String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-balanced-string](https://leetcode.com/problems/check-balanced-string)
**Companies:** Amazon

---

## 1. Problem Description

Given a string of digits, check if the sum of digits at even indices equals the sum at odd indices.

---

## 2. Approach: Single Pass — O(n) ✅

```
FUNCTION isBalanced(num):
    evenSum = oddSum = 0
    FOR i, ch IN enumerate(num):
        IF i % 2 == 0: evenSum += int(ch)
        ELSE: oddSum += int(ch)
    RETURN evenSum == oddSum
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Simple parity-indexed summation. One pass, two accumulators.

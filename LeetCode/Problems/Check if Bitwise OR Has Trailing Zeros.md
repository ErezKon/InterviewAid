# 2980. Check if Bitwise OR Has Trailing Zeros

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros](https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros)
**Companies:** Meituan

---

## 1. Problem Description

Given an array `nums`, return `true` if there exist two or more elements whose bitwise OR has trailing zeros (i.e., the OR result is even).

---

## 2. Key Insight

> OR of numbers has a trailing zero only if **all** operands are even (since OR preserves set bits). So we need at least 2 even numbers.

---

## 3. Approach: Count Even Numbers — O(n) ✅

```
FUNCTION hasTrailingZeros(nums):
    evenCount = COUNT(num for num in nums if num % 2 == 0)
    RETURN evenCount >= 2
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Bitwise OR has a trailing zero iff all operands have bit 0 unset (all even). Just count even numbers.

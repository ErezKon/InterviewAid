# 3688. Bitwise OR of Even Numbers in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array](https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array)
**Companies:** Meta, Microsoft

---

## 1. Problem Description

Given an array `nums`, return the bitwise OR of all even numbers. If no even numbers exist, return 0.

---

## 2. Approach: Filter + OR — O(n) ✅

```
FUNCTION bitwiseORofEvenNumbers(nums):
    result = 0
    FOR num IN nums:
        IF num % 2 == 0:
            result |= num
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Simple linear scan: filter even numbers and accumulate their bitwise OR.

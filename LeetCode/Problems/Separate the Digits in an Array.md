# 2553. Separate the Digits in an Array

**Difficulty:** 🟢 Easy

**Companies:** Google, Meta, Microsoft
---

## Problem Description

Given array `nums`, return an array of individual digits of each number in order.

---

## Approach

```
FUNCTION separateDigits(nums):
    RETURN [int(d) for num in nums for d in str(num)]
```

| Time | Space |
|------|-------|
| O(total digits) | O(total digits) |

# 2357. Make Array Zero by Subtracting Equal Amounts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts](https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts)
**Companies:** Amazon, Google

---

## 1. Problem Description

Each operation: pick a positive value `x`, subtract `x` from all positive elements. Minimum operations to make all elements zero.

---

## 2. Approach: Count Distinct Non-Zero — O(n) ✅

```
FUNCTION minimumOperations(nums):
    RETURN len(SET(x for x in nums if x > 0))
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Each operation eliminates all elements equal to the current minimum positive value. So the answer is simply the count of distinct positive values.

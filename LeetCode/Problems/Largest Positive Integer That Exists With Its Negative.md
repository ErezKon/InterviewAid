# 2441. Largest Positive Integer That Exists With Its Negative

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative](https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative)
**Companies:** Amazon, Bloomberg, Coupang, Google, Microsoft

---

## 1. Problem Description

Find the largest positive integer `k` such that both `k` and `-k` exist in `nums`. Return -1 if none.

---

## 2. Approach: Hash Set — O(n) ✅

```
FUNCTION findMaxK(nums):
    s = SET(nums)
    result = -1
    FOR num IN nums:
        IF num > 0 AND -num IN s:
            result = MAX(result, num)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Put all values in a set, then check each positive number for its negation. Track the maximum.

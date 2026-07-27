# 2455. Average Value of Even Numbers That Are Divisible by Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three](https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three)
**Companies:** Ibm

---

## 1. Problem Description

Given an integer array `nums`, return the average of all even integers divisible by 3 (i.e., divisible by 6). Return 0 if no such numbers.

---

## 2. Approach: Filter + Average — O(n) ✅

```
FUNCTION averageValue(nums):
    vals = [x for x in nums if x % 6 == 0]
    RETURN SUM(vals) // len(vals) IF vals ELSE 0
```

| Time | Space |
|------|-------|
| O(n) | O(1) with running sum |

---

## Key Takeaway

> Even AND divisible by 3 means divisible by 6. Simple filter-and-average.

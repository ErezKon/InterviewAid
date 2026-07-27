# 2442. Count Number of Distinct Integers After Reverse Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations](https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations)
**Companies:** Google

---

## 1. Problem Description

Given an array `nums`, for each element also add its digit-reversed version. Return the count of distinct integers in the resulting array.

---

## 2. Approach: Set with Reversal — O(n × d) ✅

```
FUNCTION countDistinctIntegers(nums):
    s = set(nums)
    FOR num IN nums:
        s.ADD(int(str(num)[::-1]))
    RETURN len(s)
```

| Time | Space |
|------|-------|
| O(n × d) | O(n) |

---

## Key Takeaway

> Add both each number and its reversal to a set. The set handles deduplication automatically.

# 303. Range Sum Query - Immutable

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/range-sum-query-immutable](https://leetcode.com/problems/range-sum-query-immutable)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Palantir, Tcs

---

## 1. Problem Description

Given an integer array `nums`, handle multiple queries: `sumRange(left, right)` = sum of `nums[left..right]`.

---

## 2. Approach: Prefix Sum — O(1) per query ✅

```
CLASS NumArray:
    CONSTRUCTOR(nums):
        prefix = [0] * (len(nums) + 1)
        FOR i ← 0 TO len(nums) - 1:
            prefix[i + 1] = prefix[i] + nums[i]

    FUNCTION sumRange(left, right):
        RETURN prefix[right + 1] - prefix[left]
```

| Operation | Time |
|-----------|------|
| Constructor | O(n) |
| sumRange | O(1) |

---

## Key Takeaway

> Prefix sum converts range sum queries from O(n) to O(1). `sum(l,r) = prefix[r+1] - prefix[l]`. Fundamental technique used in many problems.

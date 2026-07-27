# 321. Create Maximum Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-maximum-number](https://leetcode.com/problems/create-maximum-number)
**Companies:** Accolite, Amazon, Bloomberg, Flipkart, Google, Microsoft, Oracle

---

## Problem Description

Given two arrays of digits, create the maximum number of length `k` by selecting digits from both arrays while preserving relative order within each array.

---

## Key Insight

Try all ways to split `k` digits between the two arrays: `i` from `nums1` and `k-i` from `nums2`. For each split, find the max subsequence from each array (monotonic stack), merge them optimally, and keep the best result.

---

## Approach: Monotonic Stack + Merge — O(k·(m+n)) ✅

```
FUNCTION maxNumber(nums1, nums2, k):
    result = [0] * k

    FOR i ← MAX(0, k - len(nums2)) TO MIN(k, len(nums1)):
        sub1 = maxSubsequence(nums1, i)
        sub2 = maxSubsequence(nums2, k - i)
        merged = merge(sub1, sub2)
        result = MAX(result, merged)

    RETURN result

FUNCTION maxSubsequence(nums, k):
    stack = []
    drop = len(nums) - k
    FOR num IN nums:
        WHILE drop > 0 AND stack AND stack[-1] < num:
            stack.POP()
            drop -= 1
        stack.PUSH(num)
    RETURN stack[:k]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(k × (m + n)) |
| **Space** | O(m + n) |

---

## Key Takeaway

> **Maximum number from two arrays: enumerate splits, use monotonic stack for max subsequence per array, then merge greedily (compare remaining suffixes to break ties). Three classic subroutines combined.**

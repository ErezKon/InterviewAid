# 2779. Maximum Beauty of an Array After Applying Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation](https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation)
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Sliding Window — O(n log n)](#approach-sort--sliding-window--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, you can change each element by at most `k` (add or subtract). The **beauty** is the length of the longest subsequence of equal elements after operations. Maximize the beauty.

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## Key Insight

> After the operation, element `nums[i]` can become any value in `[nums[i]-k, nums[i]+k]`. Two elements can be made equal if their ranges overlap, i.e., `|nums[i] - nums[j]| ≤ 2k`. Sort the array and use a sliding window to find the longest subarray where `nums[right] - nums[left] ≤ 2k`.

---

## Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION maximumBeauty(nums, k):
    SORT nums
    left = 0; result = 0
    FOR right ← 0 TO n - 1:
        WHILE nums[right] - nums[left] > 2 * k:
            left += 1
        result = MAX(result, right - left + 1)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Sliding Window | **O(n log n)** | O(1) |

---

## Key Takeaway

> **"Each element can vary by ±k" means two elements can match if their difference ≤ 2k.** Sort and find the longest window within this range.

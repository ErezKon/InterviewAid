# 1822. Sign of the Product of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sign-of-the-product-of-an-array](https://leetcode.com/problems/sign-of-the-product-of-an-array)
**Companies:** Amazon, Meta, Microsoft

---

## Problem Description

Implement a function `signFunc(x)` that returns `1` if `x` is positive, `-1` if `x` is negative, and `0` if `x` is zero.

Given an integer array `nums`, let `product` be the product of all values in `nums`. Return `signFunc(product)`.

### Examples

**Example 1:**
- **Input:** `nums = [-1,-2,-3,-4,3,2,1]`
- **Output:** `1`
- **Explanation:** Product is `144`, sign is positive.

**Example 2:**
- **Input:** `nums = [1,5,0,2,-3]`
- **Output:** `0`
- **Explanation:** Product is `0` (contains zero).

**Example 3:**
- **Input:** `nums = [-1,1,-1,1,-1]`
- **Output:** `-1`
- **Explanation:** Product is `-1`, sign is negative (odd number of negatives).

### Constraints

- `1 <= nums.length <= 1000`
- `-100 <= nums[i] <= 100`

---

## Approach: Count Negatives — O(n) ✅

No need to compute the actual product (overflow risk). Just check for zeros and count negatives.

```
FUNCTION arraySign(nums):
    neg = SUM(1 for x in nums if x < 0)
    IF any(x == 0 for x in nums): RETURN 0
    RETURN -1 IF neg % 2 ELSE 1
```

### Walkthrough — `nums = [-1,-2,-3,-4,3,2,1]`

- Zero check: no zeros found
- Negative count: 4 (even)
- Result: `1`

| Time | Space |
|------|-------|
| O(n) | O(1) |

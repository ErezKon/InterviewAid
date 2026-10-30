# 1822. Sign of the Product of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sign-of-the-product-of-an-array](https://leetcode.com/problems/sign-of-the-product-of-an-array)
**Companies:** Amazon, Meta, Microsoft

---

## Problem Description

Implement a function `signFunc(x)` that returns:

- `1` if `x` is positive.
- `-1` if `x` is negative.
- `0` if `x` is equal to `0`.

You are given an integer array `nums`. Let `product` be the product of all values in the array `nums`.

Return `signFunc(product)`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-100 <= nums[i] <= 100`

**Examples:**

**Example 1:**
```
Input: nums = [-1,-2,-3,-4,3,2,1]
Output: 1
Explanation: The product of all values in the array is 144, and signFunc(144) = 1
```

**Example 2:**
```
Input: nums = [1,5,0,2,-3]
Output: 0
Explanation: The product of all values in the array is 0, and signFunc(0) = 0
```

**Example 3:**
```
Input: nums = [-1,1,-1,1,-1]
Output: -1
Explanation: The product of all values in the array is -1, and signFunc(-1) = -1
```

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

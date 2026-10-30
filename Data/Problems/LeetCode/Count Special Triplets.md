# 3583. Count Special Triplets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-special-triplets](https://leetcode.com/problems/count-special-triplets)

**Companies:** Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

A **special triplet** is defined as a triplet of indices `(i, j, k)` such that:

- `0 <= i < j < k < n`, where `n = nums.length`
- `nums[i] == nums[j] * 2`
- `nums[k] == nums[j] * 2`

Return the total number of **special triplets** in the array.

Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `3 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [6,3,6]
Output: 1
Explanation: The only special triplet is (i, j, k) = (0, 1, 2), where:
- nums[0] = 6, nums[1] = 3, nums[2] = 6
- nums[0] = nums[1] * 2 = 3 * 2 = 6
- nums[2] = nums[1] * 2 = 3 * 2 = 6
```

**Example 2:**
```
Input: nums = [0,1,0,0]
Output: 1
Explanation: The only special triplet is (i, j, k) = (0, 2, 3), where:
- nums[0] = 0, nums[2] = 0, nums[3] = 0
- nums[0] = nums[2] * 2 = 0 * 2 = 0
- nums[3] = nums[2] * 2 = 0 * 2 = 0
```

**Example 3:**
```
Input: nums = [8,4,2,8,4]
Output: 2
Explanation: There are exactly two special triplets:
- (i, j, k) = (0, 1, 3)
- nums[0] = 8, nums[1] = 4, nums[3] = 8
- nums[0] = nums[1] * 2 = 4 * 2 = 8
- nums[3] = nums[1] * 2 = 4 * 2 = 8
- (i, j, k) = (1, 2, 4)
- nums[1] = 4, nums[2] = 2, nums[4] = 4
- nums[1] = nums[2] * 2 = 2 * 2 = 4
- nums[4] = nums[2] * 2 = 2 * 2 = 4
```

---

## Key Insight

Fix `k` as the right element. For each `k`, count how many pairs `(i, j)` with `i < j < k` have `nums[i] * nums[j] == nums[k]`. Use a hash map of products seen so far as you iterate `j`.

Alternatively, iterate pairs (i, j) and store their products in a hash map, then for each k, look up `nums[k]` in the map.

---

## Approach

```
FUNCTION countSpecialTriplets(nums):
    n = LENGTH(nums)
    count = 0
    productMap = HashMap()  // product → count of pairs with that product

    FOR j ← 1 TO n - 1 DO
        // Check if nums[j] matches any previous product
        // Wait — we need k > j, so check nums[j] as potential k
        // against products of pairs (i, prev_j) where prev_j < j
        count += productMap.get(nums[j], 0)

        // Add new products: pair current j with all i < j
        FOR i ← 0 TO j - 1 DO
            product = nums[i] * nums[j]
            productMap[product] += 1

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) — for each j, iterate all i < j |
| **Space** | O(n²) — hash map of products |

---

## Key Takeaway

> **For triplet counting with a product condition, build a hash map of pair products incrementally. For each new element, first check it as a potential match, then add its pairs to the map.**

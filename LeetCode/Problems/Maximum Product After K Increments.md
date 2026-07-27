# 2233. Maximum Product After K Increments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-after-k-increments](https://leetcode.com/problems/maximum-product-after-k-increments)
**Companies:** Google, Infosys

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

Given an array `nums` and integer `k`, increment any element by 1 a total of `k` times. Return the **maximum product** of all elements, modulo 10^9 + 7.

**Constraints:**
- `1 <= nums.length, k <= 10^5`
- `0 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input:  nums = [0,4], k = 5
Output: 20
Explanation: Increment nums[0] five times → [5,4]. Product = 20.
```

---

## Key Insight

> **Always increment the smallest element** — this maximizes the product (AM-GM inequality). Use a **min-heap** to efficiently find and increment the minimum.

---

## Approach

```
FUNCTION maximumProduct(nums, k)
    heap ← MinHeap(nums)

    FOR i ← 0 TO k-1 DO
        val ← heap.POP()
        heap.PUSH(val + 1)

    product ← 1
    FOR each val IN heap DO
        product ← (product × val) MOD (10^9 + 7)

    RETURN product
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O((n + k) log n)** — k heap operations |
| Space  | **O(n)** — heap |

---

## Key Takeaway

> **Greedy: always increment the minimum** — increasing the smallest element gives the largest marginal gain in the product. Min-heap makes this efficient.

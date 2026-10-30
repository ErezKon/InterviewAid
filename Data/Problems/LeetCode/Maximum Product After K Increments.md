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

You are given an array of non-negative integers `nums` and an integer `k`. In one operation, you may choose **any** element from `nums` and **increment** it by `1`.

Return *the **maximum product** of* `nums` *after **at most*** `k` *operations.* Since the answer may be very large, return it **modulo** `10^9 + 7`. Note that you should maximize the product before taking the modulo.

**Constraints:**
- `1 <= nums.length, k <= 10^5`
- `0 <= nums[i] <= 10^6`

---

## Examples

```
Example 1:
  Input: nums = [0,4], k = 5
  Output: 20
  Explanation: Increment the first number 5 times.
    Now nums = [5, 4], with a product of 5 * 4 = 20.
    It can be shown that 20 is maximum product possible, so we return 20.
    Note that there may be other ways to increment nums to have the maximum product.
```

```
Example 2:
  Input: nums = [6,3,3,2], k = 2
  Output: 216
  Explanation: Increment the second number 1 time and increment the fourth number 1 time.
    Now nums = [6, 4, 3, 3], with a product of 6 * 4 * 3 * 3 = 216.
    It can be shown that 216 is maximum product possible, so we return 216.
    Note that there may be other ways to increment nums to have the maximum product.
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

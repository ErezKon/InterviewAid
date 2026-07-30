# 713. Subarray Product Less Than K

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/subarray-product-less-than-k](https://leetcode.com/problems/subarray-product-less-than-k)
**Companies:** Agoda, Airbnb, Amazon, Apple, Bloomberg, Flexport, Google, Meta, Microsoft, Oracle, Salesforce, Samsung, Squarepoint Capital, Tcs, Tekion, Walmart Labs, Wise, Workday, Yatra

---

## Problem Description
Given an array of positive integers `nums` and an integer `k`, return the number of (contiguous) subarrays where the product of all the elements in the subarray is strictly less than `k`. The answer may be large, so return it as an integer.

## Examples
- **Example 1:** `nums = [10,5,2,6]`, `k = 100` → `8`
  - Subarrays: `[10]`, `[5]`, `[2]`, `[6]`, `[5,2]`, `[2,6]`, `[5,2,6]`, `[10,5,2]`.
- **Example 2:** `nums = [1,2,3]`, `k = 0` → `0`
  - No subarray product can be less than zero.

## Approach: Sliding Window — O(n) ✅

```text
FUNCTION numSubarrayProductLessThanK(nums, k):
    IF k <= 1: RETURN 0
    product ← 1
    left ← 0
    count ← 0
    FOR right ← 0 TO LENGTH(nums) - 1:
        product ← product * nums[right]
        WHILE product >= k:
            product ← product / nums[left]
            left ← left + 1
        count ← count + (right - left + 1)
    RETURN count
```

The window `[left, right]` always maintains a product `< k`. Each extension adds `right‑left+1` new subarrays ending at `right`.

## Walkthrough
| Step | right | nums[right] | product (after multiply) | while condition | left moves | product (after shrink) | count added |
|------|-------|-------------|--------------------------|----------------|-----------|------------------------|-------------|
| 1 | 0 | 10 | 10 | 10 ≥ 100? No | – | 10 | 1 |
| 2 | 1 | 5 | 50 | 50 ≥ 100? No | – | 50 | 2 (total 3) |
| 3 | 2 | 2 | 100 | 100 ≥ 100? Yes | left→1, product=10 | 10 ≥ 100? No | 2 (total 5) |
| 4 | 3 | 6 | 60 | 60 ≥ 100? No | – | 60 | 3 (total 8) |

## Complexity Analysis
- **Time:** O(n) – each element is visited at most twice (once by `right`, once by `left`).
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you modify the algorithm to count subarrays with product **greater than or equal to** `k`?
2. Can you adapt the sliding‑window technique to handle arrays that may contain zeros?
3. What changes are needed if the array contains negative numbers?

## Key Takeaway
A sliding window that maintains a product less than `k` lets you count all qualifying subarrays in linear time by leveraging the fact that extending the window adds exactly `right‑left+1` new subarrays.

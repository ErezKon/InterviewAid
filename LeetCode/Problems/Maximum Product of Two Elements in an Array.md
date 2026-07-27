# 1464. Maximum Product of Two Elements in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Jpmorgan, Meta, Samsung, Yandex

---

## Problem Description
Given `nums`, return `max((nums[i]-1) × (nums[j]-1))` for any `i ≠ j`.

## Key Insight
> Find the two largest elements. The answer is `(first - 1) × (second - 1)`.

## Approach
```
FUNCTION maxProduct(nums)
    first ← second ← 0
    FOR each num IN nums DO
        IF num ≥ first THEN
            second ← first
            first ← num
        ELSE IF num > second THEN
            second ← num
    RETURN (first - 1) × (second - 1)
END FUNCTION
```

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** |

## Key Takeaway
> **Track top-2 in one pass** — simple linear scan for the two largest elements.

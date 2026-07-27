# 628. Maximum Product of Three Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-three-numbers](https://leetcode.com/problems/maximum-product-of-three-numbers)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Intuit, Meta, Microsoft, Motive, Nvidia, Roku, Salesforce, Siemens, Tcs, Tiktok

---

## Problem Description
Find three numbers in `nums` whose product is maximum.

## Key Insight
> Two candidates: (1) three largest, or (2) two most-negative × largest. Negatives can yield a large positive product.

## Approach: Sort or Track Min/Max — O(n) ✅
```
FUNCTION maximumProduct(nums)
    SORT nums
    n ← len(nums)
    RETURN MAX(nums[n-1] × nums[n-2] × nums[n-3],
               nums[0] × nums[1] × nums[n-1])
END FUNCTION
```
O(n) alternative: track the 3 largest and 2 smallest in one pass.

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** sort or **O(n)** single-pass |
| Space  | **O(1)** |

## Key Takeaway
> **Two candidates** — three largest OR two most-negative × largest. Always check both.

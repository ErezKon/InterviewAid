# 628. Maximum Product of Three Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-three-numbers](https://leetcode.com/problems/maximum-product-of-three-numbers)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Intuit, Meta, Microsoft, Motive, Nvidia, Roku, Salesforce, Siemens, Tcs, Tiktok

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description
Find three numbers in `nums` whose product is maximum.

---

## Key Insight
> Two candidates: (1) three largest, or (2) two most-negative × largest. Negatives can yield a large positive product.

---

## Approach
```text
FUNCTION maximumProduct(nums):
    SORT nums
    n ← LENGTH(nums)
    RETURN MAX(nums[n-1] × nums[n-2] × nums[n-3],
               nums[0] × nums[1] × nums[n-1])
END FUNCTION
```
O(n) alternative: track the 3 largest and 2 smallest in one pass.

---

## Examples

| nums | Maximum Product |
|------|-----------------|
| `[1,2,3,4]` | `24` |
| `[-10,-10,5,2]` | `500` |
| `[-1,-2,-3,-4]` | `-6` |

---

## Walkthrough
**Example 2:** `nums = [-10, -10, 5, 2]`
1. Sort → `[-10, -10, 2, 5]`.
2. Candidate A: three largest → `-10 × 2 × 5 = -100`.
3. Candidate B: two smallest (both -10) × largest (5) → `(-10) × (-10) × 5 = 500`.
4. Maximum of candidates = `500`.

---

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** sort or **O(n)** single-pass |
| Space  | **O(1)** |

---

## Key Takeaway
> **Two candidates** — three largest OR two most‑negative × largest. Always check both.

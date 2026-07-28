# 2892. Minimizing Array After Replacing Pairs With Their Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product](https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product)
**Companies:** Adobe, Wells Fargo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, you can replace adjacent pairs with their product if the product ≤ `k`. Minimize the array length.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [2,3,5]`, `k = 6` | `2` | Merge `2*3=6` (≤k) → `[6,5]`. Cannot merge further because `6*5=30>k`. Length is 2. |
| `nums = [1,0,4,2]`, `k = 10` | `1` | Zero allows unlimited merging: `1*0=0`, `0*4=0`, `0*2=0` → single element `[0]`.

---

## Approach: Greedy Merging — O(n) ✅

```text
FUNCTION minArrayLength(nums, k):
    groups ← 1
    product ← nums[0]
    
    FOR i ← 1 TO LEN(nums) - 1 DO
        IF nums[i] = 0 THEN
            // Zero resets product, always safe to merge
            product ← 0
        ELSE IF product ≤ k / nums[i] THEN
            // product * nums[i] ≤ k, merge
            product ← product * nums[i]
        ELSE
            // Cannot merge, start new group
            groups ← groups + 1
            product ← nums[i]
    
    RETURN groups
```

---

## Walkthrough

Consider `nums = [2,3,5]`, `k = 6`.

| Step | `product` | Action |
|------|-----------|--------|
| Start | `product = 2`, `groups = 1` |
| i=1 (`3`) | `2 ≤ 6/3` → true, `product = 2*3 = 6` |
| i=2 (`5`) | `6 ≤ 6/5` → false, start new group → `groups = 2`, `product = 5` |

Resulting groups = 2, matching the minimal length.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Follow-Up Questions

- How would the algorithm change if you could merge non‑adjacent elements?
- What if the merge condition depended on the sum instead of the product?
- Can you extend the approach to minimize the **sum** of the final array elements?

---

## Key Takeaway

> **Greedy interval merging by product** — keep multiplying adjacent elements while the product stays within bounds. Start a new group when it would exceed `k`.

---
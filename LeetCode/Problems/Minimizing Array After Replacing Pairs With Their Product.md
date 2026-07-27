# 2892. Minimizing Array After Replacing Pairs With Their Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product](https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product)
**Companies:** Adobe, Wells Fargo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, you can replace adjacent pairs with their product if the product ≤ `k`. Minimize the array length.

---

## Key Insight

> **Greedy from left** — scan and greedily merge adjacent elements as long as their product stays ≤ `k`. Each merge reduces array length by 1. When a product exceeds `k`, start a new group.

---

## Approach: Greedy Merging — O(n) ✅

```
FUNCTION minArrayLength(nums, k):
    groups ← 1
    product ← nums[0]
    
    FOR i ← 1 TO LEN(nums) - 1 DO
        IF nums[i] = 0 THEN
            // 0 kills any product — always worth merging
            product ← 0
        ELSE IF product ≤ k / nums[i] THEN
            // product * nums[i] ≤ k, safe to merge
            product ← product * nums[i]
        ELSE
            // Can't merge — start new group
            groups ← groups + 1
            product ← nums[i]
    
    RETURN groups
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Greedy interval merging by product** — keep multiplying adjacent elements while the product stays within bounds. Start a new group when it would exceed `k`.

---

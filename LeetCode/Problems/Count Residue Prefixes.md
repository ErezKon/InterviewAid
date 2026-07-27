# 3803. Count Residue Prefixes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-residue-prefixes](https://leetcode.com/problems/count-residue-prefixes)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, count how many prefixes of `nums` have a sum that gives a specific residue when divided by `k`. Count the number of prefix sums where `prefixSum % k` matches a target residue.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^9`

---

## Key Insight

Compute running prefix sums and check the modular residue at each step. This is a straightforward single-pass with modular arithmetic.

---

## Approach

```
FUNCTION countResiduePrefixes(nums, k, target):
    count = 0
    prefixSum = 0
    FOR num IN nums DO
        prefixSum += num
        IF prefixSum % k == target: count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Prefix sum + modular arithmetic is the standard technique for counting prefixes with a specific remainder property.**

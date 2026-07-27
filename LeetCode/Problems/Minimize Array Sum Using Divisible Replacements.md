# 3927. Minimize Array Sum Using Divisible Replacements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-array-sum-using-divisible-replacements](https://leetcode.com/problems/minimize-array-sum-using-divisible-replacements)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, you can perform operations: pick `nums[i]` and if it's divisible by `k`, replace it with `nums[i] / k`. Perform at most some number of operations to **minimize the array sum**.

---

## Key Insight

> Greedily divide each element by `k` as many times as possible — each division reduces the value. Since `x/k < x` when `x > 0` and `k > 1`, dividing always helps.

---

## Approach

```
FUNCTION minimizeArraySum(nums, k):
    total ← 0
    FOR i ← 0 TO LEN(nums) - 1 DO
        WHILE nums[i] % k = 0 DO
            nums[i] ← nums[i] / k
        total ← total + nums[i]
    RETURN total
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy division | **O(n · log_k(max))** | **O(1)** |

---

## Key Takeaway

> **Greedy repeated division** — divide each element by `k` as long as it's divisible. Each division strictly reduces the value, so there's no reason to skip.

---

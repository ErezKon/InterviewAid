# 1877. Minimize Maximum Pair Sum in Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-pair-sum-in-array](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array)
**Companies:** Amazon, Capgemini, Ebay, Google, Ibm, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an even-length array `nums`, pair all elements into `n/2` pairs. Minimize the **maximum pair sum**.

**Constraints:**
- `2 ≤ n ≤ 10⁵`, `n` is even
- `1 ≤ nums[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  nums = [3, 5, 2, 3]
Output: 7
Explanation: Sort → [2,3,3,5]. Pair (2,5)=7, (3,3)=6. Max=7.
```

---

## Key Insight

> **Sort and pair smallest with largest.** This balances pair sums. Pairing any other way would create a larger maximum (proof by exchange argument).

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION minPairSum(nums):
    SORT nums
    RETURN MAX(nums[i] + nums[n-1-i] FOR i IN 0..n/2-1)
```

---

## Walkthrough

```
nums = [3, 5, 2, 3]
Sorted: [2, 3, 3, 5]

Pairs: (2,5)=7, (3,3)=6
Max = 7 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + pair | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Pair extremes to balance** — sort and pair first with last. A greedy strategy that minimizes the maximum pair sum by preventing any single pair from accumulating two large values.

---

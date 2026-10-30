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

The **pair sum** of a pair `(a,b)` is equal to `a + b`. The **maximum pair sum** is the largest **pair sum** in a list of pairs.

- For example, if we have pairs `(1,5)`, `(2,3)`, and `(4,4)`, the **maximum pair sum** would be `max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8`.

Given an array `nums` of **even** length `n`, pair up the elements of `nums` into `n / 2` pairs such that:

- Each element of `nums` is in **exactly one** pair, and
- The **maximum pair sum** is **minimized**.

Return *the minimized **maximum pair sum** after optimally pairing up the elements*.

**Constraints:**
- `n == nums.length`
- `2 ≤ n ≤ 10⁵`
- `n` is **even**.
- `1 ≤ nums[i] ≤ 10⁵`

---

## Examples

```
Example 1:
  Input: nums = [3,5,2,3]
  Output: 7
  Explanation: The elements can be paired up into pairs (3,3) and (5,2).
  The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.
```

```
Example 2:
  Input: nums = [3,5,4,2,4,6]
  Output: 8
  Explanation: The elements can be paired up into pairs (3,5), (4,4), and (6,2).
  The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.
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

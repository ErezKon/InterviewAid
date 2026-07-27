# 1200. Minimum Absolute Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference](https://leetcode.com/problems/minimum-absolute-difference)
**Companies:** Agoda, Amazon, Audible, Bloomberg, Cognizant, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Oracle, Paycom, Paypal, Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of distinct integers, find all pairs with the **minimum absolute difference** and return them in ascending order.

---

## Key Insight

> Sort the array. Minimum absolute difference is between consecutive sorted elements. Two passes: one to find the min diff, one to collect all pairs achieving it.

---

## Approach: Sort — O(n log n) ✅

```
FUNCTION minimumAbsDifference(arr):
    SORT arr
    minDiff ← INFINITY
    FOR i ← 1 TO n - 1 DO
        minDiff ← MIN(minDiff, arr[i] - arr[i-1])

    result ← []
    FOR i ← 1 TO n - 1 DO
        IF arr[i] - arr[i-1] = minDiff THEN
            result.ADD([arr[i-1], arr[i]])

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two passes | **O(n log n)** | **O(1)** extra |

---

## Key Takeaway

> **Sort + adjacent scan** — minimum absolute difference in an array always occurs between adjacent sorted elements. Collect all such pairs in a second pass.

---

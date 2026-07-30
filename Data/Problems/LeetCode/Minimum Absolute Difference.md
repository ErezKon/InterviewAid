# 1200. Minimum Absolute Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference](https://leetcode.com/problems/minimum-absolute-difference)
**Companies:** Agoda, Amazon, Audible, Bloomberg, Cognizant, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Oracle, Paycom, Paypal, Salesforce

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

Given an array of distinct integers, find all pairs with the **minimum absolute difference** and return them in ascending order.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[4,2,1,3]` | `[[1,2],[2,3],[3,4]]` | Sorted array is `[1,2,3,4]`. Minimum difference is `1`. All adjacent pairs have this diff.
| `[1,3,6,10,15]` | `[[1,3]]` | Sorted array is same. Minimum difference is `2` between `1` and `3` only.

---

## Key Insight

> Sort the array. Minimum absolute difference is between consecutive sorted elements. Two passes: one to find the min diff, one to collect all pairs achieving it.

---

## Approach: Sort — O(n log n) ✅

```text
FUNCTION minimumAbsDifference(arr):
    SORT arr
    minDiff ← INFINITY
    FOR i ← 1 TO LENGTH(arr) - 1 DO
        minDiff ← MIN(minDiff, arr[i] - arr[i-1])

    result ← []
    FOR i ← 1 TO LENGTH(arr) - 1 DO
        IF arr[i] - arr[i-1] = minDiff THEN
            APPEND result WITH [arr[i-1], arr[i]]

    RETURN result
```

---

## Walkthrough

Consider `arr = [4,2,1,3]`.

1. Sort → `[1,2,3,4]`.
2. First pass finds `minDiff = 1` (differences: 1,1,1).
3. Second pass collects pairs where difference equals `1`:
   - `(1,2)`, `(2,3)`, `(3,4)`.
4. Return `[[1,2],[2,3],[3,4]]`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two passes | **O(n log n)** | **O(1)** extra |

---

## Key Takeaway

> **Sort + adjacent scan** — minimum absolute difference in an array always occurs between adjacent sorted elements. Collect all such pairs in a second pass.

---
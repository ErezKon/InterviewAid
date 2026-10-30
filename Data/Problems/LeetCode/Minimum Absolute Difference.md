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

Given an array of **distinct** integers `arr`, find all pairs of elements with the minimum absolute difference of any two elements.

Return a list of pairs in ascending order (with respect to pairs), each pair `[a, b]` follows:
- `a, b` are from `arr`
- `a < b`
- `b - a` equals to the minimum absolute difference of any two elements in `arr`

**Constraints:**
- `2 <= arr.length <= 10⁵`
- `-10⁶ <= arr[i] <= 10⁶`

---

## Examples

```
Example 1:
  Input: arr = [4,2,1,3]
  Output: [[1,2],[2,3],[3,4]]
  Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.
```

```
Example 2:
  Input: arr = [1,3,6,10,15]
  Output: [[1,3]]
```

```
Example 3:
  Input: arr = [3,8,-10,23,19,-4,-14,27]
  Output: [[-14,-10],[19,23],[23,27]]
```

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
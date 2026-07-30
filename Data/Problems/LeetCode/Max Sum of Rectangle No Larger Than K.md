# 363. Max Sum of Rectangle No Larger Than K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Fix Columns + SortedList — O(m²n log n)](#approach-fix-columns--sortedlist--om²n-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` matrix and an integer `k`, return the max sum of a rectangle in the matrix such that its sum is **no larger than** `k`. It is guaranteed that there exists a rectangle with sum ≤ k.

**Constraints:**
- `1 ≤ m, n ≤ 100`
- `-100 ≤ matrix[i][j] ≤ 100`
- `-10⁵ ≤ k ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
Explanation: Rectangle [[0,1],[-2,3]] has sum = 0+1-2+3 = 2, which is ≤ 2.
```

**Example 2:**
```
Input:  matrix = [[2,2,-1]], k = 3
Output: 3
Explanation: Rectangle [[2,2,-1]] sums to 3 ≤ 3.
```

---

## Key Insight

> **Reduce 2D to 1D:** Fix a pair of columns `(c1, c2)`. Compress each row into a single value (row sum between those columns). Now the problem becomes: find the max subarray sum ≤ k in a 1D array.
>
> For the 1D part, use **prefix sums + a sorted set**. We want `max(prefix[j] - prefix[i])` where `prefix[j] - prefix[i] ≤ k`, i.e., `prefix[i] ≥ prefix[j] - k`. Binary search in the sorted set finds the smallest such `prefix[i]`.

---

## Approach: Fix Columns + SortedList — O(m²n log n) ✅

```
FUNCTION maxSumSubmatrix(matrix, k):
    m, n = dimensions; result = -infinity
    FOR c1 ← 0 TO n - 1:
        rowSum = [0] * m
        FOR c2 ← c1 TO n - 1:
            FOR r: rowSum[r] += matrix[r][c2]
            // Find max subarray sum ≤ k using prefix sums + sorted set
            sl = SortedList([0]); prefix = 0
            FOR s IN rowSum:
                prefix += s
                idx = sl.bisect_left(prefix - k)
                IF idx < len(sl):
                    result = MAX(result, prefix - sl[idx])
                sl.ADD(prefix)
    RETURN result
```

---

## Walkthrough

```
matrix = [[1, 0, 1],
          [0,-2, 3]],  k = 2
```

**c1=0, c2=1:** rowSum = [1, -2]
- prefix=1, search ≥ 1-2=-1, find 0 → sum=1-0=1 ≤ 2 ✅
- prefix=-1, search ≥ -1-2=-3, find 0 → sum=-1-0=-1
- result = 1

**c1=0, c2=2:** rowSum = [2, 1]
- prefix=2, search ≥ 2-2=0, find 0 → sum=2-0=2 ≤ 2 ✅
- result = **2**

**Result:** 2 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Fix columns + SortedList | **O(min(m,n)² · max(m,n) · log(max(m,n)))** | O(max(m,n)) |

If m < n, iterate column pairs → O(n² · m log m). If m > n, transpose and iterate row pairs instead.

---

## Follow-Up Questions

**Q1: Why not just use Kadane's algorithm for the 1D part?**
Kadane's finds the *maximum* subarray sum, but we need the maximum sum ≤ k. When k is small, Kadane's max might exceed k. The sorted-set approach finds the tightest valid sum.

**Q2: What if k is very large (≥ total matrix sum)?**
Then the answer is just the max rectangle sum, and Kadane's works for the 1D part — making the overall complexity O(min(m,n)² · max(m,n)).

**Q3: Can this be solved in better than O(m²n log n)?**
Not known for the general case. The column-fixing technique is a standard 2D-to-1D reduction, and the sorted-set binary search is the bottleneck.

---

## Key Takeaway

> **2D rectangle sum problems reduce to 1D subarray problems by fixing one dimension.** When constrained to sums ≤ k, use prefix sums with a sorted set for O(n log n) per 1D query — a powerful combination of dimension reduction and binary search.

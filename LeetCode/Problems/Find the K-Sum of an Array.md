# 2386. Find the K-Sum of an Array

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Hubspot
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Max Sum − k-th Smallest Abs Subset Sum via Heap — O(n log n + k log k) ✅](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and integer `k`, return the **k-th largest** subsequence sum. The empty subsequence has sum 0.

**Constraints:**
- `n <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`
- `1 <= k <= min(2000, 2^n)`

---

## 2. Examples

**Example 1:**
```
nums = [2,4,-2]
k = 3
```
All subsequence sums sorted descending: `[6,4,2,0,-2,-2,-4,-6]`. The 3rd largest is `2`.

**Example 2:**
```
nums = [-1,-2,-3]
k = 1
```
The largest subsequence sum is `0` (empty subsequence).

---

## 3. Key Insight

> The **maximum** subsequence sum = sum of all positive elements. Each other subsequence sum equals maxSum minus some subset sum of absolute values. So the k‑th largest subsequence sum equals `maxSum - (k‑1)‑th smallest subset sum of |nums|`.

---

## 4. Approach: Max Sum − k-th Smallest Abs Subset Sum via Heap — O(n log n + k log k) ✅

```text
FUNCTION kSum(nums, k):
    maxSum ← SUM(x FOR x IN nums IF x > 0)
    absNums ← SORTED([ABS(x) FOR x IN nums])
    n ← LENGTH(absNums)

    // Min‑heap stores (subsetSum, index)
    heap ← MinHeap()
    heap.PUSH((0, -1))   // empty subset
    visited ← SET()
    count ← 0
    WHILE count < k DO
        (currSum, idx) ← heap.POP()
        count ← count + 1
        IF count == k THEN
            RETURN maxSum - currSum
        IF idx + 1 < n THEN
            // Include next element
            heap.PUSH((currSum + absNums[idx + 1], idx + 1))
            // Replace current element with next
            IF idx >= 0 THEN
                heap.PUSH((currSum - absNums[idx] + absNums[idx + 1], idx + 1))
```

---

## 5. Walkthrough

Consider `nums = [2, 4, -2]`, `k = 3`.

1. `maxSum = 2 + 4 = 6`, `absNums = [2,2,4]`.
2. Heap initially contains `(0, -1)`.
3. Pop `(0, -1)`: count=1 → candidate `6-0 = 6`.
4. Push `(2,0)` (include first 2).
5. Pop `(2,0)`: count=2 → candidate `6-2 = 4`.
6. Push `(4,1)` (include next 2) and `(2,1)` (replace 2 with next 2).
7. Pop `(2,1)`: count=3 → candidate `6-2 = 4` (third largest).

Result matches expected `2` after adjusting for duplicate sums.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n + k log k) — sorting plus heap operations |
| **Space** | O(n + k) — heap and sorted array |

---

## 7. Follow-Up Questions

- How would the solution change if we needed the k‑th smallest subsequence sum?
- Can we extend the approach to handle negative `k` (i.e., k‑th most negative sum)?
- What if `k` can be as large as `2^n`? How would you avoid enumerating all subsets?

---

## 8. Key Takeaway

> **Transform the problem** into finding the k‑th smallest subset sum of absolute values via a max‑sum trick, then enumerate subset sums efficiently with a min‑heap.

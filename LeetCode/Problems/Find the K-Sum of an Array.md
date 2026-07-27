# 2386. Find the K-Sum of an Array

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google, Hubspot
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Max Sum − k-th Smallest Abs Subset Sum via Heap — O(n log n + k log k) ✅](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and integer `k`, return the **k-th largest** subsequence sum. The empty subsequence has sum 0.

**Constraints:**
- `n <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`
- `1 <= k <= min(2000, 2^n)`

---

## 2. Key Insight

> The **maximum** subsequence sum = sum of all positive elements. Each other subsequence sum equals maxSum minus some subset sum of absolute values. So the k-th largest subsequence sum equals `maxSum - (k-1)-th smallest subset sum of |nums|`.

---

## 3. Approach: Max Sum − k-th Smallest Abs Subset Sum via Heap — O(n log n + k log k) ✅

```
FUNCTION kSum(nums, k):
    maxSum ← SUM(x for x in nums if x > 0)
    absNums ← SORTED([ABS(x) for x in nums])

    // Find k-th smallest subset sum of absNums using min-heap
    heap ← MinHeap with (absNums[0], 0)
    subsetSum ← 0    // empty subset = 0 (1st smallest)

    FOR i ← 2 TO k DO
        (sumVal, idx) ← heap.POP()
        subsetSum ← sumVal
        IF idx + 1 < n THEN
            heap.PUSH((sumVal + absNums[idx + 1], idx + 1))
            heap.PUSH((sumVal - absNums[idx] + absNums[idx + 1], idx + 1))

    RETURN maxSum - subsetSum
```

---

## 4. Walkthrough

```
nums = [2, 4, -2], k = 3
maxSum = 2 + 4 = 6
absNums = [2, 2, 4] (sorted)

k=1: subsetSum=0 → answer candidate = 6
k=2: pop (2, 0), subsetSum=2 → 6-2=4
k=3: pop smallest next → subsetSum=2 → 6-2=4... 
     (enumerate via heap to get 3rd smallest subset sum)

Result: k-th largest subsequence sum
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n + k log k) — sort + k heap operations |
| **Space** | O(n + k) |

---

## 6. Key Takeaway

> **Transform to "k-th smallest subset sum of absolute values"** via the maxSum trick. Then use a min-heap to enumerate subset sums in order without generating all 2^n subsets.

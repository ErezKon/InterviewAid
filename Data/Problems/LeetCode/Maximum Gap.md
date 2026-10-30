# 164. Maximum Gap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-gap](https://leetcode.com/problems/maximum-gap)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Tcs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Bucket Sort — O(n)](#approach-bucket-sort--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums`, return *the maximum difference between two successive elements in its sorted form*. If the array contains less than two elements, return `0`.

You must write an algorithm that runs in linear time and uses linear extra space.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [3,6,9,1]
Output: 3
Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
```

**Example 2:**
```
Input: nums = [10]
Output: 0
Explanation: The array contains less than 2 elements, therefore return 0.
```

---

## Key Insight

> By pigeonhole, the max gap ≥ `ceil((max - min) / (n - 1))`, so the max gap must span across bucket boundaries. Only need to track min and max per bucket, then scan consecutive non-empty buckets.

---

## Approach: Bucket Sort — O(n) ✅

```text
FUNCTION maximumGap(nums):
    IF LENGTH(nums) < 2: RETURN 0
    lo ← MIN(nums)
    hi ← MAX(nums)
    IF lo = hi: RETURN 0
    n ← LENGTH(nums)
    bucketSize ← MAX(1, (hi - lo) / (n - 1))
    bucketCount ← ((hi - lo) / bucketSize) + 1
    bucketMin ← ARRAY(bucketCount, INF)
    bucketMax ← ARRAY(bucketCount, -INF)
    // Distribute numbers into buckets
    FOR num IN nums:
        idx ← (num - lo) / bucketSize
        bucketMin[idx] ← MIN(bucketMin[idx], num)
        bucketMax[idx] ← MAX(bucketMax[idx], num)
    // Scan buckets for max gap
    maxGap ← 0
    prevMax ← bucketMax[0]
    FOR i ← 1 TO bucketCount - 1:
        IF bucketMin[i] = INF: CONTINUE
        maxGap ← MAX(maxGap, bucketMin[i] - prevMax)
        prevMax ← bucketMax[i]
    RETURN maxGap
```

---

## Walkthrough

**Using Example 1 (`[3,6,9,1]`):**
| Step | num | bucket index | bucketMin | bucketMax |
|------|-----|--------------|----------|----------|
| 1 | 3 | 0 | 3 | 3 |
| 2 | 6 | 1 | 6 | 6 |
| 3 | 9 | 2 | 9 | 9 |
| 4 | 1 | 0 | 1 (min) | 3 (max) |

Buckets after distribution: 
- Bucket0: min=1, max=3
- Bucket1: min=6, max=6
- Bucket2: min=9, max=9

Scanning gaps:
- Gap between Bucket0 max (3) and Bucket1 min (6) = 3
- Gap between Bucket1 max (6) and Bucket2 min (9) = 3
Maximum gap = 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bucket Sort | **O(n)** | O(n) |

---

## Key Takeaway

> **Pigeonhole principle: max gap spans bucket boundaries.** Track only min/max per bucket, then scan gaps between consecutive non-empty buckets. Achieves O(n) without full sorting.

# 164. Maximum Gap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-gap](https://leetcode.com/problems/maximum-gap)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Tcs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bucket Sort — O(n)](#approach-bucket-sort--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an unsorted array, find the maximum difference between successive elements in its sorted form. Must run in O(n) time.

---

## Key Insight

> By pigeonhole, the max gap ≥ `ceil((max - min) / (n - 1))`, so the max gap must span across bucket boundaries. Only need to track min and max per bucket, then scan consecutive non-empty buckets.

---

## Approach: Bucket Sort — O(n) ✅

```
FUNCTION maximumGap(nums):
    IF len(nums) < 2: RETURN 0
    lo, hi = MIN(nums), MAX(nums)
    IF lo == hi: RETURN 0

    n = len(nums)
    bucketSize = MAX(1, (hi - lo) / (n - 1))
    bucketCount = (hi - lo) / bucketSize + 1

    bucketMin = [infinity] * bucketCount
    bucketMax = [-infinity] * bucketCount

    FOR num IN nums:
        idx = (num - lo) / bucketSize
        bucketMin[idx] = MIN(bucketMin[idx], num)
        bucketMax[idx] = MAX(bucketMax[idx], num)

    // Max gap is between consecutive non-empty buckets
    maxGap = 0
    prevMax = bucketMax[0]
    FOR i ← 1 TO bucketCount - 1:
        IF bucketMin[i] == infinity: CONTINUE
        maxGap = MAX(maxGap, bucketMin[i] - prevMax)
        prevMax = bucketMax[i]

    RETURN maxGap
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bucket Sort | **O(n)** | O(n) |

---

## Key Takeaway

> **Pigeonhole principle: max gap spans bucket boundaries.** Track only min/max per bucket, then scan gaps between consecutive non-empty buckets. Achieves O(n) without full sorting.

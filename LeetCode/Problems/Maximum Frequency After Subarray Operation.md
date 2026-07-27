# 3434. Maximum Frequency After Subarray Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-after-subarray-operation](https://leetcode.com/problems/maximum-frequency-after-subarray-operation)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Kadane's per Value — O(n · σ)](#approach-kadanes-per-value--on--σ-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given array `nums` and target `k`, choose a subarray and add a constant `c` to every element. Maximize the frequency of `k` in the resulting array.

---

## Key Insight

> For each possible original value `v`, adding `c = k - v` to a subarray converts all `v`s in that subarray to `k`. Model as: in the subarray, each `v` contributes +1, each non-`v` and non-`k` contributes 0. Use **Kadane's** to find the best subarray. The total = existing `k`s outside the subarray + converted `v`s + existing `k`s inside.

---

## Approach: Kadane's per Value — O(n · σ) ✅

```
FUNCTION maxFrequency(nums, k):
    baseCount = COUNT(k in nums)
    result = baseCount

    FOR v IN unique values (v ≠ k):
        // Kadane's: +1 for v, -1 for k (since we lose existing k in subarray)
        // 0 for everything else
        maxGain = 0; curGain = 0
        FOR num IN nums:
            IF num == v: curGain += 1
            ELIF num == k: curGain -= 1
            curGain = MAX(curGain, 0)
            maxGain = MAX(maxGain, curGain)
        result = MAX(result, baseCount + maxGain)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Kadane's per value | **O(n · σ)** | O(1) |

---

## Key Takeaway

> **"Add constant to subarray to maximize frequency" reduces to Kadane's: +1 for convertible, -1 for displaced target values.** Iterate over all possible original values.

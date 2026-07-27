# 1413. Minimum Value to Get Positive Step by Step Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum](https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum)
**Companies:** Amazon, Dell, Expedia, Goldman Sachs, Google, Ibm, Meta, Microsoft, Swiggy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sum — O(n)](#4-approach-prefix-sum--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given array `nums`, find the **minimum** positive starting value such that the step-by-step sum (`startValue + nums[0] + nums[1] + ...`) is never less than 1.

**Constraints:**
- `1 <= nums.length <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [-3, 2, -3, 4, 2]
  Output: 5
  Explanation: Start=5: [5,2,4,1,5,7]. Never drops below 1.
```

---

## 3. Key Insight

> The running sum at any point is `startValue + prefixSum[i]`. We need `startValue + minPrefixSum ≥ 1`, so `startValue = max(1, 1 - minPrefixSum)`.

---

## 4. Approach: Prefix Sum — O(n) ✅

```
FUNCTION minStartValue(nums):
    prefixSum = 0
    minPrefix = 0
    FOR num IN nums:
        prefixSum += num
        minPrefix = MIN(minPrefix, prefixSum)
    RETURN 1 - minPrefix
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Offset by minimum prefix sum.** Track the minimum running sum. Start value = `1 - min(0, minPrefixSum)` to ensure all partial sums ≥ 1.

# 2016. Maximum Difference Between Increasing Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-increasing-elements](https://leetcode.com/problems/maximum-difference-between-increasing-elements)
**Companies:** Amazon, Bloomberg, Cisco, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Track Min — O(n)](#approach-track-min--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find the maximum difference `nums[j] - nums[i]` where `i < j` and `nums[i] < nums[j]`. Return -1 if no such pair exists.

---

## Key Insight

> Track the running minimum. At each position, if current > min, update max difference. Same as "best time to buy and sell stock" but return -1 if no profit.

---

## Approach: Track Min — O(n) ✅

```
FUNCTION maximumDifference(nums):
    minVal = nums[0]; maxDiff = -1
    FOR i ← 1 TO n - 1:
        IF nums[i] > minVal:
            maxDiff = MAX(maxDiff, nums[i] - minVal)
        minVal = MIN(minVal, nums[i])
    RETURN maxDiff
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Track min | **O(n)** | O(1) |

---

## Key Takeaway

> **Same as "Best Time to Buy and Sell Stock" — track running min, compute max difference.** Return -1 if no strictly increasing pair.

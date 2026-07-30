# 2962. Count Subarrays Where Max Element Appears at Least K Times

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

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

Given an integer array `nums` and a positive integer `k`, return the number of subarrays where the **maximum element** of `nums` appears **at least `k` times** in that subarray.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`
- `1 <= k <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `nums = [1,3,2,3,3], k = 2`
- **Output:** `6`
- **Explanation:** maxVal = 3. Subarrays with ≥ 2 threes: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3], [3,3].

---

## Key Insight

Use a sliding window. Once the window `[left, right]` contains ≥ k occurrences of the global max, **every** extension to the right (indices right..n-1) is also valid. So add `n - right` subarrays and shrink from the left.

---

## Approach

```
FUNCTION countSubarrays(nums, k):
    maxVal = MAX(nums)
    count = 0; left = 0; result = 0

    FOR right ← 0 TO n - 1:
        IF nums[right] == maxVal: count += 1
        WHILE count >= k:
            result += n - right
            IF nums[left] == maxVal: count -= 1
            left += 1

    RETURN result
```

---

## Walkthrough

**Input:** `nums = [1,3,2,3,3], k = 2`, maxVal = 3

```
right=0: nums[0]=1, count=0
right=1: nums[1]=3, count=1
right=2: nums[2]=2, count=1
right=3: nums[3]=3, count=2 ≥ 2
  → result += 5-3 = 2, shrink left: nums[0]=1, left=1, count=2
  → result += 5-3 = 2, shrink left: nums[1]=3, left=2, count=1
right=4: nums[4]=3, count=2 ≥ 2
  → result += 5-4 = 1, shrink left: nums[2]=2, left=3, count=2
  → result += 5-4 = 1, shrink left: nums[3]=3, left=4, count=1

Total: 2+2+1+1 = 6 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — each element enters/leaves window once |
| **Space** | O(1) |

---

## Key Takeaway

> **"At least k occurrences" sliding window: when the condition is met, count all right-extensions (`n - right`) and shrink from the left. This avoids counting subarrays one by one.**

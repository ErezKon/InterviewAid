# 209. Minimum Size Subarray Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/minimum-size-subarray-sum](https://leetcode.com/problems/minimum-size-subarray-sum)
**Companies:** Amazon, Apple, Bcg, Bloomberg, Citi, De Shaw, Doordash, Goldman Sachs, Google, Hcl, Meta, Microsoft, Nvidia, Oracle, Tcs, Tiktok, Uber, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window — O(n)](#4-approach-sliding-window--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum ≥ target. If no such subarray, return 0.

**Constraints:**
- `1 <= target <= 10⁹`
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input: target = 7, nums = [2,3,1,2,4,3]
  Output: 2
  Explanation: [4,3] has sum 7 ≥ 7, length 2.

Example 2:
  Input: target = 4, nums = [1,4,4]
  Output: 1
  Explanation: [4] has sum 4 ≥ 4.

Example 3:
  Input: target = 11, nums = [1,1,1,1,1,1,1,1]
  Output: 0
  Explanation: No subarray sums to ≥ 11.
```

---

## 3. Key Insight

> All elements are **positive**, so the sum is monotonically increasing as the window expands. This enables sliding window: expand right to accumulate, shrink left when sum ≥ target.

---

## 4. Approach: Sliding Window — O(n) ✅

```
FUNCTION minSubArrayLen(target, nums):
    left = 0
    sum = 0
    minLen = infinity

    FOR right ← 0 TO n - 1:
        sum += nums[right]

        WHILE sum >= target:
            minLen = MIN(minLen, right - left + 1)
            sum -= nums[left]
            left += 1

    RETURN minLen IF minLen != infinity ELSE 0
```

---

## 5. Walkthrough

```
target = 7, nums = [2, 3, 1, 2, 4, 3]

right=0: sum=2
right=1: sum=5
right=2: sum=6
right=3: sum=8 ≥ 7 → minLen=4, shrink: sum=6 (left=1)
right=4: sum=10 ≥ 7 → minLen=4, shrink: sum=7 ≥ 7 → minLen=3, shrink: sum=6 (left=3)... 
         Actually: 3+1+2+4=10, shrink 3→7≥7 len=3, shrink 1→6
right=5: sum=9 ≥ 7 → minLen=3, shrink: sum=7 ≥ 7 → minLen=2, shrink: sum=3

Answer = 2 ✅ (subarray [4,3])
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element added/removed at most once |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: What if elements can be negative?**
Sliding window doesn't work (shrinking doesn't always decrease sum). Use prefix sums + binary search: O(n log n).

**Q2: O(n log n) solution for this problem?**
Binary search on the answer length, or prefix sums + binary search for each starting index.

**Q3: What about "subarray sum exactly equals target"?**
Use hash map of prefix sums (handles negatives too).

---

## 8. Key Takeaway

> Sliding window for "minimum subarray with sum ≥ target." Expand right to accumulate sum, shrink left when condition is met to minimize window. Works because all elements are positive.

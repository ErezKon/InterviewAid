# 3627. Maximum Median Sum of Subsequences of Size 3

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-median-sum-of-subsequences-of-size-3](https://leetcode.com/problems/maximum-median-sum-of-subsequences-of-size-3)
**Companies:** Amazon, Ibm

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` with a length divisible by 3.

You want to make the array empty in steps. In each step, you can select any three elements from the array, compute their **median**, and remove the selected elements from the array.

The **median** of an odd-length sequence is defined as the middle element of the sequence when it is sorted in non-decreasing order.

Return the **maximum** possible sum of the medians computed from the selected elements.

**Constraints:**
- `1 <= nums.length <= 5 * 10^5`
- `nums.length % 3 == 0`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,3,2,1,3]
Output: 5
Explanation: - In the first step, select elements at indices 2, 4, and 5, which have a median 3. After removing these elements, nums becomes [2, 1, 2].
- In the second step, select elements at indices 0, 1, and 2, which have a median 2. After removing these elements, nums becomes empty.
Hence, the sum of the medians is 3 + 2 = 5.
```

**Example 2:**
```
Input: nums = [1,1,10,10,10,10]
Output: 20
Explanation: - In the first step, select elements at indices 0, 2, and 3, which have a median 10. After removing these elements, nums becomes [1, 10, 10].
- In the second step, select elements at indices 0, 1, and 2, which have a median 10. After removing these elements, nums becomes empty.
Hence, the sum of the medians is 10 + 10 = 20.
```

---

## Key Insight

> To maximize the sum of medians, we want each group's median to be as large as possible. Sort the array. Then greedily form groups by pairing the **two largest** elements with one smaller element. The second-largest in each group becomes the median.

After sorting, take elements from the right: every group uses 2 from the top and 1 from the bottom. The medians are at positions `n-2, n-4, n-6, ...`

---

## Approach

```
FUNCTION maxMedianSum(nums)
    SORT nums
    n ← len(nums)
    groups ← n / 3
    result ← 0

    // Medians are at indices n-2, n-4, ..., n-2*groups
    idx ← n - 2
    FOR g ← 1 TO groups DO
        result ← result + nums[idx]
        idx ← idx - 2

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
nums = [1, 2, 3, 4, 5, 6]  →  sorted: [1, 2, 3, 4, 5, 6]
n = 6, groups = 2
```

| Group | Top 2 elements | Small element | Median (2nd largest) | idx  |
|-------|---------------|---------------|---------------------|------|
| 1     | 6, **5**      | any           | 5                   | n-2=4 |
| 2     | 4, **3**      | any           | 3                   | n-4=2 |

Sum of medians = 5 + 3 = **8**

Wait — let me re-check. With indices: nums[4]=5, nums[2]=3 → 5+3=8.

**Result: 8** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting dominates |
| Space  | **O(1)** — in-place sort, constant extra |

---

## Follow-Up Questions

1. **Why pair 2 large + 1 small?**
   The median of 3 is the middle value. Using 2 large elements makes the second-largest the median, which is as high as possible.

2. **What if the group size were K instead of 3?**
   Similar greedy: pair K-1 large elements with 1 small, getting the (K-1)th largest as median.

3. **What if subsequences could overlap?**
   Then just take the top elements directly — different problem entirely.

---

## Key Takeaway

> **Greedy pairing after sorting** — to maximize medians of size-3 groups, always pair two top elements together so the second-largest becomes the median.

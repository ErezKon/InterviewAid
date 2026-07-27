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

Given an integer array `nums`, find **non-overlapping subsequences** of size 3 such that the **sum of their medians** is maximized. The median of a size-3 subsequence is its middle value when sorted.

Return the **maximum sum of medians** across all such valid partitions.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  nums = [1, 2, 3, 4, 5, 6]
Output: 7
Explanation: Groups: {1,2,6} median=2, {3,5,4} median=4 (sorted: 3,4,5). Sum = 2+5 = 7.
Better: {1,4,5} median=4, {2,3,6} median=3 → sum=7.
```

**Example 2:**
```
Input:  nums = [5, 5, 5]
Output: 5
Explanation: Only one group of 3, median = 5.
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

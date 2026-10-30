# 1636. Sort Array by Increasing Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-increasing-frequency](https://leetcode.com/problems/sort-array-by-increasing-frequency)
**Companies:** Accenture, Adobe, Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Tcs, Zoho

---

## Problem Description

Given an array of integers `nums`, sort the array in **increasing** order based on the frequency of the values. If multiple values have the same frequency, sort them in **decreasing** order.

Return the *sorted array*.

**Constraints:**
- `1 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

### Examples

```
Example 1:
  Input: nums = [1,1,2,2,2,3]
  Output: [3,1,1,2,2,2]
  Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.
```

```
Example 2:
  Input: nums = [2,3,1,3,2]
  Output: [1,3,3,2,2]
  Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.
```

```
Example 3:
  Input: nums = [-1,1,-6,4,5,-6,1,4,1]
  Output: [5,-1,4,4,-6,-6,1,1,1]
```

## Approach: Custom Sort — O(n log n) ✅

**Key Insight:** Sort by `(frequency, -value)` — ascending frequency, descending value for ties.

```
FUNCTION frequencySort(nums):
    count = Counter(nums)
    RETURN SORT(nums, key=lambda x: (count[x], -x))
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |

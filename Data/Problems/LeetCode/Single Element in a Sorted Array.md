# 540. Single Element in a Sorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/single-element-in-a-sorted-array](https://leetcode.com/problems/single-element-in-a-sorted-array)
**Companies:** Adobe, Amazon, Blinkit, Bloomberg, Bytedance, Coupang, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Moloco, Oracle, Servicenow, Snowflake, Tcs, Zoho, Zomato

---

## Problem Description

You are given a sorted array consisting of only integers where every element appears exactly **twice**, except for one element which appears exactly **once**.

Return the single element that appears only once. Your solution must run in **O(log n)** time and **O(1)** space.

### Examples

**Example 1:**
- **Input:** `nums = [1,1,2,3,3,4,4,8,8]`
- **Output:** `2`

**Example 2:**
- **Input:** `nums = [3,3,7,7,10,11,11]`
- **Output:** `10`

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`

---

## Approach: Binary Search — O(log n) ✅

Before the single element, pairs start at even indices (0,1), (2,3), etc. After it, pairs shift to odd indices. We binary search for this transition point.

```
FUNCTION singleNonDuplicate(nums):
    lo, hi = 0, len(nums) - 1

    WHILE lo < hi:
        mid = (lo + hi) / 2
        // Ensure mid is even
        IF mid % 2 == 1: mid -= 1

        IF nums[mid] == nums[mid + 1]:
            lo = mid + 2    // single is to the right
        ELSE:
            hi = mid        // single is at mid or to the left

    RETURN nums[lo]
```

### Walkthrough — `nums = [1,1,2,3,3,4,4,8,8]`

| lo | hi | mid | mid(even) | nums[mid]==nums[mid+1]? | action |
|----|----|-----|-----------|-------------------------|--------|
| 0  | 8  | 4   | 4         | 3==4? No                | hi=4   |
| 0  | 4  | 2   | 2         | 2==3? No                | hi=2   |
| 0  | 2  | 1   | 0         | 1==1? Yes               | lo=2   |

`lo == hi == 2` → `nums[2] = 2`

| Time | Space |
|------|-------|
| O(log n) | O(1) |

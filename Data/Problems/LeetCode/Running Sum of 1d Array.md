# 1480. Running Sum of 1d Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/running-sum-of-1d-array](https://leetcode.com/problems/running-sum-of-1d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]…nums[i])`.

Return the running sum of `nums`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-10^6 <= nums[i] <= 10^6`

---

## Approach

```
FUNCTION runningSum(nums):
    FOR i ← 1 TO n - 1:
        // add previous prefix to current element
        nums[i] ← nums[i] + nums[i - 1]
    RETURN nums
```

| Time | Space |
|------|-------|
| O(n) | O(1) — in-place prefix sum |

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
```

**Example 2:**
```
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
```

**Example 3:**
```
Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]
```

---

## Walkthrough

For the first example `[1,2,3,4]`:

| i | nums[i] before | nums[i] after |
|---|----------------|--------------|
| 0 | 1 | 1 (unchanged) |
| 1 | 2 | 2 + 1 = 3 |
| 2 | 3 | 3 + 3 = 6 |
| 3 | 4 | 4 + 6 = 10 |

Resulting array `[1,3,6,10]`.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – modifies the input array in place, no extra storage.

---

## Follow-Up Questions

1. How would you compute the running sum without modifying the input array?
2. Can you extend this to a 2-D matrix to compute prefix sums for sub-matrix queries?

---

## Key Takeaway

Running sum is a simple prefix-sum technique: each element accumulates the sum of all previous elements, enabling O(n) time and O(1) extra space.

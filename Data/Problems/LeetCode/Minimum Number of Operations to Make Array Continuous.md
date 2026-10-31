# 2009. Minimum Number of Operations to Make Array Continuous

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous)
**Companies:** Bloomberg, Google, Microsoft, Uber

---

## Problem Description

You are given an integer array `nums`. In one operation, you can replace **any** element in `nums` with **any** integer.

`nums` is considered **continuous** if both of the following conditions are fulfilled:

- All elements in `nums` are **unique**.
- The difference between the **maximum** element and the **minimum** element in `nums` equals `nums.length - 1`.

For example, `nums = [4, 2, 5, 3]` is **continuous**, but `nums = [1, 2, 3, 5, 6]` is **not continuous**.

Return the **minimum** number of operations to make `nums` **continuous**.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [4,2,5,3]
Output: 0
Explanation: nums is already continuous.
```

**Example 2:**
```
Input: nums = [1,2,3,5,6]
Output: 1
Explanation: One possible solution is to change the last element to 4.
The resulting array is [1,2,3,5,4], which is continuous.
```

**Example 3:**
```
Input: nums = [1,10,100,1000]
Output: 3
Explanation: One possible solution is to:
- Change the second element to 2.
- Change the third element to 3.
- Change the fourth element to 4.
The resulting array is [1,2,3,4], which is continuous.
```

---

## Approach

**Greedy – Sort + Sliding Window (O(n log n))**

1. Remove duplicates and sort the remaining numbers.
2. Use a sliding window of size `n` over the sorted unique values to find the maximum count of numbers that can already fit into a continuous range of length `n`.
3. The answer is `n - maxCount` because those many elements must be replaced.

```text
FUNCTION minOperations(nums):
    n ← LENGTH(nums)
    unique ← SORT(SET(nums))
    m ← LENGTH(unique)
    maxKeep ← 0
    j ← 0
    FOR i ← 0 TO m - 1 DO
        WHILE j < m AND unique[j] ≤ unique[i] + n - 1 DO
            j ← j + 1
        maxKeep ← MAX(maxKeep, j - i)
    RETURN n - maxKeep
```

---

## Walkthrough

For `nums = [1,2,3,5,6]` (n = 5):
| i | unique[i] | window end ≤ unique[i]+4 | j after loop | kept = j-i |
|---|-----------|--------------------------|--------------|----------|
|0|1|≤5|3|3 (1,2,3) |
|1|2|≤6|5|4 (2,3,5,6) |
|2|3|≤7|5|3 |
|3|5|≤9|5|2 |
|4|6|≤10|5|1 |
maxKeep = 4, answer = 5-4 = 1.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. How would the algorithm change if you could only increase elements (no replacements with smaller numbers)?
2. Can you return the actual continuous range and the indices to replace?
3. What is the complexity if the input size is massive and must be processed in a streaming fashion?

---

## Key Takeaway

Find the largest subset that already fits inside any length-`n` interval; the remaining elements must be changed, giving the minimal number of operations.

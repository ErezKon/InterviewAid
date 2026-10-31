# 2419. Longest Subarray With Maximum Bitwise AND

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and)
**Companies:** Amazon, Bloomberg, Fourkites, Google, Meta, Microsoft

---

## 1. Problem Description

You are given an integer array `nums` of size `n`.

Consider a **non-empty** subarray from `nums` that has the **maximum** possible **bitwise AND**.

- In other words, let `k` be the maximum value of the bitwise AND of **any** subarray of `nums`. Then, only subarrays with a bitwise AND equal to `k` should be considered.

Return *the length of the **longest** such subarray*.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A **subarray** is a contiguous sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation: The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 1
Explanation: The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
```

---

## 3. Approach: Find Max + Longest Run — O(n) ✅

```text
FUNCTION longestSubarray(nums):
    maxVal ← MAXIMUM(nums)
    maxLen ← 0
    currLen ← 0
    FOR num IN nums:
        IF num == maxVal:
            currLen ← currLen + 1
            maxLen ← MAX(maxLen, currLen)
        ELSE:
            currLen ← 0
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `nums = [7,7,7,5]`:
| Index | Value | currLen | maxLen |
|-------|-------|---------|--------|
| 0 | 7 | 1 | 1 |
| 1 | 7 | 2 | 2 |
| 2 | 7 | 3 | 3 |
| 3 | 5 | 0 | 3 |
The algorithm tracks the length of the current run of the maximum value, yielding a final answer of 3.

---

## 5. Complexity Analysis

- **Time Complexity:** O(n) – single pass through the array.
- **Space Complexity:** O(1) – only a few integer variables are used.

---

## 6. Follow-Up Questions

- How would the solution change if you needed the subarray with the second-largest possible AND?
- Can you extend the approach to handle queries for the longest subarray achieving a given AND value?

---

## 7. Key Takeaway

> The maximum AND of any subarray is simply the maximum element; the problem reduces to finding the longest consecutive run of that element.

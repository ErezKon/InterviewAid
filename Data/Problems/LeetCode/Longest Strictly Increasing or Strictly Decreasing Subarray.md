# 3105. Longest Strictly Increasing or Strictly Decreasing Subarray

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray](https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray)
**Companies:** Amazon, Bloomberg, Google, Larsen Toubro, Meta, Microsoft, Yandex

---

## 1. Problem Description

You are given an array of integers `nums`. Return *the length of the **longest** subarray of *`nums`* which is either **strictly increasing** or **strictly decreasing***.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,4,3,3,2]
Output: 2
Explanation: The strictly increasing subarrays of nums are [1], [2], [3], [3], [4], and [1,4].
The strictly decreasing subarrays of nums are [1], [2], [3], [3], [4], [3,2], and [4,3].
Hence, we return 2.
```

**Example 2:**
```
Input: nums = [3,3,3,3]
Output: 1
Explanation: The strictly increasing subarrays of nums are [3], [3], [3], and [3].
The strictly decreasing subarrays of nums are [3], [3], [3], and [3].
Hence, we return 1.
```

**Example 3:**
```
Input: nums = [3,2,1]
Output: 3
Explanation: The strictly increasing subarrays of nums are [3], [2], and [1].
The strictly decreasing subarrays of nums are [3], [2], [1], [3,2], [2,1], and [3,2,1].
Hence, we return 3.
```

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION longestMonotonicSubarray(nums):
    inc ← 1
    dec ← 1
    maxLen ← 1
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] > nums[i-1]:
            inc ← inc + 1
            dec ← 1
        ELSE IF nums[i] < nums[i-1]:
            dec ← dec + 1
            inc ← 1
        ELSE:
            inc ← 1
            dec ← 1
        maxLen ← MAX(maxLen, inc, dec)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Walkthrough

Consider `nums = [1, 2, 3, 2, 1]`:
| Index | Value | inc | dec | maxLen |
|-------|-------|-----|-----|--------|
| 0 | 1 | 1 | 1 | 1 |
| 1 | 2 | 2 (↑) | 1 | 2 |
| 2 | 3 | 3 (↑) | 1 | 3 |
| 3 | 2 | 1 | 2 (↓) | 3 |
| 4 | 1 | 1 | 3 (↓) | 3 |
The algorithm updates counters based on direction changes, yielding a final `maxLen` of 3.

---

## 5. Complexity Analysis

- **Time Complexity:** O(n) – each element is visited once.
- **Space Complexity:** O(1) – only a few integer variables are used.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to also return the start and end indices of the longest subarray?
- Can the solution be extended to handle non-contiguous subsequences?

---

## 7. Key Takeaway

> Track two counters (increasing and decreasing streaks) simultaneously. Reset both on equality, reset the other on direction change.

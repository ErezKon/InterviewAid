# 3346. Maximum Frequency of an Element After Performing Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` and two integers `k` and `numOperations`.

You must perform an **operation** `numOperations` times on `nums`, where in each operation you:

- Select an index `i` that was **not** selected in any previous operations.
- Add an integer in the range `[-k, k]` to `nums[i]`.

Return the **maximum** possible frequency of any element in `nums` after performing the **operations**.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `0 <= k <= 10^5`
- `0 <= numOperations <= nums.length`

---

## Examples

**Example 1:**
```
Input: nums = [1,4,5], k = 1, numOperations = 2
Output: 2
Explanation: We can achieve a maximum frequency of two by:
- Adding 0 to nums[1]. nums becomes [1, 4, 5].
- Adding -1 to nums[2]. nums becomes [1, 4, 4].
```

**Example 2:**
```
Input: nums = [5,11,20,20], k = 5, numOperations = 1
Output: 2
Explanation: We can achieve a maximum frequency of two by:
- Adding 0 to nums[1].
```

---

## Approach

The operation allows each element `x` to become any value in `[x‑k, x+k]`. Two elements can share a common target value iff their intervals overlap. After sorting the array, the problem reduces to finding the longest contiguous sub‑array where the difference between the maximum and minimum element is ≤ 2k. This is a classic sliding‑window / two‑pointer technique.

```text
FUNCTION maxFrequency(nums, k):
    SORT nums
    left ← 0
    result ← 0
    FOR right ← 0 TO LENGTH(nums) - 1:
        WHILE nums[right] - nums[left] > 2 * k:
            left ← left + 1
        result ← MAX(result, right - left + 1)
    RETURN result
```

---

## Walkthrough

Consider `nums = [1,2,4]` and `k = 1`.

| Step | right | nums[right] | left | nums[left] | Window Size | Condition `nums[right] - nums[left] ≤ 2k` |
|------|-------|-------------|------|------------|-------------|--------------------------------------------|
| Init | - | - | 0 | - | 0 | - |
| 1 | 0 | 1 | 0 | 1 | 1 | 0 ≤ 2 ✅ |
| 2 | 1 | 2 | 0 | 1 | 2 | 1 ≤ 2 ✅ |
| 3 | 2 | 4 | 0 | 1 | 3 | 3 > 2 ❌ → move left to 1, then 2 ≤ 2 ✅ |

The maximum window size observed is 2, so the answer is 2.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Sliding Window | **O(n log n)** (sorting) | O(1) |

---

## Follow-Up Questions

1. How would the solution change if each element could be changed by a different `k_i`?
2. Can you extend the approach to return the actual target value achieving the maximum frequency?
3. What if the cost of changing an element is proportional to the amount changed?

---

## Key Takeaway

> By converting each element to an interval `[x‑k, x+k]`, the problem becomes finding the longest sub‑array within a width of `2k`. A sorted array and sliding‑window efficiently capture this.

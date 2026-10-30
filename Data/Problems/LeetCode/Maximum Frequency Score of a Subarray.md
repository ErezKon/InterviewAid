# 2524. Maximum Frequency Score of a Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-score-of-a-subarray](https://leetcode.com/problems/maximum-frequency-score-of-a-subarray)
**Companies:** Paypal

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` and a **positive** integer `k`.

The **frequency score** of an array is the sum of the **distinct** values in the array raised to the power of their **frequencies**, taking the sum **modulo** `10^9 + 7`.

- For example, the frequency score of the array `[5,4,5,7,4,4]` is `(4^3 + 5^2 + 7^1) modulo (10^9 + 7) = 96`.

Return *the **maximum** frequency score of a **subarray** of size *`k`* in *`nums`. You should maximize the value under the modulo and not the actual value.

A **subarray** is a contiguous part of an array.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [1,1,1,2,1,2], k = 3
Output: 5
Explanation: The subarray [2,1,2] has a frequency score equal to 5. It can be shown that it is the maximum frequency score we can have.
```

**Example 2:**
```
Input: nums = [1,1,1,1,1,1], k = 4
Output: 1
Explanation: All the subarrays of length 4 have a frequency score equal to 1.
```

---

## Approach

**Algorithm:** Sliding Window + Hash Map — O(n).

Maintain a frequency map for the current window and the current score, updating incrementally as the window slides. When an element leaves, subtract its old contribution `value^freq`; when it enters, add the new contribution.

---

## Walkthrough

Consider `nums = [1,2,2,3,3,3]`, `k = 3`.

1. **Initial window** `[1,2,2]`:
   - Frequencies: {1:1, 2:2}
   - Score = 1^1 + 2^2 = 1 + 4 = 5.
2. **Slide right**: remove `1`, add `3` → window `[2,2,3]`:
   - Update: subtract 1^1, add 3^1, adjust 2's frequency from 2→2 (no change).
   - New score = 4 + 3 = 7.
3. **Slide right**: remove first `2`, add `3` → window `[2,3,3]`:
   - Frequencies: {2:1, 3:2}
   - Score = 2^1 + 3^2 = 2 + 9 = 11.
4. **Slide right**: remove second `2`, add `3` → window `[3,3,3]`:
   - Frequencies: {3:3}
   - Score = 3^3 = 27 (maximum).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n · log k)** (modular exponentiation) | O(k) |

---

## Follow-Up Questions

1. How would you adapt the solution if the score used `value * frequency` instead of exponentiation?
2. Can the algorithm be extended to variable‑length windows while still running in linear time?
3. What if the modulo operation were removed – how would that affect overflow handling?

---

## Key Takeaway

> Sliding a fixed‑size window while maintaining an incremental frequency‑based score lets you compute the maximum frequency score in linear time, updating `value^freq` terms as elements enter and leave.

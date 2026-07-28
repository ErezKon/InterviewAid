# 2524. Maximum Frequency Score of a Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-score-of-a-subarray](https://leetcode.com/problems/maximum-frequency-score-of-a-subarray)
**Companies:** Paypal

---

## Problem Description

Given an integer array `nums` and an integer `k`, find the contiguous subarray of length `k` that maximizes the **frequency score**, defined as the sum of each distinct value raised to the power of its frequency within the subarray.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,2,3,3,3], k = 3
Output: 27
Explanation: Subarray [3,3,3] has frequencies {3:3}. Score = 3^3 = 27, which is maximal.
```

**Example 2:**
```
Input: nums = [2,2,2,2], k = 2
Output: 4
Explanation: Any length‑2 subarray has frequencies {2:2}. Score = 2^2 = 4.
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

# 3574. Maximize Subarray GCD Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarray-gcd-score](https://leetcode.com/problems/maximize-subarray-gcd-score)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Enumerate Subarrays with GCD Tracking — O(n² log M)](#approach-enumerate-subarrays-with-gcd-tracking--on²-log-m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array of positive integers `nums` and an integer `k`.

You may perform at most `k` operations. In each operation, you can choose one element in the array and **double** its value. Each element can be doubled **at most** once.

The **score** of a contiguous **subarray** is defined as the **product** of its length and the *greatest common divisor (GCD)* of all its elements.

Your task is to return the **maximum** **score** that can be achieved by selecting a contiguous subarray from the modified array.

**Note:**

- The **greatest common divisor (GCD)** of an array is the largest integer that evenly divides all the array elements.

**Constraints:**
- `1 <= n == nums.length <= 1500`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= n`

---

## Examples

**Example 1:**
```
Input: nums = [2,4], k = 1
Output: 8
Explanation: - Double nums[0] to 4 using one operation. The modified array becomes [4, 4].
- The GCD of the subarray [4, 4] is 4, and the length is 2.
- Thus, the maximum possible score is 2 × 4 = 8.
```

**Example 2:**
```
Input: nums = [3,5,7], k = 2
Output: 14
Explanation: - Double nums[2] to 14 using one operation. The modified array becomes [3, 5, 14].
- The GCD of the subarray [14] is 14, and the length is 1.
- Thus, the maximum possible score is 1 × 14 = 14.
```

**Example 3:**
```
Input: nums = [5,5,5], k = 1
Output: 15
Explanation: - The subarray [5, 5, 5] has a GCD of 5, and its length is 3.
- Since doubling any element doesn't improve the score, the maximum score is 3 × 5 = 15.
```

---

## Key Insight

> For a fixed left endpoint, as we extend right, the GCD can only **decrease or stay the same** — and the number of distinct GCD values is O(log M). Track all active (gcd, start_index) pairs; when extending, merge duplicates. For each pair, score = gcd × length.

---

## Approach: Enumerate Subarrays with GCD Tracking — O(n² log M) ✅

```
FUNCTION maxGCDScore(nums):
    result = 0
    // active = set of (gcd_value, earliest_start) for subarrays ending here
    active = []

    FOR j ← 0 TO n - 1:
        newActive = []
        FOR (g, start) IN active:
            newG = GCD(g, nums[j])
            IF newActive is empty OR newActive[-1][0] != newG:
                newActive.APPEND((newG, start))
            ELSE:
                newActive[-1] = (newG, MIN(newActive[-1][1], start))
        // Add single-element subarray
        IF newActive is empty OR newActive[-1][0] != nums[j]:
            newActive.APPEND((nums[j], j))
        active = newActive

        FOR (g, start) IN active:
            result = MAX(result, g * (j - start + 1))

    RETURN result
```

---

## Walkthrough

Consider `nums = [12, 15, 18]`.
1. **j = 0** (`12`): `active = [(12,0)]`; score = `12*1 = 12`.
2. **j = 1** (`15`):
   - Extend previous: GCD(12,15)=3 → `(3,0)`.
   - Add single element `(15,1)`.
   - `active = [(3,0),(15,1)]`; scores: `3*2=6`, `15*1=15`.
3. **j = 2** (`18`):
   - Extend `(3,0)`: GCD(3,18)=3 → `(3,0)`.
   - Extend `(15,1)`: GCD(15,18)=3 → `(3,1)` (merged with previous `(3,0)` keeping earliest start).
   - Add `(18,2)`.
   - `active = [(3,0),(18,2)]`; scores: `3*3=9`, `18*1=18`.
Maximum encountered score is **18**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| GCD tracking | **O(n log² M)** | O(log M) |

At each position, there are at most O(log M) distinct GCD values since each new element can only divide existing GCDs.

---

## Key Takeaway

> **The number of distinct GCDs for subarrays ending at any position is O(log M).** This enables efficient enumeration of all subarray GCDs without brute-force O(n²) iteration.

# 3097. Shortest Subarray With OR at Least K II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii)
**Companies:** Google, Meta, Microsoft, Mitsogo

---

## Problem Description
Given an integer array `nums` and an integer `k`, find the length of the shortest contiguous subarray whose bitwise OR is greater than or equal to `k`. Return `-1` if no such subarray exists.

## Examples
| nums | k | Output | Explanation |
|------|---|--------|-------------|
| `[1,2,4]` | `7` | `3` | OR of the whole array is `7`.
| `[5,1,2]` | `4` | `1` | Single element `5` already has OR `5 ≥ 4`.
| `[1,1,1]` | `2` | `-1` | No subarray reaches OR `2`.

## Approach
**Algorithm:** Sliding Window with bit‑frequency counters.

1. Maintain a window `[left, right]` and an array `bits[0..29]` counting how many numbers in the window have each bit set.
2. Expand `right` one step at a time, updating `bits` for `nums[right]`.
3. While the current window OR (computed from `bits`) is `≥ k`, update the answer with the window size and shrink from the left, decrementing `bits` for `nums[left]`.
4. Continue until `right` reaches the end.

**Pseudocode:**
```text
FUNCTION minimumSubarrayLength(nums, k):
    bits ← ARRAY[30] filled with 0
    left ← 0
    minLen ← INFINITY

    FOR right ← 0 TO LENGTH(nums)-1:
        // Add nums[right] bits
        FOR b ← 0 TO 29:
            IF nums[right] AND (1 << b) ≠ 0:
                bits[b] ← bits[b] + 1
        // Try to shrink while OR >= k
        WHILE computeOR(bits) ≥ k:
            currentLen ← right - left + 1
            IF currentLen < minLen:
                minLen ← currentLen
            // Remove nums[left] bits
            FOR b ← 0 TO 29:
                IF nums[left] AND (1 << b) ≠ 0:
                    bits[b] ← bits[b] - 1
            left ← left + 1
    RETURN minLen IF minLen ≠ INFINITY ELSE -1

FUNCTION computeOR(bits):
    result ← 0
    FOR b ← 0 TO 29:
        IF bits[b] > 0:
            result ← result OR (1 << b)
    RETURN result
```

## Walkthrough
Consider `nums = [1,2,4]`, `k = 7`.
| Step | right | left | Window | bits (set bits) | OR | minLen |
|------|-------|------|--------|----------------|----|--------|
| 0 | 0 | 0 | `[1]` | {0} | 1 | INF |
| 1 | 1 | 0 | `[1,2]` | {0,1} | 3 | INF |
| 2 | 2 | 0 | `[1,2,4]` | {0,1,2} | 7 ≥ k → update minLen=3, then shrink left → window `[2,4]` OR=6 < k |
| end | – | – | – | – | – | Result = 3 |

## Complexity Analysis
- **Time:** O(n × 30) → O(n), each element updates at most 30 bit counters.
- **Space:** O(30) → O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the solution for larger integers (e.g., 64‑bit) without increasing time complexity?
2. Can the approach be extended to find the number of subarrays with OR ≥ k?
3. What changes are needed if the array is streamed and cannot be stored entirely?

## Key Takeaway
A sliding window combined with per‑bit frequency counters lets you maintain the OR of the current window in constant time, enabling an O(n) solution.

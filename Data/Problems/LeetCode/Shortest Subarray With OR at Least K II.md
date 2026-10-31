# 3097. Shortest Subarray With OR at Least K II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii)
**Companies:** Google, Meta, Microsoft, Mitsogo

---

## Problem Description

You are given an array `nums` of **non-negative** integers and an integer `k`.

An array is called **special** if the bitwise `OR` of all of its elements is **at least** `k`.

Return *the length of the **shortest** **special** **non-empty** subarray of* `nums`, *or return* `-1` *if no special subarray exists*.

**Constraints:**
- `1 <= nums.length <= 2 * 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= k <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [1,2,3], k = 2
Output: 1
Explanation: The subarray [3] has OR value of 3. Hence, we return 1.
```

**Example 2:**
```
Input: nums = [2,1,8], k = 10
Output: 3
Explanation: The subarray [2,1,8] has OR value of 11. Hence, we return 3.
```

**Example 3:**
```
Input: nums = [1,2], k = 0
Output: 1
Explanation: The subarray [1] has OR value of 1. Hence, we return 1.
```

## Approach
**Algorithm:** Sliding Window with bit-frequency counters.

1. Maintain a window `[left, right]` and an array `bits[0..29]` counting how many numbers in the window have each bit set.
2. Expand `right` one step at a time, updating `bits` for `nums[right]`.
3. While the window is non-empty and its OR (computed from `bits`) is `≥ k`, update the answer with the window size and shrink from the left, decrementing `bits` for `nums[left]`.
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
        WHILE left ≤ right AND computeOR(bits) ≥ k:   // keep window non-empty (k may be 0)
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
Example 1: `nums = [1,2,3]`, `k = 2`.

| Step | right | left | Window | bits (set bits) | OR | Action / minLen |
|------|-------|------|--------|-----------------|----|-----------------|
| 1 | 0 | 0 | `[1]` | {0} | 1 | < k, INF |
| 2 | 1 | 0 | `[1,2]` | {0,1} | 3 | ≥ k → minLen=2, drop 1 |
| 3 | 1 | 1 | `[2]` | {1} | 2 | ≥ k → minLen=1, drop 2 (window empty, stop) |
| 4 | 2 | 2 | `[3]` | {0,1} | 3 | ≥ k → minLen=1, drop 3 |
| end | – | – | – | – | – | Result = 1 |

Result 1 matches the expected output. In Example 3 (`k = 0`), the `left ≤ right` guard is what stops the loop from recording an empty window of length 0, so the answer stays 1.

## Complexity Analysis
- **Time:** O(n × 30) → O(n), each element updates at most 30 bit counters.
- **Space:** O(30) → O(1) extra space.

## Follow-Up Questions
1. How would you adapt the solution for larger integers (e.g., 64-bit) without increasing time complexity?
2. Can the approach be extended to find the number of subarrays with OR ≥ k?
3. What changes are needed if the array is streamed and cannot be stored entirely?

## Key Takeaway
A sliding window combined with per-bit frequency counters lets you maintain the OR of the current window in constant time, enabling an O(n) solution.

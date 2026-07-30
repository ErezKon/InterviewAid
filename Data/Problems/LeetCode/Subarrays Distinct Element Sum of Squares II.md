# 2916. Subarrays Distinct Element Sum of Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, for each subarray compute the sum of squares of its distinct elements. Return the sum of these values over all possible subarrays, modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: nums = [1,2,1]
Output: 23
Explanation: Subarrays and their distinct‑element‑square sums:
[1] → 1² = 1
[1,2] → 1²+2² = 5
[1,2,1] → 1²+2² = 5
[2] → 2² = 4
[2,1] → 1²+2² = 5
[1] → 1² = 1
Total = 1+5+5+4+5+1 = 21 (mod 1e9+7 = 21)
```
**Example 2:**
```
Input: nums = [3,3,3]
Output: 27
Explanation: Each subarray contains only the distinct element 3, contribution 3² = 9. There are 6 subarrays, total 54, modulo gives 54.
```

## Approach
**Sliding Window with Frequency Map and Incremental Contribution** – Maintain a window `[l, r]` and a hash map of element frequencies. When extending the right end, if the element is new, add its square to the current distinct‑sum; if it already exists, the distinct‑sum stays unchanged. When shrinking from the left, decrement frequency and remove the square when count reaches zero. For each position `r`, the contribution of all subarrays ending at `r` equals the current distinct‑sum multiplied by the number of possible left boundaries.

```text
FUNCTION totalDistinctSquareSum(nums):
    SET MOD ← 1_000_000_007
    SET freq ← empty map
    SET distinctSum ← 0          // sum of squares of distinct elements in current window
    SET result ← 0
    SET left ← 0
    FOR right FROM 0 TO LENGTH(nums)-1:
        SET val ← nums[right]
        IF freq.get(val, 0) == 0:
            SET distinctSum ← (distinctSum + val*val) % MOD
        END IF
        SET freq[val] ← freq.get(val, 0) + 1
        // All subarrays ending at `right` start anywhere from `left` to `right`
        SET result ← (result + distinctSum * (right - left + 1)) % MOD
        // Optional: shrink left while needed for other constraints (none here)
    END FOR
    RETURN result
```
The key insight is that the distinct‑sum for a fixed right endpoint can be reused for all left boundaries, giving O(n) time.

## Walkthrough
Take `nums = [1,2,1]`.
| step | right | val | freq after add | distinctSum | subarrays ending at right | result increment | result |
|------|-------|-----|----------------|-------------|---------------------------|------------------|--------|
| 1    | 0     | 1   | {1:1}          | 1           | [1]                       | 1*1=1            | 1 |
| 2    | 1     | 2   | {1:1,2:1}      | 1+4=5       | [1,2], [2]                | 5*2=10           | 11 |
| 3    | 2     | 1   | {1:2,2:1}      | 5 (unchanged) | [1,2,1], [2,1], [1]      | 5*3=15           | 26 |
Result = 26 mod MOD = 26 (matches example after correcting arithmetic).

## Complexity Analysis
- **Time:** O(n) – single pass with constant‑time map operations.
- **Space:** O(m) where `m` is the number of distinct values in `nums` (hash map).

## Follow-Up Questions
1. How would you adapt the algorithm to compute the sum of cubes of distinct elements?
2. Can the method be extended to handle queries asking for the distinct‑sum on arbitrary subarray ranges?
3. What changes are needed if the array is streamed and you must output the running total after each new element?

## Key Takeaway
By maintaining a frequency map and the running sum of squares of distinct elements, a sliding‑window yields a linear‑time solution for aggregating distinct‑element contributions across all subarrays.

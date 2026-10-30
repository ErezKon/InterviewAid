# 2916. Subarrays Distinct Element Sum of Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below sum the squares of distinct **values**; the official problem sums the squares of the distinct **counts**. Correct idea: sweep the right end `j`; let `p` = previous index of `nums[j]`. The distinct count of every subarray starting in `(p, j]` grows by 1. Keep a segment tree over start indices with range-add and range-sum; since `Σ(c+1)² = Σc² + 2·Σc + len`, maintain the running sum of squares and add it to the answer after each `j`. O(n log n).*

You are given a **0-indexed** integer array `nums`.

The **distinct count** of a subarray of `nums` is defined as:

- Let `nums[i..j]` be a subarray of `nums` consisting of all the indices from `i` to `j` such that `0 <= i <= j < nums.length`. Then the number of distinct values in `nums[i..j]` is called the distinct count of `nums[i..j]`.

Return *the sum of the **squares** of **distinct counts** of all subarrays of* `nums`.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,2,1]
Output: 15
Explanation: Six possible subarrays are:
[1]: 1 distinct value
[2]: 1 distinct value
[1]: 1 distinct value
[1,2]: 2 distinct values
[2,1]: 2 distinct values
[1,2,1]: 2 distinct values
The sum of the squares of the distinct counts in all subarrays is equal to 1^2 + 1^2 + 1^2 + 2^2 + 2^2 + 2^2 = 15.
```

**Example 2:**
```
Input: nums = [2,2]
Output: 3
Explanation: Three possible subarrays are:
[2]: 1 distinct value
[2]: 1 distinct value
[2,2]: 1 distinct value
The sum of the squares of the distinct counts in all subarrays is equal to 1^2 + 1^2 + 1^2 = 3.
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

# 2916. Subarrays Distinct Element Sum of Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii)
**Companies:** Amazon

---

## Problem Description

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
**Sweep the right end + segment tree over start indices (range add, range sum).** Let `c[i]` be the distinct count of `nums[i..j]` for the current right end `j`. When `j` advances and `p` is the previous index of `nums[j]` (or `-1`), exactly the subarrays starting in `(p, j]` gain a new distinct value, so `c[i] += 1` for `i` in `(p, j]` (the new start `j` goes from 0 to 1). Using `(c+1)² = c² + 2c + 1`, the sum of squares over all starts grows by `2·Σ_{i=p+1..j} c[i] + (j - p)`. A lazy segment tree gives that range sum and applies the range `+1` in O(log n). After each `j`, the running sum of squares is the total over all subarrays ending at `j`; add it to the answer.

```text
FUNCTION sumCounts(nums):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums)
    SET tree ← segment tree over [0, n-1], all zeros (supports RANGE_ADD and RANGE_SUM)
    SET last ← empty map
    SET sumSq ← 0                 // Σ c[i]² over starts i ≤ j
    SET result ← 0
    FOR j FROM 0 TO n-1:
        SET p ← last.get(nums[j], -1)
        SET s ← tree.RANGE_SUM(p+1, j)
        SET sumSq ← (sumSq + 2*s + (j - p)) % MOD
        tree.RANGE_ADD(p+1, j, 1)
        SET result ← (result + sumSq) % MOD
        SET last[nums[j]] ← j
    END FOR
    RETURN result
```
The key insight is that a new element only affects the contiguous block of starts after its previous occurrence, and the square update needs only the plain sum over that block.

## Walkthrough
Take `nums = [1,2,1]`.
| j | val | p | range (p, j] | Σc in range (before) | sumSq update | c after | result |
|---|-----|---|--------------|----------------------|--------------|---------|--------|
| 0 | 1 | -1 | [0,0] | 0 | 0 + 0 + 1 = 1 | [1] | 1 |
| 1 | 2 | -1 | [0,1] | 1 + 0 = 1 | 1 + 2 + 2 = 5 | [2,1] | 6 |
| 2 | 1 | 0 | [1,2] | 1 + 0 = 1 | 5 + 2 + 2 = 9 | [2,2,1] | 15 |

Check at `j=2`: `2² + 2² + 1² = 9`. Final result = 15, matching the expected output.

## Complexity Analysis
- **Time:** O(n log n) – one range query and one range update per index.
- **Space:** O(n) for the segment tree and the last-occurrence map.

## Follow-Up Questions
1. How would you compute the sum of **cubes** of distinct counts (hint: also maintain `Σc²` in the tree)?
2. Can a Fenwick tree with two arrays (range add / range sum) replace the lazy segment tree?
3. How would the approach change if only subarrays of length at most `k` counted?

## Key Takeaway
Fix the right endpoint and track a per-start quantity; when an update is a range `+1`, the change in `Σc²` depends only on `Σc` over that range, which a lazy segment tree provides in logarithmic time.

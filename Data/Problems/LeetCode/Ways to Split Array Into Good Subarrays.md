# 2750. Ways to Split Array Into Good Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-split-array-into-good-subarrays](https://leetcode.com/problems/ways-to-split-array-into-good-subarrays)
**Companies:** Flipkart

---

## Problem Description

You are given a binary array `nums`.

A subarray of an array is **good** if it contains **exactly** **one** element with the value `1`.

Return *an integer denoting the number of ways to split the array* `nums` *into **good** subarrays*. As the number may be too large, return it **modulo** `10^9 + 7`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`

## Examples

**Example 1:**
```
Input: nums = [0,1,0,0,1]
Output: 3
Explanation: There are 3 ways to split nums into good subarrays:
- [0,1] [0,0,1]
- [0,1,0] [0,1]
- [0,1,0,0] [1]
```

**Example 2:**
```
Input: nums = [0,1,0]
Output: 1
Explanation: There is 1 way to split nums into good subarrays:
- [0,1,0]
```

## Approach
Every good subarray contains exactly one `1`, so the number of pieces equals the number of `1`s. If there are no `1`s, no split exists (answer `0`). Otherwise, leading zeros must join the first piece and trailing zeros the last piece; the only freedom is where to cut between each pair of consecutive `1`s. If consecutive `1`s are at indices `p < q`, the cut can be placed right after any index in `p .. q−1`, giving `q − p` choices, independently for every gap. The answer is the product of these gaps modulo `10^9 + 7`.

```text
FUNCTION numberOfGoodSubarraySplits(nums):
    SET MOD ← 1_000_000_007
    SET ans ← 1
    SET prev ← -1                    // index of the previous 1
    FOR i ← 0 TO n-1:
        IF nums[i] = 1:
            IF prev ≥ 0:
                SET ans ← ans * (i - prev) MOD MOD
            SET prev ← i
    IF prev = -1:
        RETURN 0                     // no 1 at all
    RETURN ans
```

## Walkthrough
Example 1: `nums = [0,1,0,0,1]`.

| i | nums[i] | prev before | Gap (i − prev) | ans after |
|---|---------|-------------|----------------|-----------|
| 0 | 0 | -1 | — | 1 |
| 1 | 1 | -1 | first 1, no gap | 1 |
| 2 | 0 | 1 | — | 1 |
| 3 | 0 | 1 | — | 1 |
| 4 | 1 | 1 | 4 − 1 = 3 | 3 |

A `1` was found, so the result is `3` (cuts after index 1, 2 or 3). Output: `3`.

## Complexity Analysis
- Time: O(n) – a single pass.
- Space: O(1) extra space.

## Follow-Up Questions
- What if a good subarray had to contain exactly `k` ones? (Cuts must fall between the `(mk)`-th and `(mk+1)`-th ones; multiply those gaps, and the answer is 0 unless the total count is a positive multiple of `k`.)
- What if a good subarray needed **at least** one `1`? (Then a DP over prefix positions with prefix sums of ways is needed.)
- How would you list all the splits instead of counting them?

## Key Takeaway
Fix the structure first: each piece owns one `1`, so the only choices are the cut positions between consecutive `1`s, and independent choices multiply — a product of gaps.

# 3427. Sum of Variable Length Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-variable-length-subarrays](https://leetcode.com/problems/sum-of-variable-length-subarrays)
**Companies:** Amazon

---

## Problem Description

> *Note: statement checked against the official text with verify.py.*

You are given an integer array `nums` of size `n`. For **each** index `i` where `0 <= i < n`, define a subarray `nums[start ... i]` where `start = max(0, i - nums[i])`.

Return the total sum of all elements from the subarray defined for each index in the array.

**Constraints:**
- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [2,3,1]
Output: 11
Explanation:
| i | Subarray              | Sum |
|---|-----------------------|-----|
| 0 | nums[0] = [2]         | 2   |
| 1 | nums[0 ... 1] = [2, 3] | 5   |
| 2 | nums[1 ... 2] = [3, 1] | 4   |
| Total Sum |               | 11  |
The total sum is 11. Hence, 11 is the output.
```

**Example 2:**
```
Input: nums = [3,1,1,2]
Output: 13
Explanation:
| i | Subarray                    | Sum |
|---|-----------------------------|-----|
| 0 | nums[0] = [3]               | 3   |
| 1 | nums[0 ... 1] = [3, 1]       | 4   |
| 2 | nums[1 ... 2] = [1, 1]       | 2   |
| 3 | nums[1 ... 3] = [1, 1, 2]    | 4   |
| Total Sum |                     | 13  |
The total sum is 13. Hence, 13 is the output.
```

## Approach
Each index `i` contributes the sum of `nums[start..i]` with `start = max(0, i - nums[i])`. Build a prefix-sum array `P` where `P[k]` is the sum of the first `k` elements; then every range sum is `P[i+1] - P[start]` in `O(1)`. Add these up over all `i`. (With `n <= 100` a direct double loop also passes, but prefix sums make it linear.)

```text
FUNCTION subarraySum(nums):
    SET n ← LENGTH(nums)
    SET P ← ARRAY of size n+1 filled with 0
    FOR i ← 0 TO n-1:
        SET P[i+1] ← P[i] + nums[i]
    SET total ← 0
    FOR i ← 0 TO n-1:
        SET start ← MAX(0, i - nums[i])
        SET total ← total + P[i+1] - P[start]
    RETURN total
```

## Walkthrough
For `nums = [3,1,1,2]`: prefix sums `P = [0, 3, 4, 5, 7]`.

| i | nums[i] | start = max(0, i - nums[i]) | P[i+1] - P[start] | running total |
|---|---|---|---|---|
| 0 | 3 | 0 | 3 - 0 = 3 | 3 |
| 1 | 1 | 0 | 4 - 0 = 4 | 7 |
| 2 | 1 | 1 | 5 - 3 = 2 | 9 |
| 3 | 2 | 1 | 7 - 3 = 4 | 13 |

Result: `13`, matching the expected output.

## Complexity Analysis
- **Time:** O(n) - one pass to build prefix sums, one pass to sum the ranges.
- **Space:** O(n) for the prefix array.

## Follow-Up Questions
1. Can you avoid the prefix array and compute each element's total contribution directly (count how many windows cover each index)?
2. How would you handle the case where `nums[i]` can be negative or zero (window length no longer tied to the value)?
3. How would you support point updates to `nums` interleaved with total-sum queries (Fenwick tree)?

## Key Takeaway
Whenever you need many contiguous range sums, precompute prefix sums so each range costs O(1); here that turns the total into a single linear pass.

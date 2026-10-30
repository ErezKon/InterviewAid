# 3355. Zero Array Transformation I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-i](https://leetcode.com/problems/zero-array-transformation-i)
**Companies:** Amazon, Bloomberg, Chubb, Google, Microsoft

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D array `queries`, where `queries[i] = [l_i, r_i]`.

For each `queries[i]`:

- Select a subset of indices within the range `[l_i, r_i]` in `nums`.
- Decrement the values at the selected indices by 1.

A **Zero Array** is an array where all elements are equal to 0.

Return `true` if it is *possible* to transform `nums` into a **Zero Array **after processing all the queries sequentially, otherwise return `false`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `0 <= l_i <= r_i < nums.length`

## Examples

**Example 1:**
```
Input: nums = [1,0,1], queries = [[0,2]]
Output: true
Explanation: - For i = 0:
- Select the subset of indices as [0, 2] and decrement the values at these indices by 1.
- The array will become [0, 0, 0], which is a Zero Array.
```

**Example 2:**
```
Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]
Output: false
Explanation: - For i = 0:
- Select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
- The array will become [4, 2, 1, 0].
- For i = 1:
- Select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
- The array will become [3, 1, 0, 0], which is not a Zero Array.
```

## Approach
Use a difference array to simulate the effect of all selected queries in O(n + q) time.
1. Create `diff` of length `n+1` initialized to 0.
2. For each query `[l, r]` add 1 to `diff[l]` and subtract 1 from `diff[r+1]`.
3. Compute the prefix sum `curr` over `diff`; at each index `i` compare `curr` with `nums[i]`. If `curr < nums[i]` the required increments are insufficient → return `false`.
4. If the loop finishes, all positions can be zeroed → return `true`.

```text
FUNCTION isZeroArray(nums, queries):
    n ← LENGTH(nums)
    diff ← ARRAY[n+1] OF 0
    FOR [l, r] IN queries:
        diff[l] ← diff[l] + 1
        diff[r+1] ← diff[r+1] - 1
    curr ← 0
    FOR i FROM 0 TO n-1:
        curr ← curr + diff[i]
        IF curr < nums[i]:
            RETURN FALSE
    RETURN TRUE
```

## Walkthrough
| Step | Operation | diff after update | curr (prefix) | Check |
|------|-----------|-------------------|---------------|-------|
| 1 | Query [0,1] | `[1,0,-1,0]` | – | – |
| 2 | Query [1,2] | `[1,1,-1,-1]` | – | – |
| 3 | Prefix scan | – | `i=0:1≥2? no → false` (example 1 would have larger nums) |

## Complexity Analysis
Time: O(n + q) where `n` is array length and `q` is number of queries.
Space: O(n) for the difference array.

## Follow‑Up Questions
1. How would the solution change if each query adds an arbitrary value `val` instead of 1?
2. Can you support removal of a previously applied query efficiently?
3. What if queries are online (arriving one by one) – how to maintain the feasibility check?

## Key Takeaway
A difference array converts range‑increment operations into two O(1) updates, enabling a linear‑time feasibility check.

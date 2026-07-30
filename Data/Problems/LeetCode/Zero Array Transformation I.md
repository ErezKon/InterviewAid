# 3355. Zero Array Transformation I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-i](https://leetcode.com/problems/zero-array-transformation-i)
**Companies:** Amazon, Bloomberg, Chubb, Google, Microsoft

---

## Problem Description
You are given an integer array `nums` and a list of range queries `queries`, where each query is a pair `[l, r]` (0‑indexed inclusive). For each query you may increment every element in the sub‑array `nums[l..r]` by 1. Determine whether it is possible to apply the queries (in any order, each at most once) so that every element of `nums` becomes non‑negative. Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
Input: `nums = [2,1,1]`, `queries = [[0,1],[1,2]]`
Output: `true`
Explanation: Apply both queries; the array becomes `[3,3,2]` which is all ≥ 0.

**Example 2:**
Input: `nums = [0,0,1]`, `queries = [[0,1]]`
Output: `false`
Explanation: After the single query the first two elements are `1`, but the third remains `1` which is fine; however the condition checks that each position can be covered enough times – here position 2 needs 0 increments but receives none, violating the requirement that `curr < nums[i]` would be false, so overall impossible.

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

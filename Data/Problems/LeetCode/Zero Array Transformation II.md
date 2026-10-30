# 3356. Zero Array Transformation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-ii](https://leetcode.com/problems/zero-array-transformation-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D array `queries` where `queries[i] = [l_i, r_i, val_i]`.

Each `queries[i]` represents the following action on `nums`:

- Decrement the value at each index in the range `[l_i, r_i]` in `nums` by **at most** `val_i`.
- The amount by which each value is decremented can be chosen **independently** for each index.

A **Zero Array** is an array with all its elements equal to 0.

Return the **minimum** possible **non-negative** value of `k`, such that after processing the first `k` queries in **sequence**, `nums` becomes a **Zero Array**. If no such `k` exists, return -1.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 5 * 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 3`
- `0 <= l_i <= r_i < nums.length`
- `1 <= val_i <= 5`

## Examples

**Example 1:**
```
Input: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]
Output: 2
Explanation: - For i = 0 (l = 0, r = 2, val = 1):
- Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
- The array will become [1, 0, 1].
- For i = 1 (l = 0, r = 2, val = 1):
- Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
- The array will become [0, 0, 0], which is a Zero Array. Therefore, the minimum value of k is 2.
```

**Example 2:**
```
Input: nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]
Output: -1
Explanation: - For i = 0 (l = 1, r = 3, val = 2):
- Decrement values at indices [1, 2, 3] by [2, 2, 1] respectively.
- The array will become [4, 1, 0, 0].
- For i = 1 (l = 0, r = 2, val = 1):
- Decrement values at indices [0, 1, 2] by [1, 1, 0] respectively.
- The array will become [3, 0, 0, 0], which is not a Zero Array.
```

## Approach
Binary search on the answer `k` (number of prefix queries) and check feasibility with a difference array.
1. Define `canZero(k)` that applies the first `k` queries to a diff array and verifies that the cumulative increments at each index meet or exceed `nums[i]`.
2. Binary search `k` in `[0, len(queries)]`. If `canZero(len(queries))` is false, return `-1`.
3. Otherwise narrow the range until the smallest feasible `k` is found.

```text
FUNCTION minZeroArray(nums, queries):
    n ← LENGTH(nums)
    FUNCTION canZero(k):
        diff ← ARRAY[n+1] OF 0
        FOR i FROM 0 TO k-1:
            [l, r, val] ← queries[i]
            diff[l] ← diff[l] + val
            diff[r+1] ← diff[r+1] - val
        curr ← 0
        FOR i FROM 0 TO n-1:
            curr ← curr + diff[i]
            IF curr < nums[i]:
                RETURN FALSE
        RETURN TRUE
    lo ← 0; hi ← LENGTH(queries)
    IF NOT canZero(hi): RETURN -1
    WHILE lo < hi:
        mid ← (lo + hi) // 2
        IF canZero(mid):
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo
```

## Walkthrough
| k | Applied Queries | diff array (partial) | Feasibility |
|---|----------------|----------------------|-------------|
| 1 | `[0,1,2]` | increments at 0‑1 = 2 | fails for index 2 |
| 2 | first two queries | sufficient for all indices | success → answer 2 |

## Complexity Analysis
Time: O((n + q) · log q) due to binary search with linear checks.
Space: O(n) for the temporary difference array.

## Follow‑Up Questions
1. How would you modify the algorithm if queries could be applied in any order, not just a prefix?
2. Can you achieve O(n + q) without binary search using a greedy sweep?
3. What if each query has a cost and you need the minimum total cost rather than count?

## Key Takeaway
Binary searching the prefix length combined with a difference‑array feasibility test yields the minimal number of queries needed.

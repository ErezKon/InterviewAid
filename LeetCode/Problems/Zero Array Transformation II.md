# 3356. Zero Array Transformation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-ii](https://leetcode.com/problems/zero-array-transformation-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Problem Description
Given an integer array `nums` and a list of queries `queries` where each query is `[l, r, val]` meaning you can add `val` to every element in `nums[l..r]`. Determine the minimum number of queries (taken in order) required to make every element of `nums` non‑negative. Return that minimum count, or `-1` if impossible even after all queries.

## Examples
**Example 1:**
Input: `nums = [3,1,2]`, `queries = [[0,1,2],[1,2,1],[0,2,1]]`
Output: `2`
Explanation: Applying the first two queries yields `[5,4,3]` which is all ≥ 0. No single query suffices.

**Example 2:**
Input: `nums = [5,0,0]`, `queries = [[1,2,1]]`
Output: `-1`
Explanation: Even after the only query the first element remains 5 > 0, but we need to ensure all positions meet their required non‑negative threshold; here the condition is that each position must receive at least its initial value in increments, which cannot be satisfied.

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

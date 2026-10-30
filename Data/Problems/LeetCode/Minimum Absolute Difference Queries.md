# 1906. Minimum Absolute Difference Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-queries](https://leetcode.com/problems/minimum-absolute-difference-queries)
**Companies:** Google

---

## Problem Description

The **minimum absolute difference** of an array `a` is defined as the **minimum value** of `|a[i] - a[j]|`, where `0 <= i < j < a.length` and `a[i] != a[j]`. If all elements of `a` are the **same**, the minimum absolute difference is `-1`.

- For example, the minimum absolute difference of the array `[5,2,3,7,2]` is `|2 - 3| = 1`. Note that it is not `0` because `a[i]` and `a[j]` must be different.

You are given an integer array `nums` and the array `queries` where `queries[i] = [li, ri]`. For each query `i`, compute the **minimum absolute difference** of the **subarray** `nums[li...ri]` containing the elements of `nums` between the **0-based** indices `li` and `ri` (**inclusive**).

Return *an **array*** `ans` *where* `ans[i]` *is the answer to the* `i-th` *query*.

A **subarray** is a contiguous sequence of elements in an array.

The value of `|x|` is defined as:
- `x` if `x >= 0`.
- `-x` if `x < 0`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 100`
- `1 <= queries.length <= 2 * 10^4`
- `0 <= li < ri < nums.length`

---

## Examples

```
Example 1:
  Input: nums = [1,3,4,8], queries = [[0,1],[1,2],[2,3],[0,3]]
  Output: [2,1,4,1]
  Explanation: The queries are processed as follows:
  - queries[0] = [0,1]: The subarray is [1,3] and the minimum absolute difference is |1-3| = 2.
  - queries[1] = [1,2]: The subarray is [3,4] and the minimum absolute difference is |3-4| = 1.
  - queries[2] = [2,3]: The subarray is [4,8] and the minimum absolute difference is |4-8| = 4.
  - queries[3] = [0,3]: The subarray is [1,3,4,8] and the minimum absolute difference is |3-4| = 1.
```

```
Example 2:
  Input: nums = [4,5,2,2,7,10], queries = [[2,3],[0,2],[0,5],[3,5]]
  Output: [-1,1,1,3]
  Explanation: The queries are processed as follows:
  - queries[0] = [2,3]: The subarray is [2,2] and the minimum absolute difference is -1 because all the
    elements are the same.
  - queries[1] = [0,2]: The subarray is [4,5,2] and the minimum absolute difference is |4-5| = 1.
  - queries[2] = [0,5]: The subarray is [4,5,2,2,7,10] and the minimum absolute difference is |4-5| = 1.
  - queries[3] = [3,5]: The subarray is [2,7,10] and the minimum absolute difference is |7-10| = 3.
```

---

## Approach

**Algorithm:** Prefix frequency counts (bounded values) + linear scan per query.

Key insight: Since `nums[i]` is at most 100, we can store for each index the cumulative count of each possible value. For a query `[l, r]`, the presence of a value `v` is determined by `prefix[r][v] - prefix[l-1][v]`. Scanning the 100 possible values yields the minimum gap between consecutive present values.

Pseudocode:
```text
FUNCTION minAbsDiffQueries(nums, queries):
    n ← LEN(nums)
    MAXV ← 100
    // prefix[i][v] = count of value v in nums[1..i]
    CREATE prefix[0..n][0..MAXV] ← 0
    FOR i ← 1 TO n DO
        FOR v ← 1 TO MAXV DO
            prefix[i][v] ← prefix[i-1][v]
        val ← nums[i]
        prefix[i][val] ← prefix[i][val] + 1
    
    results ← []
    FOR each [l, r] IN queries DO
        prev ← -1
        minDiff ← INFINITY
        FOR v ← 1 TO MAXV DO
            IF prefix[r][v] - prefix[l-1][v] > 0 THEN
                IF prev ≠ -1 THEN
                    minDiff ← MIN(minDiff, v - prev)
                prev ← v
        IF minDiff = INFINITY THEN
            results.APPEND(-1)
        ELSE
            results.APPEND(minDiff)
    RETURN results
```
---

## Walkthrough

For `nums = [1,2,4,7]` and query `[1,4]`:
1. Frequency of each value in the whole array is computed.
2. Scan values 1..100: present values are 1,2,4,7.
3. Gaps: 2‑1 = 1, 4‑2 = 2, 7‑4 = 3 → minimum = 1.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix counts + scan | O((n + q)·100) | O(n·100) |
---

## Follow‑Up Questions

1. How would you adapt the solution if the value range were large (e.g., up to 10^9)?
2. Can you answer queries in `O(log n)` using a segment tree of ordered sets?
3. What changes are needed to support updates to `nums` between queries?
---

## Key Takeaway

> Bounded values let you replace complex data structures with simple prefix frequency arrays, giving `O(100)` per query.

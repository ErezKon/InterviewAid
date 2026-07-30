# 1906. Minimum Absolute Difference Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-queries](https://leetcode.com/problems/minimum-absolute-difference-queries)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums` (1‑indexed) and a list of queries `queries`, where each query is a pair `[l, r]` representing a subarray `nums[l..r]`. For each query, return the minimum absolute difference between any two distinct elements in that subarray, or `-1` if the subarray contains fewer than two distinct values.

Constraints:
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 100`
- `1 <= queries.length <= 10^5`
- `1 <= l <= r <= nums.length`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,4,7], queries = [[1,2],[1,4]]
Output: [1,1]
Explanation:
- Query [1,2] → subarray [1,2], min diff = |2-1| = 1.
- Query [1,4] → subarray [1,2,4,7], min diff = 1 (between 1 and 2).
```

**Example 2:**
```
Input: nums = [5,5,5], queries = [[1,3]]
Output: [0]
Explanation: All values equal, so min diff = 0.
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

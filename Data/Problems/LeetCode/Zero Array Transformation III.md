# 3362. Zero Array Transformation III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-iii](https://leetcode.com/problems/zero-array-transformation-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D array `queries` where `queries[i] = [l_i, r_i]`.

Each `queries[i]` represents the following action on `nums`:

- Decrement the value at each index in the range `[l_i, r_i]` in `nums` by **at most**** **1.
- The amount by which the value is decremented can be chosen **independently** for each index.

A **Zero Array** is an array with all its elements equal to 0.

Return the **maximum **number of elements that can be removed from `queries`, such that `nums` can still be converted to a **zero array** using the *remaining* queries. If it is not possible to convert `nums` to a **zero array**, return -1.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `0 <= l_i <= r_i < nums.length`

## Examples

**Example 1:**
```
Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]
Output: 1
Explanation: After removing queries[2], nums can still be converted to a zero array.
- Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
- Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
```

**Example 2:**
```
Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]
Output: 2
Explanation: We can remove queries[2] and queries[3].
```

**Example 3:**
```
Input: nums = [1,2,3,4], queries = [[0,3]]
Output: -1
Explanation: nums cannot be converted to a zero array even after using all the queries.
```

## Approach
Greedy with a sweep line and a max‑heap:
1. Sort queries by their start index.
2. Sweep `i` from `0` to `n-1`, maintaining a max‑heap of queries that cover `i` (ordered by `val`).
3. While the current cumulative addition `curr` is less than `nums[i]`, pop the query with the largest `val` from the heap, apply it (increase `curr` by `val`), and increment the answer count.
4. If the heap becomes empty before satisfying `nums[i]`, return `-1`.

```text
FUNCTION minQueries(nums, queries):
    n ← LENGTH(nums)
    // Group queries by start index
    startMap ← MAP FROM int TO LIST
    FOR q IN queries:
        l, r, val ← q[0], q[1], q[2]
        startMap[l].ADD((r, val))
    maxHeap ← EMPTY HEAP // stores (val, r)
    ans ← 0
    currAdd ← 0
    FOR i FROM 0 TO n-1:
        // Add new queries that start at i
        FOR (r, val) IN startMap.get(i, []):
            maxHeap.PUSH((val, r))
        // Remove expired queries
        WHILE maxHeap NOT EMPTY AND maxHeap.TOP().r < i:
            maxHeap.POP()
        // Ensure enough addition for position i
        WHILE currAdd < nums[i]:
            IF maxHeap EMPTY:
                RETURN -1
            val, r ← maxHeap.POP()
            currAdd ← currAdd + val
            ans ← ans + 1
        // Decrease currAdd by values that expire after i
        // (handled implicitly when they are popped above)
    RETURN ans
```

## Walkthrough
| i | nums[i] | Active queries (val, r) | currAdd before | Action |
|---|---------|------------------------|----------------|--------|
|0|2|[(2,1),(1,2)]|0|pop (2,1) → currAdd=2, ans=1|
|1|1|[(1,2)]|2|already ≥ 1, no pop|
|2|0|[(1,2)]|2|already ≥ 0|

## Complexity Analysis
Time: O((n + q) log q) due to heap operations.
Space: O(q) for storing queries and the heap.

## Follow‑Up Questions
1. How would you adapt the algorithm if queries have costs and you need minimum total cost?
2. Can a segment tree replace the heap for faster range‑max queries?
3. What changes are needed if queries can be applied multiple times?

## Key Takeaway
A sweep line with a max‑heap selects the most powerful covering query whenever the current prefix lacks enough increments, yielding a greedy optimal solution.

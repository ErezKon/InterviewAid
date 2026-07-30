# 3362. Zero Array Transformation III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-iii](https://leetcode.com/problems/zero-array-transformation-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given an integer array `nums` and a list of queries `queries`, each query being `[l, r, val]`. Applying a query adds `val` to every element in the sub‑array `nums[l..r]`. Determine the minimum number of queries (not necessarily a prefix) required to make all elements of `nums` non‑negative. Return that minimum count, or `-1` if impossible.

## Examples
**Example 1:**
Input: `nums = [2,1,0]`, `queries = [[0,1,2],[1,2,1],[0,2,1]]`
Output: `2`
Explanation: Selecting queries 1 and 3 yields increments `[3,3,1]` making the array `[5,4,1]` ≥ 0.

**Example 2:**
Input: `nums = [5,5,5]`, `queries = [[0,0,1]]`
Output: `-1`
Explanation: No combination can raise the second and third positions.

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

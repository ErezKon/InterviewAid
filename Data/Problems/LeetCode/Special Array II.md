# 3152. Special Array II

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/special-array-ii
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, National Payments Coorperation India
---

## Problem Description
Given an integer array `nums` and multiple queries `[from, to]`, determine for each query whether the subarray `nums[from..to]` has **no adjacent elements with the same parity** (i.e., the parity alternates throughout the range). Return a list of booleans corresponding to each query.

## Examples
**Example 1**
```
Input: nums = [1,2,3,4], queries = [[0,3],[1,2]]
Output: [true, true]
Explanation: The whole array and the subarray [2,3] both alternate parity.
```

**Example 2**
```
Input: nums = [2,4,1,3], queries = [[0,1],[2,3]]
Output: [false, true]
Explanation: Subarray [2,4] has same parity (even‑even) → false; [1,3] alternates → true.
```

## Approach
Pre‑compute a prefix array of parity‑violation counts. For each index `i` (≥1), `violation[i] = 1` if `nums[i]` and `nums[i‑1]` share the same parity, else `0`. The prefix sum lets us answer any query in O(1) by checking if `prefix[to] - prefix[from]` equals zero.

```text
FUNCTION preprocess(nums):
    SET n ← LENGTH(nums)
    INITIALIZE prefix[0..n-1] ← 0
    FOR i ← 1 TO n-1:
        SET violation ← IF (nums[i] MOD 2) == (nums[i-1] MOD 2) THEN 1 ELSE 0
        SET prefix[i] ← prefix[i-1] + violation
    RETURN prefix

FUNCTION answerQueries(nums, queries):
    SET prefix ← preprocess(nums)
    INITIALIZE result ← []
    FOR each [from, to] IN queries:
        IF prefix[to] - prefix[from] == 0:
            APPEND true TO result
        ELSE:
            APPEND false TO result
    RETURN result
```

## Walkthrough
| i | nums[i] | nums[i-1] parity | violation | prefix[i] |
|---|---------|------------------|-----------|-----------|
| 1 | 2 (even) | 1 (odd) | 0 | 0 |
| 2 | 3 (odd) | 2 (even) | 0 | 0 |
| 3 | 4 (even) | 3 (odd) | 0 | 0 |
For query `[0,3]`, `prefix[3] - prefix[0] = 0` → true.

## Complexity Analysis
- Time: `O(n + q)` where `n` is array length and `q` number of queries.
- Space: `O(n)` for the prefix array.

## Follow‑Up Questions
1. How would you handle updates to `nums` (dynamic array) while still answering queries efficiently?
2. Can you extend the method to check other patterns, such as strictly increasing sequences?
3. What if the parity condition needed to hold for every *k*‑th element instead of adjacent?

## Key Takeaway
A prefix sum of parity violations enables constant‑time answers to range‑alternation queries after a linear‑time preprocessing step.

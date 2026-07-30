# 932. Beautiful Array

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/beautiful-array
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given an integer `n`, construct an array `A` of length `n` containing each integer from `1` to `n` exactly once such that there is no index `i < k < j` with `A[k] * 2 = A[i] + A[j]`. Return any such beautiful array.

## Examples
**Example 1**
```
Input: n = 4
Output: [2,1,4,3]
Explanation: No three indices satisfy the forbidden condition.
```
**Example 2**
```
Input: n = 5
Output: [1,5,3,2,4]
```

## Approach
The key observation is that if an array `A` is beautiful, then the transformed arrays `2*A` (each element multiplied by 2) and `2*A-1` (each element multiplied by 2 then minus 1) are also beautiful. Starting from `[1]`, repeatedly apply these two transformations and keep values ≤ `n` to build the final array.

```text
FUNCTION beautifulArray(n):
    result ← [1]
    WHILE LENGTH(result) < n:
        odds ← []
        FOR x IN result:
            val ← 2 * x - 1
            IF val ≤ n:
                APPEND val TO odds
        evens ← []
        FOR x IN result:
            val ← 2 * x
            IF val ≤ n:
                APPEND val TO evens
        result ← odds + evens
    RETURN result
```

## Walkthrough
For `n = 5`:
1. Start `result = [1]`.
2. Generate odds `[1]` (2*1-1) and evens `[2]` → `result = [1,2]`.
3. Next iteration: odds from `[1,2]` → `[1,3]`; evens → `[2,4]` → `result = [1,3,2,4]`.
4. Next iteration: odds → `[1,3,5]`; evens → `[2,4]` (5 already reached) → `result = [1,3,5,2,4]`.
All numbers 1‑5 appear and the condition holds.

## Complexity Analysis
*Time*: O(n log n) – each iteration roughly doubles the size of `result`.
*Space*: O(n) – storing the resulting array.

## Follow‑Up Questions
1. Can you prove that the construction always yields a beautiful array for any `n`?
2. How would you adapt the algorithm to generate the lexicographically smallest beautiful array?
3. What changes are needed if the forbidden condition is `A[k] = (A[i] + A[j]) / 3`?

## Key Takeaway
By repeatedly applying the transformations `2*x` and `2*x-1` to a base beautiful array, we can construct a valid permutation for any size `n`.

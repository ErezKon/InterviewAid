# 667. Beautiful Arrangement II

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, Google
---

## Problem Description
Given two integers `n` and `k`, construct an array `arr` of length `n` that contains each integer from `1` to `n` exactly once and has exactly `k` distinct absolute differences between consecutive elements. Return any such array.

## Examples
**Example 1**
```
Input: n = 3, k = 1
Output: [1,2,3]
Explanation: The absolute differences are [1,1]; only one distinct value.
```
**Example 2**
```
Input: n = 3, k = 2
Output: [1,3,2]
Explanation: Differences are [2,1]; two distinct values.
```

## Approach
Start with the increasing sequence `1..(n-k)`. For the remaining `k+1` numbers, alternate picking the smallest and largest remaining values to create the required distinct differences.

```text
FUNCTION constructArray(n, k):
    result ← []
    // first part: consecutive numbers give difference 1
    FOR i ← 1 TO n - k:
        APPEND i TO result
    lo ← n - k + 1
    hi ← n
    toggle ← true
    WHILE lo ≤ hi:
        IF toggle:
            APPEND lo TO result
            lo ← lo + 1
        ELSE:
            APPEND hi TO result
            hi ← hi - 1
        toggle ← NOT toggle
    RETURN result
```

## Walkthrough
For `n=5, k=2`:
- Append `1,2,3` (n-k = 3).
- Remaining numbers: 4 and 5.
- toggle true → append 4, toggle false → append 5.
Result `[1,2,3,4,5]` has differences `[1,1,1,1]` (k=1). For `k=2`, the alternating step creates distinct differences `2` and `1`.

## Complexity Analysis
*Time*: O(n) – single pass constructing the array.
*Space*: O(n) – output array.

## Follow‑Up Questions
1. How would you modify the algorithm to produce the lexicographically smallest valid array?
2. Can you generate an array with exactly `k` distinct differences without using the alternating high‑low trick?
3. What changes are needed if the array must be a permutation of a custom set of numbers?

## Key Takeaway
By fixing a prefix of consecutive numbers and then alternating the high and low ends of the remaining range, we can guarantee exactly `k` distinct consecutive differences.

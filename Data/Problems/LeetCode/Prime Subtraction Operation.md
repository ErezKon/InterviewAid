# 2601. Prime Subtraction Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prime-subtraction-operation](https://leetcode.com/problems/prime-subtraction-operation)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, you may perform the following operation any number of times: choose an index `i` (0-indexed) and subtract a prime number `p` (where `p < nums[i]`) from `nums[i]`. The operation is valid only if after subtraction the element at `i` remains strictly greater than the previous element (`nums[i] > nums[i-1]` for `i > 0`). Return `true` if it is possible to make the entire array strictly increasing after any sequence of such operations, otherwise return `false`.

## Examples
**Example 1:**
```
Input: nums = [5,10,15]
Output: true
Explanation: Subtract 2 from nums[0] → [3,10,15]; subtract 3 from nums[1] → [3,7,15]; array is now strictly increasing.
```

**Example 2:**
```
Input: nums = [4,3,2]
Output: false
Explanation: No sequence of prime subtractions can make the array strictly increasing.
```

## Approach
The problem can be solved greedily from left to right. For each element, we try to subtract the largest possible prime that keeps the element greater than its predecessor. If no such prime exists, the array cannot be fixed.

### Pseudocode
```text
FUNCTION PrimeSubOperation(nums):
    primes ← SIEVE(1000)  // all primes up to 1000
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF i == 0:
            prev ← -∞
        ELSE:
            prev ← nums[i-1]
        // Find the largest prime p < nums[i] such that nums[i] - p > prev
        SET pFound ← false
        FOR p IN REVERSED(primes):
            IF p < nums[i] AND (nums[i] - p) > prev:
                SET nums[i] ← nums[i] - p
                SET pFound ← true
                BREAK
        IF NOT pFound:
            // No valid subtraction, keep original value
            IF nums[i] <= prev:
                RETURN false
    RETURN true
```

## Walkthrough
Consider `nums = [5,10,15]`:
| i | original | prev | chosen prime | new value |
|---|----------|------|--------------|----------|
|0|5| -∞ | 2 | 3 |
|1|10| 3 | 3 | 7 |
|2|15| 7 | 0 (no subtraction needed) | 15 |
The array `[3,7,15]` is strictly increasing, so the function returns `true`.

## Complexity Analysis
- **Time:** O(n * P) where `P` is the number of primes up to 1000 (≈168). In practice this is linear in `n` because the prime list is constant.
- **Space:** O(P) for storing the prime list.

## Follow-Up Questions
1. How would the solution change if you could add a prime instead of subtracting?
2. What if the allowed primes were limited to a given list rather than all primes up to a bound?
3. Can the algorithm be extended to handle very large numbers where generating all primes up to the maximum value is infeasible?

## Key Takeaway
A greedy left‑to‑right scan, always subtracting the largest feasible prime, determines whether the array can be made strictly increasing.

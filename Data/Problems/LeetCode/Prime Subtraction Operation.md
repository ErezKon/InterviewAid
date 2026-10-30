# 2601. Prime Subtraction Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prime-subtraction-operation](https://leetcode.com/problems/prime-subtraction-operation)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `nums` of length `n`.

You can perform the following operation as many times as you want:

- Pick an index `i` that you haven't picked before, and pick a prime `p` **strictly less than** `nums[i]`, then subtract `p` from `nums[i]`.

Return *true if you can make `nums` a strictly increasing array using the above operation and false otherwise.*

A **strictly increasing array** is an array whose each element is strictly greater than its preceding element.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `nums.length == n`

## Examples

**Example 1:**
```
Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
```

**Example 2:**
```
Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
```

**Example 3:**
```
Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
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

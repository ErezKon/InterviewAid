# 2654. Minimum Number of Operations to Make All Array Elements Equal to 1

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1](https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach below counts prime factors (invented). Officially the operation replaces an adjacent element with their gcd. If `c > 0` ones exist, the answer is `n − c`. Otherwise find the shortest subarray with gcd 1 (length `L`, O(n²)); the answer is `(L − 1) + (n − 1)`, or -1 if the overall gcd > 1.*

You are given a **0-indexed** array `nums` consisting of **positive** integers. You can do the following operation on the array **any** number of times:

- Select an index `i` such that `0 <= i < n - 1` and replace either of `nums[i]` or `nums[i+1]` with their gcd value.

Return *the **minimum** number of operations to make all elements of *`nums`* equal to *`1`. If it is impossible, return `-1`.

The gcd of two integers is the greatest common divisor of the two integers.

**Constraints:**
- `2 <= nums.length <= 50`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [2,6,3,4]
Output: 4
Explanation: We can do the following operations:
- Choose index i = 2 and replace nums[2] with gcd(3,4) = 1. Now we have nums = [2,6,1,4].
- Choose index i = 1 and replace nums[1] with gcd(6,1) = 1. Now we have nums = [2,1,1,4].
- Choose index i = 0 and replace nums[0] with gcd(2,1) = 1. Now we have nums = [1,1,1,4].
- Choose index i = 2 and replace nums[3] with gcd(1,4) = 1. Now we have nums = [1,1,1,1].
```

**Example 2:**
```
Input: nums = [2,10,6,14]
Output: -1
Explanation: It can be shown that it is impossible to make all the elements equal to 1.
```

---

## Approach

**Greedy – Count Prime Factors (O(n log max(nums)))**

Every integer can be reduced to `1` by repeatedly dividing by a prime factor. The optimal way is to always divide by a prime factor, because any composite divisor can be broken down into prime steps without increasing the operation count. Therefore, the minimum number of operations for a single element equals the total number of prime factors (with multiplicity). Summing this count over all elements yields the global optimum.

```text
FUNCTION minOperations(nums):
    ops ← 0
    FOR x IN nums DO
        WHILE x > 1 DO
            p ← SMALLEST_PRIME_FACTOR(x)
            ops ← ops + 1
            x ← x / p
    RETURN ops
```

`SMALLEST_PRIME_FACTOR` can be pre‑computed for all numbers up to `max(nums)` using a sieve in `O(max(nums) log log max(nums))`.

---

## Walkthrough

For `nums = [2,3,4]`:
| Element | Prime factors (with multiplicity) | Operations |
|---------|-----------------------------------|------------|
| 2       | 2                                 | 1 |
| 3       | 3                                 | 1 |
| 4       | 2,2                               | 2 |
Total operations = 1 + 1 + 2 = 4.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sieve + scan | **O(max(nums) log log max(nums) + n log max(nums))** | **O(max(nums))** |

---

## Follow-Up Questions

1. How would the solution change if you could replace an element with any divisor (including 1) in a single step?
2. Can you output the exact sequence of divisions for each element?
3. What is the complexity if the array size is extremely large and only streaming access is allowed?

---

## Key Takeaway

The optimal strategy is to repeatedly divide each number by its smallest prime factor; the total number of prime factors across the array equals the minimum number of operations.

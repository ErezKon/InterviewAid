# 2654. Minimum Number of Operations to Make All Array Elements Equal to 1

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1](https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1)
**Companies:** Amazon, Google

---

## Problem Description

You are given an integer array `nums` of length `n`. In one operation you may choose any element `x > 1` and replace it with any of its proper divisors (a divisor `d` such that `1 < d < x`). The operation can be applied repeatedly. Return the minimum number of operations required to make every element of `nums` equal to `1`. It is guaranteed that the answer exists.

---

## Examples

**Example 1:**
```
Input: nums = [2,3,4]
Output: 4
Explanation:
2 → 1 (1 operation)
3 → 1 (1 operation)
4 → 2 → 1 (2 operations)
Total = 4.
```

**Example 2:**
```
Input: nums = [5,6]
Output: 5
Explanation:
5 → 1 (1 operation)
6 → 3 → 1 (2 operations)
Total = 3 operations for 6 + 1 for 5 = 4? Actually 6 → 2 → 1 (2 ops) gives total 3. The minimal count is 3.
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

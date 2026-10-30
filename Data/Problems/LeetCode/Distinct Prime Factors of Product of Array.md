# 2521. Distinct Prime Factors of Product of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/distinct-prime-factors-of-product-of-array](https://leetcode.com/problems/distinct-prime-factors-of-product-of-array)
**Companies:** Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Factorize Each Number](#approach-factorize-each-number)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of positive integers `nums`, return *the number of **distinct prime factors** in the product of the elements of* `nums`.

**Note** that:

- A number greater than `1` is called **prime** if it is divisible by only `1` and itself.
- An integer `val1` is a factor of another integer `val2` if `val2 / val1` is an integer.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `2 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
```
Input: nums = [2,4,3,7,10,6]
Output: 4
Explanation: The product of all the elements in nums is: 2 * 4 * 3 * 7 * 10 * 6 = 10080 = 2^5 * 3^2 * 5 * 7.
There are 4 distinct prime factors so we return 4.
```

**Example 2:**
```
Input: nums = [2,4,8,16]
Output: 1
Explanation: The product of all the elements in nums is: 2 * 4 * 8 * 16 = 1024 = 2^10.
There is 1 distinct prime factor so we return 1.
```

---

## Key Insight

> The prime factors of a product equal the **union** of prime factors of each element. Factorize each number individually and collect primes in a set.

---

## Approach: Factorize Each Number ✅

```
FUNCTION distinctPrimeFactors(nums):
    primes = set()
    FOR num IN nums:
        FOR p ← 2 TO sqrt(num):
            WHILE num % p == 0: primes.ADD(p); num //= p
        IF num > 1: primes.ADD(num)
    RETURN len(primes)
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n × √M) | n numbers, M = max value (1000), √1000 ≈ 31 |
| **Space** | O(P) | P = number of distinct primes (at most ~168 primes ≤ 1000) |

---

## Key Takeaway

> **Distinct prime factors of a product = union of prime factors of each element. Factorize individually and collect in a set — no need to compute the actual product.**

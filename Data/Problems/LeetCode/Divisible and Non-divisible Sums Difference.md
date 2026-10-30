# 2894. Divisible and Non-divisible Sums Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divisible-and-non-divisible-sums-difference](https://leetcode.com/problems/divisible-and-non-divisible-sums-difference)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Math Formula](#approach-math-formula--o1-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given positive integers `n` and `m`.

Define two integers as follows:

- `num1`: The sum of all integers in the range `[1, n]` (both **inclusive**) that are **not divisible** by `m`.
- `num2`: The sum of all integers in the range `[1, n]` (both **inclusive**) that are **divisible** by `m`.

Return *the integer* `num1 - num2`.

**Constraints:**
- `1 <= n, m <= 1000`

---

## Examples

**Example 1:**
```
Input: n = 10, m = 3
Output: 19
Explanation: In the given example:
- Integers in the range [1, 10] that are not divisible by 3 are [1,2,4,5,7,8,10], num1 is the sum of those integers = 37.
- Integers in the range [1, 10] that are divisible by 3 are [3,6,9], num2 is the sum of those integers = 18.
We return 37 - 18 = 19 as the answer.
```

**Example 2:**
```
Input: n = 5, m = 6
Output: 15
Explanation: In the given example:
- Integers in the range [1, 5] that are not divisible by 6 are [1,2,3,4,5], num1 is the sum of those integers = 15.
- Integers in the range [1, 5] that are divisible by 6 are [], num2 is the sum of those integers = 0.
We return 15 - 0 = 15 as the answer.
```

**Example 3:**
```
Input: n = 5, m = 1
Output: -15
Explanation: In the given example:
- Integers in the range [1, 5] that are not divisible by 1 are [], num1 is the sum of those integers = 0.
- Integers in the range [1, 5] that are divisible by 1 are [1,2,3,4,5], num2 is the sum of those integers = 15.
We return 0 - 15 = -15 as the answer.
```

---

## Key Insight

> `num1 - num2 = total - 2 × num2`. The total sum is `n(n+1)/2`. The sum of multiples of `m` up to `n` is `m × k(k+1)/2` where `k = ⌊n/m⌋`. No loop needed — pure O(1) math.

---

## Approach: Math Formula — O(1) ✅

```
FUNCTION differenceOfSums(n, m):
    total = n * (n + 1) / 2
    k = n // m
    divSum = m * k * (k + 1) / 2
    RETURN total - 2 * divSum
```

**Why `total - 2 × divSum`?**
- `num1 = total - divSum` (non-divisible = total minus divisible)
- `num1 - num2 = (total - divSum) - divSum = total - 2 × divSum`

---

## Walkthrough

```
n = 10, m = 3

total = 10 × 11 / 2 = 55
k = 10 // 3 = 3  (multiples: 3, 6, 9)
divSum = 3 × 3 × 4 / 2 = 18

answer = 55 - 2 × 18 = 55 - 36 = 19 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Key Takeaway

> **Sum of arithmetic sequences is a closed-form formula. Avoid iterating when you can compute `total - 2 × divisibleSum` directly in O(1).**

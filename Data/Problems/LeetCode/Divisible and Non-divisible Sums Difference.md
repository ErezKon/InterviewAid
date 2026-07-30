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

Given positive integers `n` and `m`, find the difference between the sum of integers in `[1, n]` that are **not divisible** by `m` and the sum of those that **are divisible** by `m`.

Return `num1 - num2` where `num1` = sum of non-divisible numbers and `num2` = sum of divisible numbers.

**Constraints:**
- `1 <= n, m <= 1000`

---

## Examples

```
Input: n = 10, m = 3
Output: 19
Explanation:
  Not divisible by 3: 1+2+4+5+7+8+10 = 37
  Divisible by 3: 3+6+9 = 18
  37 - 18 = 19

Input: n = 5, m = 6
Output: 15
Explanation: No number in [1,5] is divisible by 6. Sum = 15, answer = 15 - 0 = 15.
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

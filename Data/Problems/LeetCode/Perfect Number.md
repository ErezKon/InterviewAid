# 507. Perfect Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/perfect-number](https://leetcode.com/problems/perfect-number)
**Companies:** Accenture, Amazon, Bloomberg, Fallible, Google, Grammarly, Meta, Microsoft

---

## Problem Description
A **perfect number** is a **positive integer** that is equal to the sum of its **positive divisors**, excluding the number itself. A **divisor** of an integer `x` is an integer that can divide `x` evenly.

Given an integer `n`, return `true` *if* `n` *is a perfect number, otherwise return* `false`.

**Constraints:**

- `1 <= num <= 10^8`

## Examples

```
Example 1:
  Input: num = 28
  Output: true
  Explanation: 28 = 1 + 2 + 4 + 7 + 14
  1, 2, 4, 7, and 14 are all divisors of 28.
```

```
Example 2:
  Input: num = 7
  Output: false
```

## Approach
Iterate up to the square root of `num` to find divisor pairs.

1. If `num <= 1` return false.
2. Initialise `sum ← 1` (1 is a divisor of any `num > 1`).
3. For each `i` from 2 to `⌊√num⌋`:
   - IF `num % i == 0`:
     * ADD `i` to `sum`.
     * IF `i != num / i` (i.e., not the square root), ADD `num / i` as the paired divisor.
4. After the loop, `sum == num` indicates a perfect number.

## Walkthrough
For `num = 28`:
| i | divisor? | sum after adding |
|---|----------|-----------------|
|2| yes (28%2=0) | sum = 1+2+14 = 17 |
|3| no | 17 |
|4| yes | sum = 17+4+7 = 28 |
|5| no | 28 |
Loop ends, `sum == 28` → true.

## Complexity Analysis
- Time: O(√n) – only iterate up to the square root.
- Space: O(1) – constant extra variables.

## Follow-Up Questions
1. How would you test many numbers efficiently (e.g., checking all numbers up to 10⁶)?
2. Can you generate perfect numbers using Euclid-Euler theorem instead of trial division?
3. What modifications are needed for a streaming input of numbers?

## Key Takeaway
Checking divisor pairs up to √n lets you compute the sum of proper divisors in O(√n) time, enabling a quick perfect-number test.

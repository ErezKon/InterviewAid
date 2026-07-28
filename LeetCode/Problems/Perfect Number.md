# 507. Perfect Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/perfect-number](https://leetcode.com/problems/perfect-number)
**Companies:** Accenture, Amazon, Bloomberg, Fallible, Google, Grammarly, Meta, Microsoft

---

## Problem Description
Given a positive integer `num`, determine whether it is a perfect number. A perfect number equals the sum of its proper divisors (positive divisors excluding the number itself).

Constraints: `1 ≤ num ≤ 10⁹`.

## Examples
| num | Output | Explanation |
|-----|--------|-------------|
| 28  | true   | Divisors: 1,2,4,7,14 → sum = 28.
| 6   | true   | Divisors: 1,2,3 → sum = 6.
| 12  | false  | Divisors sum to 16, not 12.

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

## Follow‑Up Questions
1. How would you test many numbers efficiently (e.g., checking all numbers up to 10⁶)?
2. Can you generate perfect numbers using Euclid‑Euler theorem instead of trial division?
3. What modifications are needed for a streaming input of numbers?

## Key Takeaway
Checking divisor pairs up to √n lets you compute the sum of proper divisors in O(√n) time, enabling a quick perfect‑number test.

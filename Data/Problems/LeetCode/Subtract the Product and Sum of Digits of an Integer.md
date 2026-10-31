# 1281. Subtract the Product and Sum of Digits of an Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer](https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer)
**Companies:** Amazon, Bloomberg, Google, Meta, Quora

---

## Problem Description

Given an integer number `n`, return the difference between the product of its digits and the sum of its digits.

**Constraints:**
- `1 <= n <= 10^5`

## Examples

**Example 1:**
```
Input: n = 234
Output: 15
Explanation:
Product of digits = 2 * 3 * 4 = 24
Sum of digits = 2 + 3 + 4 = 9
Result = 24 - 9 = 15
```

**Example 2:**
```
Input: n = 4421
Output: 21
Explanation:
Product of digits = 4 * 4 * 2 * 1 = 32
Sum of digits = 4 + 4 + 2 + 1 = 11
Result = 32 - 11 = 21
```

## Approach
Extract each digit by repeatedly taking the remainder modulo 10, accumulate product and sum, then return their difference.

```text
FUNCTION subtractProductAndSum(n):
    product ← 1
    sum ← 0
    WHILE n > 0:
        digit ← n MOD 10
        product ← product * digit
        sum ← sum + digit
        n ← n DIV 10
    RETURN product - sum
```

## Walkthrough
For `n = 4421`:
1. digit 1 → product=1, sum=1
2. digit 2 → product=2, sum=3
3. digit 4 → product=8, sum=7
4. digit 4 → product=32, sum=11
Return `32-11 = 21`.

## Complexity Analysis
*Time*: O(k) where k is the number of digits in `n`.
*Space*: O(1) – only a few scalar variables.

## Follow-Up Questions
* How would you handle very large integers that do not fit in standard numeric types?
* Can you compute the result without using multiplication (e.g., using addition only)?
* What if the digits are provided as a string instead of an integer?

## Key Takeaway
Iterating over each digit once and maintaining running product and sum yields a simple O(number-of-digits) solution.

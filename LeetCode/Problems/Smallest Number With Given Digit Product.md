# 2847. Smallest Number With Given Digit Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-number-with-given-digit-product](https://leetcode.com/problems/smallest-number-with-given-digit-product)
**Companies:** Microsoft

---

## Problem Description

Given a positive integer `n`, find the smallest positive integer `x` such that the product of the digits of `x` equals `n`. If no such integer exists, return `"-1"`.

## Examples

- **Input:** `n = 48`
  - **Output:** `"68"`. The digits 6 and 8 multiply to 48, and 68 is the smallest such number.
- **Input:** `n = 13`
  - **Output:** `"-1"`. 13 is prime, so no combination of single digits (2-9) can multiply to it.

## Approach: Greedy Factorization [Time: O(log n), Space: O(log n)]

The key idea is to build the number from its least significant digits to its most significant digits. To make the resulting number as small as possible, we want to use the largest possible digits (9, 8, 7, ...) as factors of `n`. By using larger digits, we use fewer digits overall, which results in a smaller number.

We greedily divide `n` by digits from 9 down to 2. The digits we find become the digits of our result, which we build in reverse order.

```
FUNCTION smallestNumberWithDigitProduct(n):
    IF n == 1:
        RETURN "1"

    result_digits = []
    
    // Greedily find factors from 9 down to 2
    FOR d FROM 9 DOWN TO 2:
        WHILE n % d == 0:
            result_digits.APPEND(d)
            n = n / d

    // If n is not 1, it has a prime factor > 9
    IF n > 1:
        RETURN "-1"

    // Sort digits to form the smallest number and join
    result_digits.SORT()
    RETURN JOIN(result_digits)
```

## Walkthrough

Let's trace `n = 48`:

1.  Start with `n = 48`, `result_digits = []`.
2.  Try `d = 9`. `48 % 9 != 0`.
3.  Try `d = 8`. `48 % 8 == 0`. `result_digits = [8]`, `n = 6`.
4.  Try `d = 7`. `6 % 7 != 0`.
5.  Try `d = 6`. `6 % 6 == 0`. `result_digits = [8, 6]`, `n = 1`.
6.  `n` is now 1, so we stop.
7.  Sort `result_digits`: `[6, 8]`.
8.  Join to form the string `"68"`.

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(log n) | O(log n) |

The number of digits in the result is at most `log_2(n)`. The outer loop is constant (9 to 2), and the inner while loop runs a total of `log(n)` times across all iterations.

## Follow-up

- What if you were asked for the *largest* number with this property? (Hint: The sorting order would change).

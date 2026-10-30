# 3348. Smallest Divisible Digit Product II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-divisible-digit-product-ii](https://leetcode.com/problems/smallest-divisible-digit-product-ii)
**Companies:** Accenture, Google, Microsoft

---

## Problem Description

You are given a string `num` which represents a **positive** integer, and an integer `t`.

A number is called **zero-free** if *none* of its digits are 0.

Return a string representing the **smallest** **zero-free** number greater than or equal to `num` such that the **product of its digits** is divisible by `t`. If no such number exists, return `"-1"`.

### Examples

```
Example 1:
  Input: num = "1234", t = 256
  Output: "1488"
  Explanation: The smallest zero-free number that is greater than 1234 and has the product of its digits divisible by 256 is 1488, with the product of its digits equal to 256.
```

```
Example 2:
  Input: num = "12355", t = 50
  Output: "12355"
  Explanation: 12355 is already zero-free and has the product of its digits divisible by 50, with the product of its digits equal to 150.
```

```
Example 3:
  Input: num = "11111", t = 26
  Output: "-1"
  Explanation: No number greater than 11111 has the product of its digits divisible by 26.
```

### Constraints

- `2 <= num.length <= 2 × 10⁵`
- `num` consists only of digits in the range `['0', '9']`.
- `num` does not contain leading zeros.
- `1 <= t <= 10¹⁴`

---

## Approach: Greedy with Prime Factor Decomposition ✅

Decompose `t` into prime factors of only `{2, 3, 5, 7}`. If `t` has any other prime factor, return `"-1"` (no digit 1-9 can contribute it).

Then greedily adjust digits from right to left to satisfy the remaining factor requirements, choosing the smallest valid number.

```
FUNCTION smallestNumber(num, t):
    // Decompose t into factors of 2, 3, 5, 7
    factors = {2: 0, 3: 0, 5: 0, 7: 0}
    FOR p IN [2, 3, 5, 7]:
        WHILE t % p == 0:
            factors[p] += 1
            t /= p
    IF t > 1: RETURN "-1"    // has prime factor > 7

    // Greedy: try to find smallest number >= num
    // by adjusting digits to cover required prime factors
    // (Implementation involves suffix processing and backtracking)
```

| Time | Space |
|------|-------|
| O(n · log t) | O(n) |

---

## Follow-up

- See **Smallest Divisible Digit Product I** for the simpler brute-force version with smaller constraints.

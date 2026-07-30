# 3348. Smallest Divisible Digit Product II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-divisible-digit-product-ii](https://leetcode.com/problems/smallest-divisible-digit-product-ii)
**Companies:** Accenture, Google, Microsoft

---

## Problem Description

Given a string `num` representing a positive integer and an integer `t`, return the smallest number greater than or equal to `num` such that the **product of its digits** is divisible by `t`. If no such number exists, return `"-1"`.

### Examples

**Example 1:**
- **Input:** `num = "1234"`, `t = 256`
- **Output:** `"1488"`
- **Explanation:** Product of digits of 1488 = 1×4×8×8 = 256, which is divisible by 256.

**Example 2:**
- **Input:** `num = "12355"`, `t = 50`
- **Output:** `"12355"`

### Constraints

- `1 <= num.length <= 2 × 10⁵`
- `num` consists of digits only and has no leading zeros.
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

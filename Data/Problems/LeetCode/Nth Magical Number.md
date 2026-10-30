# 878. Nth Magical Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/nth-magical-number](https://leetcode.com/problems/nth-magical-number)
**Companies:** Amazon, Google, Meta

---

## Problem Description
A positive integer is *magical* if it is divisible by either `a` or `b`.

Given the three integers `n`, `a`, and `b`, return the `n^th` magical number. Since the answer may be very large, **return it modulo** `10^9 + 7`.

**Constraints:**

- `1 <= n <= 10^9`
- `2 <= a, b <= 4 * 10^4`

## Examples

```
Example 1:
  Input: n = 1, a = 2, b = 3
  Output: 2
```

```
Example 2:
  Input: n = 4, a = 2, b = 3
  Output: 6
```

## Approach
**Algorithm:** Binary search using inclusion‑exclusion.
1. Compute `lcm = a * b / GCD(a, b)`.
2. Search the smallest `x` such that `count(x) = x//a + x//b - x//lcm >= n`.
3. Return `x % MOD`.

### Pseudocode
```text
FUNCTION nthMagicalNumber(n, a, b):
    SET MOD ← 1_000_000_007
    SET lcm ← a * b / GCD(a, b)
    SET lo ← 1
    SET hi ← n * MIN(a, b) // upper bound
    WHILE lo < hi:
        SET mid ← (lo + hi) // 2
        SET count ← mid // a + mid // b - mid // lcm
        IF count < n:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid
    RETURN lo MOD MOD
```

## Walkthrough
For `n=5, a=2, b=4`:
- `lcm = 4`, `hi = 5 * 2 = 10`.
- Mid steps lead to `lo=10`, count = `10//2 + 10//4 - 10//4 = 5 + 2 - 2 = 5` → condition met, answer `10`.

## Complexity Analysis
- Time: O(log(n * min(a,b))) – binary search.
- Space: O(1).

## Follow‑Up Questions
1. How would the solution change if you needed the `n`‑th number divisible by **both** `a` and `b`?
2. Can you extend the method to handle more than two divisors?
3. What if the modulus changes to a non‑prime number?

## Key Takeaway
Binary search combined with inclusion‑exclusion efficiently finds the `n`‑th number divisible by either of two values.
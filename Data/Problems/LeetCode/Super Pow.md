# 372. Super Pow

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/super-pow](https://leetcode.com/problems/super-pow)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Your task is to calculate `a^b` mod `1337` where `a` is a positive integer and `b` is an extremely large positive integer given in the form of an array.

**Constraints:**
- `1 <= a <= 2^31 - 1`
- `1 <= b.length <= 2000`
- `0 <= b[i] <= 9`
- `b` does not contain leading zeros.

## Examples

**Example 1:**
```
Input: a = 2, b = [3]
Output: 8
```

**Example 2:**
```
Input: a = 2, b = [1,0]
Output: 1024
```

**Example 3:**
```
Input: a = 1, b = [4,3,3,8,5,2]
Output: 1
```

## Approach
Use the property `a^(x*10 + d) = (a^x)^10 * a^d`. Process the digits of `b` from left to right, repeatedly raising the current result to the 10th power and multiplying by `a` raised to the current digit, all modulo 1337.

```text
FUNCTION superPow(a, b):
    SET MOD ← 1337
    SET result ← 1
    SET aMod ← a MOD MOD
    FOR digit IN b:
        // result = (result^10) * (aMod^digit)  (mod MOD)
        SET result ← powMod(result, 10, MOD) * powMod(aMod, digit, MOD) MOD MOD
    RETURN result

FUNCTION powMod(base, exp, mod):
    SET res ← 1
    SET base ← base MOD mod
    WHILE exp > 0:
        IF exp AND 1 = 1:
            SET res ← (res * base) MOD mod
        SET base ← (base * base) MOD mod
        SET exp ← exp >> 1
    RETURN res
```

## Walkthrough
For `a = 2, b = [1,0]`:
1. Initialize `result = 1`, `aMod = 2`.
2. First digit `1`:
   - `result = (1^10) * (2^1) mod 1337 = 2`.
3. Second digit `0`:
   - `result = (2^10) * (2^0) mod 1337 = 1024`.
Final result = 1024.

## Complexity Analysis
- **Time:** O(L * log 10) where L is the number of digits in `b` (each digit triggers a fast exponentiation of exponent 10 and digit ≤9).
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would the solution change if the modulus were a large prime instead of 1337?
2. Can you compute `a^b` without using modular exponentiation by leveraging Euler's theorem?
3. What if `b` were given as a string instead of an array of digits?

## Key Takeaway
Breaking the exponent into base‑10 digits lets you iteratively apply modular exponentiation, achieving logarithmic work per digit.

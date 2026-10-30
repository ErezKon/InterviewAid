# 1969. Minimum Non-Zero Product of the Array Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements](https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements)
**Companies:** Amazon, Paypal

---

## Problem Description

> *Note: the Approach below solves an invented modular problem. Officially the array is `1..2^p − 1` with bit swaps. Optimal is pairing values into `1` and `2^p − 2`, giving `(2^p − 1) · (2^p − 2)^(2^(p−1) − 1) mod (10^9 + 7)` (fast exponentiation).*

You are given a positive integer `p`. Consider an array `nums` (**1-indexed**) that consists of the integers in the **inclusive** range `[1, 2^p - 1]` in their binary representations. You are allowed to do the following operation **any** number of times:

- Choose two elements `x` and `y` from `nums`.
- Choose a bit in `x` and swap it with its corresponding bit in `y`. Corresponding bit refers to the bit that is in the **same position** in the other integer.

For example, if `x = 1101` and `y = 0011`, after swapping the `2^nd` bit from the right, we have `x = 1111` and `y = 0001`.

Find the **minimum non-zero** product of `nums` after performing the above operation **any** number of times. Return *this product** **modulo** *`10^9 + 7`.

**Note:** The answer should be the minimum product **before** the modulo operation is done.

**Constraints:**
- `1 <= p <= 60`

## Examples

**Example 1:**
```
Input: p = 1
Output: 1
Explanation: nums = [1].
There is only one element, so the product equals that element.
```

**Example 2:**
```
Input: p = 2
Output: 6
Explanation: nums = [01, 10, 11].
Any swap would either make the product 0 or stay the same.
Thus, the array product of 1 * 2 * 3 = 6 is already minimized.
```

**Example 3:**
```
Input: p = 3
Output: 1512
Explanation: nums = [001, 010, 011, 100, 101, 110, 111]
- In the first operation we can swap the leftmost bit of the second and fifth elements.
    - The resulting array is [001, 110, 011, 100, 001, 110, 111].
- In the second operation we can swap the middle bit of the third and fourth elements.
    - The resulting array is [001, 110, 001, 110, 001, 110, 111].
The array product is 1 * 6 * 1 * 6 * 1 * 6 * 7 = 1512, which is the minimum possible product.
```

## Approach

**Algorithm:** The optimal multiset consists of the two largest numbers `p‑1` and `p‑2` repeated as evenly as possible.

- Pair each `p‑1` with a `p‑2`. Their product is `(p‑1)*(p‑2) ≡ 1 (mod p)`.
- If `n` is even, use `n/2` pairs → overall product `1` modulo `p`.
- If `n` is odd, one extra element remains; the smallest non‑zero choice is `p‑2`.
- Therefore the minimal product modulo `p` equals `(p‑1)^{⌊n/2⌋} * (p‑2)^{⌈n/2⌉}`.
- Compute the exponentiation under modulus `M = 10^9+7` using fast power.

```text
FUNCTION minNonZeroProduct(p, n):
    MOD ← 1_000_000_007
    half ← n DIV 2               // integer division
    exp1 ← half                  // exponent for (p‑1)
    exp2 ← n - half              // exponent for (p‑2)
    part1 ← MOD_EXP(p-1, exp1, MOD)
    part2 ← MOD_EXP(p-2, exp2, MOD)
    RETURN (part1 * part2) MOD MOD

FUNCTION MOD_EXP(base, exponent, MOD):
    result ← 1
    base ← base MOD MOD
    WHILE exponent > 0 DO
        IF exponent MOD 2 = 1 THEN
            result ← (result * base) MOD MOD
        base ← (base * base) MOD MOD
        exponent ← exponent DIV 2
    RETURN result
```

## Walkthrough

For `p = 7, n = 5`:

- `half = 2`, `exp1 = 2`, `exp2 = 3`.
- Compute `(6^2) * (5^3) mod M` → `36 * 125 = 4500` → `4500 mod M = 4500`.
- This is the smallest non‑zero product achievable.

## Complexity Analysis

- **Time:** `O(log n)` for modular exponentiation.
- **Space:** `O(1)`.

## Follow‑Up Questions

- How would the solution change if `p` were not prime?
- Can the same reasoning be applied when the allowed set is a custom list of numbers?
- What if we need the *maximum* non‑zero product instead?

## Key Takeaway

Pairing the two largest numbers `p‑1` and `p‑2` yields a product of `1` modulo `p`; using them as evenly as possible gives the minimal non‑zero product, computable with fast modular exponentiation.

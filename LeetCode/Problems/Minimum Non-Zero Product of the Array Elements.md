# 1969. Minimum Non-Zero Product of the Array Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements](https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements)
**Companies:** Amazon, Paypal

---

## Problem Description

Given two integers `p` (a prime) and `n`, consider the set `{1, 2, …, p‑1}`. Choose `n` numbers (with repetition allowed) from this set such that their product modulo `p` is **non‑zero** and as small as possible. Return the minimum possible product modulo `10^9+7`.

## Examples

1. **Input:** `p = 3, n = 3`
   **Output:** `2`
   **Explanation:** The only non‑zero product is `2·2·2 = 8 ≡ 2 (mod 3)`. After applying the final modulo `10^9+7` the answer is `2`.
2. **Input:** `p = 5, n = 2`
   **Output:** `4`
   **Explanation:** Choose numbers `2` and `2`. Product `= 4` which is the smallest non‑zero value.

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

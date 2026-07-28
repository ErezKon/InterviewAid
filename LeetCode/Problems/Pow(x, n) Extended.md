# 50. Pow(x, n) — Fast Exponentiation

See also: [Pow(x, n).md](Pow%28x,%20n%29.md)

**Companies:** Accenture, Adobe, Amazon, Bloomberg, Cisco, Citadel, Ebay, Epam Systems, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Qualcomm, Servicenow, Tcs, Tiktok, Walmart Labs, Wix
---

## Problem Description
Implement a function `myPow(x, n)` that calculates `x` raised to the power `n` (`xⁿ`). The exponent `n` can be a negative integer, zero, or positive. Return the result as a double-precision floating‑point number. The algorithm must run in logarithmic time.

## Examples
**Example 1:**
```
Input: x = 2.00000, n = 10
Output: 1024.00000
Explanation: 2¹⁰ = 1024
```
**Example 2:**
```
Input: x = 2.10000, n = 3
Output: 9.26100
```
**Example 3:**
```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2⁻² = 1/4 = 0.25
```

## Approach
**Algorithm:** Binary (fast) exponentiation – repeatedly square the base and multiply when the current exponent bit is 1.
**Key Insight:** Any integer `n` can be expressed in binary; by squaring the base for each bit and multiplying when the bit is set, we achieve O(log |n|) multiplications.

```text
FUNCTION myPow(x, n):
    IF n == 0:
        RETURN 1
    IF n < 0:
        x ← 1 / x
        n ← -n
    result ← 1
    WHILE n > 0:
        IF n AND 1 == 1:          // lowest bit is set
            result ← result * x
        x ← x * x                 // square base
        n ← n >> 1                // shift right (divide by 2)
    RETURN result
```

## Walkthrough
For `x = 2, n = 10 (1010₂)`:
1. n LSB = 0 → skip multiplication, square `x` → 4, n → 5.
2. n LSB = 1 → result = 1 × 4 = 4, square `x` → 16, n → 2.
3. n LSB = 0 → skip, square `x` → 256, n → 1.
4. n LSB = 1 → result = 4 × 256 = 1024, square `x` (unused), n → 0.
Final result = 1024.

## Complexity Analysis
- **Time:** O(log |n|) multiplications.
- **Space:** O(1) auxiliary space.

## Follow‑Up Questions
1. How would you adapt the algorithm for modular exponentiation (computing `xⁿ mod m`)?
2. Can you implement the same logic iteratively without using bitwise operators?
3. What changes are needed to handle very large exponents that exceed 64‑bit integer range?

## Key Takeaway
Binary exponentiation reduces the exponent by half each step, turning a linear‑time power calculation into a logarithmic‑time process.

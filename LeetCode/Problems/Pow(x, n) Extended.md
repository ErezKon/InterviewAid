# 50. Pow(x, n) — Fast Exponentiation

See also: [Pow(x, n).md](Pow%28x,%20n%29.md)

**Companies:** Accenture, Adobe, Amazon, Bloomberg, Cisco, Citadel, Ebay, Epam Systems, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Qualcomm, Servicenow, Tcs, Tiktok, Walmart Labs, Wix
---

## Binary Exponentiation Template

Used in: Pow(x,n), Matrix Exponentiation, Modular Exponentiation

```
FUNCTION power(base, exp, mod=null):
    result = 1
    IF exp < 0:
        base = 1 / base
        exp = -exp

    WHILE exp > 0:
        IF exp & 1:
            result *= base
            IF mod: result %= mod
        base *= base
        IF mod: base %= mod
        exp >>= 1

    RETURN result
```

O(log n) multiplications. Works for integers, floats, and matrices.

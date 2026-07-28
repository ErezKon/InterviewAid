# 50. Pow(x, n)

**Difficulty:** 🟡 Medium
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/powx-n](https://leetcode.com/problems/powx-n)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Cisco, Citadel, Ebay, Epam Systems, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Qualcomm, Servicenow, Tcs, Tiktok, Walmart Labs, Wix

---

## 1. Problem Description

Implement `pow(x, n)`, which calculates `x` raised to the power `n`.

---

## 2. Approach: Fast Power (Binary Exponentiation) — O(log n) ✅

```text
FUNCTION myPow(x, n):
    IF n < 0:
        x = 1 / x
        n = -n
    result = 1
    WHILE n > 0:
        IF n MOD 2 == 1:
            result = result * x
        x = x * x
        n = n DIV 2
    RETURN result
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `x = 2.0, n = 10` | `1024.0` |
| `x = 2.1, n = 3` | `9.261` |
| `x = 2.0, n = -2` | `0.25` |

---

## 4. Walkthrough

Take `x = 2.0, n = 10`:
1. `n` is even, square `x` → `4.0`, halve `n` → `5`.
2. `n` is odd, multiply `result` (1) by `x` (4.0) → `result = 4.0`. Square `x` → `16.0`, halve `n` → `2`.
3. `n` is even, square `x` → `256.0`, halve `n` → `1`.
4. `n` is odd, `result = 4.0 * 256.0 = 1024.0`. Square `x` → `65536.0`, halve `n` → `0`.
5. Loop ends, return `result = 1024.0`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## 6. Follow-Up Questions

- How would you handle the case when `n` equals `INT_MIN` to avoid overflow?
- Can you extend the method to compute modular exponentiation efficiently?

---

## Key Takeaway

> Binary exponentiation (repeated squaring) reduces the number of multiplications from O(n) to O(log n), enabling fast power calculations.

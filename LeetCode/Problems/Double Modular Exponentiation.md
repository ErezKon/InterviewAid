# 2961. Double Modular Exponentiation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/double-modular-exponentiation](https://leetcode.com/problems/double-modular-exponentiation)
**Companies:** Barclays

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Modular Exponentiation](#approach-modular-exponentiation--on-log-b-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 2D array `variables` where `variables[i] = [a, b, c, m]` and an integer `target`, return the indices `i` where `((a^b % 10)^c) % m == target`.

In other words, compute `a^b mod 10`, raise that result to the power `c`, then take mod `m`, and check if it equals `target`.

**Constraints:**
- `1 <= variables.length <= 100`
- `1 <= a, b, c, m <= 10^3`
- `0 <= target <= 10^3`

---

## Examples

```
Input: variables = [[2,3,3,10],[3,3,9,2],[6,1,1,4]], target = 2
Output: [0,2]
Explanation:
  i=0: (2^3 % 10)^3 % 10 = (8)^3 % 10 = 512 % 10 = 2 ✅
  i=1: (3^3 % 10)^9 % 2 = (7)^9 % 2 = 1 ≠ 2
  i=2: (6^1 % 10)^1 % 4 = (6)^1 % 4 = 2 ✅
```

---

## Key Insight

> Two-step modular exponentiation: first compute `x = pow(a, b) % 10`, then compute `pow(x, c) % m`. Use **fast modular exponentiation** (binary exponentiation) for both steps to handle large exponents efficiently.

---

## Approach: Modular Exponentiation — O(n · log b) ✅

```
FUNCTION getGoodIndices(variables, target):
    result = []
    FOR i, [a, b, c, m] IN enumerate(variables):
        step1 = MODPOW(a, b, 10)       // a^b mod 10
        step2 = MODPOW(step1, c, m)    // (a^b mod 10)^c mod m
        IF step2 == target:
            result.ADD(i)
    RETURN result

FUNCTION MODPOW(base, exp, mod):
    IF mod == 1: RETURN 0
    result = 1
    base = base % mod
    WHILE exp > 0:
        IF exp % 2 == 1:
            result = (result * base) % mod
        exp = exp >> 1
        base = (base * base) % mod
    RETURN result
```

---

## Walkthrough

```
variables[0] = [2, 3, 3, 10], target = 2

Step 1: MODPOW(2, 3, 10)
  base=2, exp=3, mod=10
  exp odd → result = 1*2 = 2, exp=1, base=4
  exp odd → result = 2*4 = 8, exp=0
  → x = 8

Step 2: MODPOW(8, 3, 10)
  base=8, exp=3, mod=10
  exp odd → result = 1*8 = 8, exp=1, base=64%10=4
  exp odd → result = 8*4 = 32%10 = 2, exp=0
  → 2 == target ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n × (log b + log c)) | Two modpow calls per element |
| **Space** | O(1) | Constant extra space (aside from result) |

---

## Key Takeaway

> **Chained modular exponentiation: break into steps, apply fast modpow at each stage. Binary exponentiation is the go-to for `a^b % m` in O(log b).**

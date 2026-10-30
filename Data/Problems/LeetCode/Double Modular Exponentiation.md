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

You are given a **0-indexed** 2D array `variables` where `variables[i] = [a_i, b_i, c_i, m_i]`, and an integer `target`.

An index `i` is **good** if the following formula holds:

- `0 <= i < variables.length`
- `((a_i^b_i % 10)^c_i) % m_i == target`

Return *an array consisting of **good** indices in **any order***.

**Constraints:**
- `1 <= variables.length <= 100`
- `variables[i] == [a_i, b_i, c_i, m_i]`
- `1 <= a_i, b_i, c_i, m_i <= 10^3`
- `0 <= target <= 10^3`

---

## Examples

**Example 1:**
```
Input: variables = [[2,3,3,10],[3,3,3,1],[6,1,1,4]], target = 2
Output: [0,2]
Explanation: For each index i in the variables array:
1) For the index 0, variables[0] = [2,3,3,10], (2^3 % 10)^3 % 10 = 2.
2) For the index 1, variables[1] = [3,3,3,1], (3^3 % 10)^3 % 1 = 0.
3) For the index 2, variables[2] = [6,1,1,4], (6^1 % 10)^1 % 4 = 2.
Therefore we return [0,2] as the answer.
```

**Example 2:**
```
Input: variables = [[39,3,1000,1000]], target = 17
Output: []
Explanation: For each index i in the variables array:
1) For the index 0, variables[0] = [39,3,1000,1000], (39^3 % 10)^1000 % 1000 = 1.
Therefore we return [] as the answer.
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

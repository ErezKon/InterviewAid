# 43. Multiply Strings

**Difficulty:** 🟡 Medium
**Acceptance:** 41.0%
**LeetCode:** [https://leetcode.com/problems/multiply-strings](https://leetcode.com/problems/multiply-strings)
**Companies:** Amazon, Bloomberg, Bytedance, Epam Systems, Google, Makemytrip, Meta, Microsoft, Nielsen, Oracle, Palo Alto Networks, Pinterest, Roku, Tiktok, Twitter, Two Sigma, Zoho

---

## 1. Problem Description

Given two non-negative integers represented as strings, return their product as a string. Must not use BigInteger or convert directly to integer.

---

## 2. Approach: Grade School Multiplication — O(m·n) ✅

```
FUNCTION multiply(num1, num2):
    IF num1 == "0" OR num2 == "0": RETURN "0"

    m, n = len(num1), len(num2)
    result = array of (m + n) zeros

    FOR i ← m - 1 DOWN TO 0:
        FOR j ← n - 1 DOWN TO 0:
            product = (num1[i] - '0') * (num2[j] - '0')
            p1 = i + j       // tens position
            p2 = i + j + 1   // ones position

            sum = product + result[p2]
            result[p2] = sum % 10
            result[p1] += sum / 10

    // Remove leading zeros
    result = JOIN(result).LSTRIP('0')
    RETURN result IF result ELSE "0"
```

### Key Insight

`num1[i] * num2[j]` contributes to positions `i+j` and `i+j+1` in the result.

| Time | Space |
|------|-------|
| O(m · n) | O(m + n) |

---

## Key Takeaway

> Simulate grade-school multiplication. The position formula `i+j` and `i+j+1` maps each digit product to the correct result positions. Process carries as you go.

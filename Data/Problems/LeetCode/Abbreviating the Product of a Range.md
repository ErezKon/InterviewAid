# 2117. Abbreviating the Product of a Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/abbreviating-the-product-of-a-range](https://leetcode.com/problems/abbreviating-the-product-of-a-range)
**Companies:** Avalara

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Separate Prefix/Suffix + Trailing Zero Count ✅](#4-approach-separate-prefixsuffix--trailing-zero-count-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two positive integers `left` and `right` with `left <= right`. Calculate the **product** of all integers in the **inclusive** range `[left, right]`.

Since the product may be very large, you will **abbreviate** it following these steps:

1. Count all **trailing** zeros in the product and **remove** them. Let us denote this count as `C`.
   - For example, there are `3` trailing zeros in `1000`, and there are `0` trailing zeros in `546`.
2. Denote the remaining number of digits in the product as `d`. If `d > 10`, then express the product as `<pre>...<suf>` where `<pre>` denotes the **first** `5` digits of the product, and `<suf>` denotes the **last** `5` digits of the product **after** removing all trailing zeros. If `d <= 10`, we keep it unchanged.
   - For example, we express `1234567654321` as `12345...54321`, but `1234567` is represented as `1234567`.
3. Finally, represent the product as a **string** `"<pre>...<suf>eC"`.
   - For example, `12345678987600000` will be represented as `"12345...89876e5"`.

Return *a string denoting the **abbreviated product** of all integers in the **inclusive** range* `[left, right]`.

**Constraints:**
- `1 ≤ left ≤ right ≤ 10⁴`

---

## 2. Examples

```
Example 1:
  Input: left = 1, right = 4
  Output: "24e0"
  Explanation: The product is 1 × 2 × 3 × 4 = 24.
  There are no trailing zeros, so 24 remains the same. The abbreviation will end with "e0".
  Since the number of digits is 2, which is less than 10, we do not have to abbreviate it further.
  Thus, the final representation is "24e0".

Example 2:
  Input: left = 2, right = 11
  Output: "399168e2"
  Explanation: The product is 39916800.
  There are 2 trailing zeros, which we remove to get 399168. The abbreviation will end with "e2".
  The number of digits after removing the trailing zeros is 6, so we do not abbreviate it further.
  Hence, the abbreviated product is "399168e2".

Example 3:
  Input: left = 371, right = 375
  Output: "7219856259e3"
  Explanation: The product is 7219856259000.
```

---

## 3. Key Insight

> The product can be astronomically large, so we **cannot compute it directly**. Instead:
> 1. **Count trailing zeros** by counting factors of 2 and 5 (min of both).
> 2. **Track the first 5 digits** using logarithms (keep the fractional part of log₁₀ of the product).
> 3. **Track the last 5 digits** using modular arithmetic (product mod 10⁵, after removing trailing zeros).

---

## 4. Approach: Separate Prefix/Suffix + Trailing Zero Count ✅

```
FUNCTION abbreviateProduct(left, right):
    // Count trailing zeros (factors of 2 and 5)
    twos = fives = 0
    FOR i ← left TO right:
        t = i
        WHILE t % 2 == 0: twos += 1; t /= 2
        WHILE t % 5 == 0: fives += 1; t /= 5
    trailingZeros = MIN(twos, fives)

    // First 5 digits via log10
    logSum = 0
    FOR i ← left TO right:
        logSum += log10(i)
    fractional = logSum - FLOOR(logSum)
    prefix = FLOOR(10^(fractional + 4))    // first 5 digits

    // Last 5 digits via modular arithmetic
    MOD = 10^5
    suffix = 1
    rem2 = twos - trailingZeros
    rem5 = fives - trailingZeros
    FOR i ← left TO right:
        t = i
        WHILE t % 2 == 0: t /= 2
        WHILE t % 5 == 0: t /= 5
        suffix = (suffix * t) % MOD
    // Multiply back remaining 2s and 5s
    suffix = (suffix * POW(2, rem2, MOD) * POW(5, rem5, MOD)) % MOD

    // Format result
    totalDigits = FLOOR(logSum) + 1
    IF totalDigits - trailingZeros <= 10:
        RETURN fullProduct + "e" + trailingZeros
    ELSE:
        RETURN prefix + "..." + suffix(5 digits) + "e" + trailingZeros
```

---

## 5. Walkthrough

```
left = 2, right = 11
Product = 2×3×4×5×6×7×8×9×10×11 = 39916800

Trailing zeros: factors of 2 = 8, factors of 5 = 2 → min = 2
Product without trailing zeros = 399168
Total digits = 8, significant digits = 6 ≤ 10
→ Return "399168e2" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((right - left) × log(right)) for factor counting |
| **Space** | O(1) |

---

## 7. Key Takeaway

> For problems involving products of large ranges, use **logarithms for the prefix**, **modular arithmetic for the suffix**, and **factor counting for trailing zeros**. Never try to compute the actual product.

# 2232. Minimize Result by Adding Parentheses to Expression

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-result-by-adding-parentheses-to-expression](https://leetcode.com/problems/minimize-result-by-adding-parentheses-to-expression)
**Companies:** Pinterest

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** string `expression` of the form `"<num1>+<num2>"` where `<num1>` and `<num2>` represent positive integers.

Add a pair of parentheses to `expression` such that after the addition of parentheses, `expression` is a **valid** mathematical expression and evaluates to the **smallest** possible value. The left parenthesis **must** be added to the left of `'+'` and the right parenthesis **must** be added to the right of `'+'`.

Return `expression` *after adding a pair of parentheses such that* `expression` *evaluates to the **smallest** possible value.* If there are multiple answers that yield the same result, return any of them.

The input has been generated such that the original value of `expression`, and the value of `expression` after adding any pair of parentheses that meets the requirements fits within a signed 32-bit integer.

**Constraints:**
- `3 ≤ expression.length ≤ 10`
- `expression` consists of digits from `'1'` to `'9'` and `'+'`.
- `expression` starts and ends with digits.
- `expression` contains exactly one `'+'`.
- The original value of `expression`, and the value of `expression` after adding any pair of parentheses that meets the requirements fits within a signed 32-bit integer.

---

## Examples

```
Example 1:
  Input: expression = "247+38"
  Output: "2(47+38)"
  Explanation: The expression evaluates to 2 * (47 + 38) = 2 * 85 = 170.
  Note that "2(4)7+38" is invalid because the right parenthesis must be to the right of the '+'.
  It can be shown that 170 is the smallest possible value.
```

```
Example 2:
  Input: expression = "12+34"
  Output: "1(2+3)4"
  Explanation: The expression evaluates to 1 * (2 + 3) * 4 = 1 * 5 * 4 = 20.
```

```
Example 3:
  Input: expression = "999+999"
  Output: "(999+999)"
  Explanation: The expression evaluates to 999 + 999 = 1998.
```

---

## Key Insight

> Try all possible placements of `(` before some digit of num1 and `)` after some digit of num2. The value = `left_part * (inner_left + inner_right) * right_part` (treat empty left/right as 1). Brute force is fine since the string is short.

---

## Approach: Brute Force — O(n²) ✅

```
FUNCTION minimizeResult(expression):
    plusIdx ← INDEX_OF(expression, '+')
    left ← expression[0..plusIdx-1]
    right ← expression[plusIdx+1..end]
    
    bestVal ← INFINITY
    bestExpr ← ""
    
    FOR i ← 0 TO LEN(left)-1 DO          // '(' position
        FOR j ← 1 TO LEN(right) DO        // ')' position
            a ← INT(left[0..i-1]) IF i > 0 ELSE 1
            b ← INT(left[i..end])
            c ← INT(right[0..j-1])
            d ← INT(right[j..end]) IF j < LEN(right) ELSE 1
            val ← a * (b + c) * d
            IF val < bestVal THEN
                bestVal ← val
                bestExpr ← left[0..i-1] + "(" + left[i..] + "+" + right[..j-1] + ")" + right[j..]
    
    RETURN bestExpr
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute force all placements | **O(n²)** | **O(n)** |

Where n is the length of the expression (≤ 10).

---

## Key Takeaway

> **Enumerate parenthesis placements** — with small input, try every valid `(` and `)` position around the `+` sign. Compute the product-of-sums value and track the minimum.

---

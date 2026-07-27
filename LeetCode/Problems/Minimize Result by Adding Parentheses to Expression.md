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

Given a string expression of the form `"num1+num2"`, add **one pair of parentheses** around a substring that includes the `+` sign to minimize the result. The part outside parentheses is multiplied, inside is added.

Example: `"247+38"` → `"2(47+38)"` = 2 × 85 = 170.

---

## Examples

**Example 1:**
```
Input:  "247+38"
Output: "2(47+3)8"  → 2 × 50 × 8 = 800? Actually "2(47+38)" = 170
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

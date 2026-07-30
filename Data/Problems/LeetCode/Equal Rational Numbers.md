# 972. Equal Rational Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/equal-rational-numbers](https://leetcode.com/problems/equal-rational-numbers)
**Companies:** Google, Microsoft

---

## Problem Description
Given two strings `s` and `t` that represent rational numbers, determine if they represent the same value. Each string may contain an integer part, a fractional part after a decimal point, and a repeating part enclosed in parentheses. For example, `"0.5(3)"` means `0.53333…`. Return `true` if the two numbers are equal, otherwise `false`.

## Examples
```text
Input: s = "0.5(3)", t = "0.53(3)"
Output: true
Explanation: Both represent 0.53333…

Input: s = "1.0", t = "1"
Output: true

Input: s = "2.(142857)", t = "2.142857142857"
Output: true
```

## Approach
Convert each representation to a fraction `numerator/denominator` in reduced form.
1. Parse integer part, non‑repeating fractional part, and repeating part.
2. Let `a` be integer part, `b` the non‑repeating digits, `c` the repeating digits.
3. If there is a repeating part, the value equals:
   `a + (b * 10^{len(c)} + c - b) / (10^{len(b)} * (10^{len(c)} - 1))`.
   Otherwise, value = `a + b / 10^{len(b)}`.
4. Compute numerator and denominator, reduce by GCD, and compare the two fractions.

## Pseudocode
```text
FUNCTION parseRational(str):
    SPLIT str AT '.' INTO intPart AND fracPart (if no '.', fracPart = "")
    SET a ← INTEGER(intPart)
    IF '(' IN fracPart:
        SPLIT fracPart AT '(' INTO nonRep AND repPartWithParen
        SET bStr ← nonRep
        SET cStr ← repPartWithParen REMOVE_TRAILING ')'
    ELSE:
        SET bStr ← fracPart
        SET cStr ← ""
    SET lenB ← LENGTH(bStr)
    SET lenC ← LENGTH(cStr)
    IF lenC > 0:
        SET numerator ← a * (10^{lenB} * (10^{lenC} - 1)) +
                         INTEGER(bStr + cStr) - (IF bStr == "" THEN 0 ELSE INTEGER(bStr))
        SET denominator ← 10^{lenB} * (10^{lenC} - 1)
    ELSE:
        SET numerator ← a * 10^{lenB} + (IF bStr == "" THEN 0 ELSE INTEGER(bStr))
        SET denominator ← 10^{lenB}
    SET g ← GCD(numerator, denominator)
    RETURN (numerator / g, denominator / g)

FUNCTION isEqualRational(s, t):
    SET (n1, d1) ← parseRational(s)
    SET (n2, d2) ← parseRational(t)
    RETURN n1 == n2 AND d1 == d2
```

## Walkthrough
| Input | a | b | c | Numerator | Denominator |
|-------|---|---|---|-----------|-------------|
| "0.5(3)" | 0 | "5" | "3" | 53 | 90 |
| "0.53(3)"| 0 | "53"| "3"| 53 | 90 |
Both fractions reduce to 53/90 → equal.

## Complexity Analysis
- **Time:** O(L) per string, where L is its length (parsing and GCD).
- **Space:** O(1) extra space.

## Follow‑Up Questions
- How would you handle very large repeating sections without overflow?
- Can you extend the solution to compare more than two numbers efficiently?
- What if the input includes scientific notation (e.g., "1e-3")?

## Key Takeaway
Transforming a decimal with repeating parts into a reduced fraction provides a precise way to compare rational numbers without floating‑point errors.

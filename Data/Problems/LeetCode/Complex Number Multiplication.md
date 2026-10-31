# 537. Complex Number Multiplication

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/complex-number-multiplication](https://leetcode.com/problems/complex-number-multiplication)
**Companies:** Amazon, Meta, Shopup
---

## Problem Description
A [complex number](https://en.wikipedia.org/wiki/Complex_number) can be represented as a string on the form `"real+imaginaryi"` where:

- `real` is the real part and is an integer in the range `[-100, 100]`.
- `imaginary` is the imaginary part and is an integer in the range `[-100, 100]`.
- `i^2 == -1`.

Given two complex numbers `num1` and `num2` as strings, return *a string of the complex number that represents their multiplications*.

**Constraints:**
- `num1` and `num2` are valid complex numbers.

## Examples
```
Example 1:
  Input: num1 = "1+1i", num2 = "1+1i"
  Output: "0+2i"
  Explanation: (1 + i) * (1 + i) = 1 + i^2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
```
```
Example 2:
  Input: num1 = "1+-1i", num2 = "1+-1i"
  Output: "0+-2i"
  Explanation: (1 - i) * (1 - i) = 1 + i^2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
```

## Approach
Parse each string to extract real and imaginary parts, then apply the formula:
`(a+bi) * (c+di) = (ac - bd) + (ad + bc)i`.

### Pseudocode
```text
FUNCTION complexNumberMultiply(num1, num2):
    a, b ← PARSE(num1)   // split at '+' and remove trailing 'i'
    c, d ← PARSE(num2)
    real ← a * c - b * d
    imag ← a * d + b * c
    RETURN STRING(real) + "+" + STRING(imag) + "i"
```

## Walkthrough
For `num1 = "1+1i"`, `num2 = "1+1i"`:
1. Parse → `(a=1, b=1)`, `(c=1, d=1)`.
2. Compute `real = 1*1 - 1*1 = 0`.
3. Compute `imag = 1*1 + 1*1 = 2`.
4. Return `"0+2i"`.

## Complexity Analysis
Time: O(1) – constant-time parsing and arithmetic.
Space: O(1).

## Follow-Up Questions
- How would you extend the solution to handle multiplication of more than two complex numbers?
- Can you perform the multiplication without explicit parsing, using regular expressions?
- What changes are needed if the input format uses spaces, e.g., `"a + bi"`?

---

## Key Takeaway

> Extracting the real and imaginary components and applying the standard multiplication formula yields the product in constant time.

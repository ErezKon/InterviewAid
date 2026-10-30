# 3697. Compute Decimal Representation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/compute-decimal-representation](https://leetcode.com/problems/compute-decimal-representation)
**Companies:** Meta

---

## 1. Problem Description

You are given a **positive** integer `n`.

A positive integer is a **base-10 component** if it is the product of a single digit from 1 to 9 and a non-negative power of 10. For example, `500`, `30`, and `7` are **base-10 components**, while `537`, `102`, and `11` are not.

Express `n` as a sum of **only** base-10 components, using the **fewest** base-10 components possible.

Return an array containing these **base-10 components** in **descending** order.

**Constraints:**
- `1 <= n <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: n = 537
  Output: [500,30,7]
  Explanation: We can express 537 as 500 + 30 + 7. It is impossible to express 537 as a sum using fewer than 3 base-10 components.
```
```
Example 2:
  Input: n = 102
  Output: [100,2]
  Explanation: We can express 102 as 100 + 2. 102 is not a base-10 component, which means 2 base-10 components are needed.
```
```
Example 3:
  Input: n = 6
  Output: [6]
  Explanation: 6 is a base-10 component.
```

---

## 3. Approach: Long Division Simulation — O(denominator) ✅

```text
FUNCTION fractionToDecimal(numerator, denominator):
    IF numerator % denominator == 0:
        RETURN str(numerator / denominator)
    
    sign = "-" IF signs differ ELSE ""
    num, den = ABS(numerator), ABS(denominator)
    intPart = str(num / den)
    remainder = num % den
    
    decimal = []
    remainderMap = {}
    WHILE remainder != 0:
        IF remainder IN remainderMap:
            pos = remainderMap[remainder]
            INSERT "(" AT pos IN decimal
            APPEND ")" TO decimal
            BREAK
        remainderMap[remainder] = len(decimal)
        remainder *= 10
        APPEND str(remainder / den) TO decimal
        remainder = remainder % den
    
    RETURN sign + intPart + "." + JOIN(decimal)
```

---

## 4. Walkthrough

Take `numerator = 2`, `denominator = 3`:
1. `intPart = "0"`, `remainder = 2`.
2. Multiply remainder by 10 → 20, digit = 20 / 3 = 6, new remainder = 20 % 3 = 2.
3. Remainder `2` has been seen before at position 0, so insert '(' at position 0 and append ')' → result `"0.(6)"`.

---

## 5. Complexity Analysis

- **Time**: Each iteration processes a new remainder; at most `denominator` distinct remainders → `O(denominator)`.
- **Space**: Stores the decimal digits and a map of remainders → `O(denominator)`.

---

## 6. Follow-Up Questions

1. How would you adapt the algorithm for very large numerators/denominators that exceed standard integer ranges?
2. Can you compute the decimal representation without storing all previous remainders, using Floyd's cycle detection?
3. How would you modify the solution to return the length of the repeating cycle instead of the full string?

---

## Key Takeaway

> Long division with remainder tracking detects cycles. When a remainder repeats, insert parentheses around the repeating block.

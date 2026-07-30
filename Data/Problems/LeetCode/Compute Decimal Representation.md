# 3697. Compute Decimal Representation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/compute-decimal-representation](https://leetcode.com/problems/compute-decimal-representation)
**Companies:** Meta

---

## 1. Problem Description

Given integers `numerator` and `denominator`, compute the decimal representation as a string, including repeating parts in parentheses if applicable. *(SQL variant — compute fraction as decimal string)*

---

## 2. Examples

| numerator | denominator | Output |
|-----------|-------------|--------|
| 1 | 2 | "0.5" |
| 2 | 1 | "2" |
| 2 | 3 | "0.(6)" |

*Explanation*: For `2/3`, the digit `6` repeats indefinitely, so it is enclosed in parentheses.

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

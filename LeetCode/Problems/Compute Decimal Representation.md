# 3697. Compute Decimal Representation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/compute-decimal-representation](https://leetcode.com/problems/compute-decimal-representation)
**Companies:** Meta

---

## 1. Problem Description

Given integers `numerator` and `denominator`, compute the decimal representation as a string, including repeating parts in parentheses if applicable. *(SQL variant — compute fraction as decimal string)*

---

## 2. Approach: Long Division Simulation — O(denominator) ✅

```
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
            decimal.INSERT("(", pos)
            decimal.ADD(")")
            BREAK
        remainderMap[remainder] = len(decimal)
        remainder *= 10
        decimal.ADD(str(remainder / den))
        remainder = remainder % den
    
    RETURN sign + intPart + "." + "".JOIN(decimal)
```

| Time | Space |
|------|-------|
| O(denominator) | O(denominator) |

---

## Key Takeaway

> Long division with remainder tracking detects cycles. When a remainder repeats, insert parentheses around the repeating block.

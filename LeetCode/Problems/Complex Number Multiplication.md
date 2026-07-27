# 537. Complex Number Multiplication

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/complex-number-multiplication](https://leetcode.com/problems/complex-number-multiplication)
**Companies:** Amazon, Meta, Shopup

---

```
FUNCTION complexNumberMultiply(num1, num2):
    a, b = parse(num1)    // "a+bi"
    c, d = parse(num2)
    RETURN f"{a*c - b*d}+{a*d + b*c}i"
```

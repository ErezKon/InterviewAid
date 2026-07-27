# 400. Nth Digit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nth-digit](https://leetcode.com/problems/nth-digit)
**Companies:** Accenture, Airbnb, Amazon, Google, Meta, Microsoft, Tiktok

---

```
FUNCTION findNthDigit(n):
    digits = 1
    count = 9
    start = 1

    WHILE n > digits * count:
        n -= digits * count
        digits += 1
        count *= 10
        start *= 10

    // n-th digit in the 'digits'-digit numbers
    num = start + (n - 1) / digits
    digitIdx = (n - 1) % digits
    RETURN int(str(num)[digitIdx])
```

1-digit: 9 numbers (1-9), 2-digit: 90 numbers (10-99), etc.

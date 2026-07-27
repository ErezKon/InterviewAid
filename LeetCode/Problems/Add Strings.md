# 415. Add Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-strings](https://leetcode.com/problems/add-strings)
**Companies:** Airbnb, Amazon, Bloomberg, Capital One, Google, Jane Street, Meta, Microsoft, Oracle, Tiktok, Uber, Visa, Wayfair, Yandex

---

## Approach: Right-to-Left with Carry — O(max(m,n)) ✅

```
FUNCTION addStrings(num1, num2):
    i, j = len(num1) - 1, len(num2) - 1
    carry = 0
    result = []

    WHILE i >= 0 OR j >= 0 OR carry:
        sum = carry
        IF i >= 0: sum += int(num1[i]); i -= 1
        IF j >= 0: sum += int(num2[j]); j -= 1
        result.ADD(str(sum % 10))
        carry = sum / 10

    RETURN REVERSE(result) as string
```

Same pattern as Add Two Numbers (#2) and Add Binary (#67).

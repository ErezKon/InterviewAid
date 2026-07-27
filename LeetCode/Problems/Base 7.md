# 504. Base 7

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/base-7](https://leetcode.com/problems/base-7)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION convertToBase7(num):
    IF num == 0: RETURN "0"
    negative = num < 0
    num = ABS(num)
    result = []
    WHILE num > 0:
        result.ADD(str(num % 7))
        num //= 7
    IF negative: result.ADD('-')
    RETURN JOIN(reversed(result))
```

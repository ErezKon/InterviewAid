# 1017. Convert to Base -2

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-to-base-2](https://leetcode.com/problems/convert-to-base-2)
**Companies:** Airbnb, Boeing, Google, Linkedin

---

```
FUNCTION baseNeg2(n):
    IF n == 0: RETURN "0"
    result = []
    WHILE n != 0:
        remainder = n % (-2)
        n //= -2
        IF remainder < 0:
            remainder += 2
            n += 1
        result.ADD(str(remainder))
    RETURN JOIN(reversed(result))
```

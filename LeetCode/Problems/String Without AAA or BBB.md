# 984. String Without AAA or BBB

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/string-without-aaa-or-bbb](https://leetcode.com/problems/string-without-aaa-or-bbb)
**Companies:** Amazon, Google, Zalando

---

```
FUNCTION strWithout3a3b(a, b):
    result = []
    WHILE a > 0 OR b > 0:
        IF len(result) >= 2 AND result[-1] == result[-2] == 'a':
            result.ADD('b'); b -= 1
        ELSE IF len(result) >= 2 AND result[-1] == result[-2] == 'b':
            result.ADD('a'); a -= 1
        ELSE IF a >= b:
            result.ADD('a'); a -= 1
        ELSE:
            result.ADD('b'); b -= 1
    RETURN JOIN(result)
```

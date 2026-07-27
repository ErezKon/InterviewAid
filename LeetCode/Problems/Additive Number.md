# 306. Additive Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/additive-number](https://leetcode.com/problems/additive-number)
**Companies:** Epic Systems, Google, Meta

---

```
FUNCTION isAdditiveNumber(num):
    n = len(num)
    FOR i ← 1 TO n / 2:
        FOR j ← i + 1 TO n - MAX(i, j - i):
            a = num[:i]; b = num[i:j]
            IF (len(a) > 1 AND a[0] == '0') OR (len(b) > 1 AND b[0] == '0'): CONTINUE
            IF isValid(a, b, num[j:]): RETURN true
    RETURN false

FUNCTION isValid(a, b, rest):
    IF rest == "": RETURN true
    c = str(int(a) + int(b))
    IF NOT rest.startswith(c): RETURN false
    RETURN isValid(b, c, rest[len(c):])
```

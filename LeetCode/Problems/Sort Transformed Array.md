# 360. Sort Transformed Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-transformed-array](https://leetcode.com/problems/sort-transformed-array)
**Companies:** Google, Linkedin, Meta

---

```
FUNCTION sortTransformedArray(nums, a, b, c):
    FUNCTION f(x): RETURN a*x*x + b*x + c
    n = len(nums); result = [0] * n
    lo, hi = 0, n - 1
    idx = n - 1 IF a >= 0 ELSE 0

    WHILE lo <= hi:
        fLo, fHi = f(nums[lo]), f(nums[hi])
        IF a >= 0:
            IF fLo >= fHi: result[idx] = fLo; lo += 1
            ELSE: result[idx] = fHi; hi -= 1
            idx -= 1
        ELSE:
            IF fLo <= fHi: result[idx] = fLo; lo += 1
            ELSE: result[idx] = fHi; hi -= 1
            idx += 1

    RETURN result
```

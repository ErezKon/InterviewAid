# 367. Valid Perfect Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-perfect-square](https://leetcode.com/problems/valid-perfect-square)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Sap

---

```
FUNCTION isPerfectSquare(num):
    lo, hi = 1, num
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        sq = mid * mid
        IF sq == num: RETURN true
        IF sq < num: lo = mid + 1
        ELSE: hi = mid - 1
    RETURN false
```

Binary search. Or Newton's method: `x = (x + num/x) / 2`.

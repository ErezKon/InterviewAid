# 342. Power of Four

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/power-of-four](https://leetcode.com/problems/power-of-four)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Qualcomm, Two Sigma, Wix

---

```
FUNCTION isPowerOfFour(n):
    RETURN n > 0 AND (n & (n - 1)) == 0 AND (n & 0x55555555) != 0
```

Power of 2 check + bit must be at an even position (mask `0x55555555 = 0101...0101`).

# 693. Binary Number with Alternating Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-number-with-alternating-bits](https://leetcode.com/problems/binary-number-with-alternating-bits)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Yahoo

---

```
FUNCTION hasAlternatingBits(n):
    x = n ^ (n >> 1)    // should be all 1s
    RETURN (x & (x + 1)) == 0
```

# 1015. Smallest Integer Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-integer-divisible-by-k](https://leetcode.com/problems/smallest-integer-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

```
FUNCTION smallestRepunitDivByK(k):
    IF k % 2 == 0 OR k % 5 == 0: RETURN -1
    remainder = 0
    FOR length ← 1 TO k:
        remainder = (remainder * 10 + 1) % k
        IF remainder == 0: RETURN length
    RETURN -1
```

Build 1, 11, 111, ... tracking remainder mod k. By pigeonhole, cycle within k steps.

# 1680. Concatenation of Consecutive Binary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers)
**Companies:** Amazon, Bloomberg, Google

---

## Approach: Bit Shift — O(n) ✅

```
FUNCTION concatenatedBinary(n):
    MOD = 10^9 + 7
    result = 0

    FOR i ← 1 TO n:
        bits = floor(log2(i)) + 1
        result = ((result << bits) | i) % MOD

    RETURN result
```

Shift result left by the number of bits in `i`, then OR with `i`.

# 1611. Minimum One Bit Operations to Make Integers Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero](https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero)
**Companies:** Bloomberg, Expedia, Google, Oracle, Servicenow

---

## Approach: Gray Code — O(log n) ✅

```
FUNCTION minimumOneBitOperations(n):
    // This is the inverse Gray code problem
    result = 0
    WHILE n > 0:
        result ^= n
        n >>= 1
    RETURN result
```

The answer is the inverse Gray code of n. XOR all right-shifted versions.

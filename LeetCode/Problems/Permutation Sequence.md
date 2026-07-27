# 60. Permutation Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/permutation-sequence](https://leetcode.com/problems/permutation-sequence)
**Companies:** Amazon, Bloomberg, Google, Jump Trading, Meta, Microsoft, Twitter

---

## Approach: Factoradic Number System — O(n²) ✅

```
FUNCTION getPermutation(n, k):
    factorial = [1] * (n + 1)
    FOR i ← 1 TO n: factorial[i] = factorial[i-1] * i

    digits = [1, 2, ..., n]
    k -= 1    // 0-indexed
    result = ""

    FOR i ← n DOWN TO 1:
        idx = k / factorial[i - 1]
        result += str(digits[idx])
        digits.REMOVE(idx)
        k %= factorial[i - 1]

    RETURN result
```

Each position determines which block of (n-1)! permutations we're in.

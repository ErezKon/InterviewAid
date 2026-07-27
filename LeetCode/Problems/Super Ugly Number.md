# 313. Super Ugly Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/super-ugly-number](https://leetcode.com/problems/super-ugly-number)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION nthSuperUglyNumber(n, primes):
    dp = [1] * n
    pointers = [0] * len(primes)

    FOR i ← 1 TO n - 1:
        candidates = [primes[j] * dp[pointers[j]] for j in range(len(primes))]
        dp[i] = MIN(candidates)
        FOR j in range(len(primes)):
            IF candidates[j] == dp[i]: pointers[j] += 1

    RETURN dp[n - 1]
```

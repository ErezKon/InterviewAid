# 1922. Count Good Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-numbers](https://leetcode.com/problems/count-good-numbers)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Visa

---

```
FUNCTION countGoodNumbers(n):
    MOD = 10^9 + 7
    // Even positions: 5 choices (0,2,4,6,8)
    // Odd positions: 4 choices (2,3,5,7)
    evenCount = (n + 1) / 2
    oddCount = n / 2
    RETURN (pow(5, evenCount, MOD) * pow(4, oddCount, MOD)) % MOD
```

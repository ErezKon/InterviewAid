# 2320. Count Number of Ways to Place Houses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-ways-to-place-houses](https://leetcode.com/problems/count-number-of-ways-to-place-houses)
**Companies:** Amazon, Google, Microsoft, Nagarro

---

```
FUNCTION countHousePlacements(n):
    MOD = 10^9 + 7
    // Each side independent; count valid arrangements for one side
    // Like Fibonacci: f(n) = f(n-1) + f(n-2) (place or skip)
    a, b = 1, 2
    FOR _ ← 2 TO n:
        a, b = b, (a + b) % MOD
    RETURN (b * b) % MOD    // both sides independent
```

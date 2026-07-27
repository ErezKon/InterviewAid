# 1492. The kth Factor of n

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-kth-factor-of-n](https://leetcode.com/problems/the-kth-factor-of-n)
**Companies:** Amazon, Bloomberg, Expedia, Google, Meta, Microsoft, Oracle, Tcs

---

```
FUNCTION kthFactor(n, k):
    FOR i ← 1 TO n:
        IF n % i == 0:
            k -= 1
            IF k == 0: RETURN i
    RETURN -1
```

O(√n) optimization: collect factors up to √n, then check corresponding large factors.

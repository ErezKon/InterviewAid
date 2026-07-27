# 509. Fibonacci Number

**Difficulty:** 🟢 Easy
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/fibonacci-number](https://leetcode.com/problems/fibonacci-number)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Cognizant, Google, Htc, Infosys, Intel, Lti, Meta, Microsoft, Nvidia, Spotify, Tcs, Wix

---

## Approaches

```
// O(n) time, O(1) space
FUNCTION fib(n):
    IF n <= 1: RETURN n
    a, b = 0, 1
    FOR i ← 2 TO n:
        a, b = b, a + b
    RETURN b
```

| Approach | Time | Space |
|----------|------|-------|
| Recursive | O(2ⁿ) | O(n) |
| Memoized | O(n) | O(n) |
| **Iterative** | **O(n)** | **O(1)** |
| Matrix Exp | O(log n) | O(1) |

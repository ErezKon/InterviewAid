# 264. Ugly Number II

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/ugly-number-ii](https://leetcode.com/problems/ugly-number-ii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paytm, Visa

---

## Approach: Three Pointers DP — O(n) ✅

```
FUNCTION nthUglyNumber(n):
    ugly = [1] * n
    i2 = i3 = i5 = 0

    FOR i ← 1 TO n - 1:
        next2 = ugly[i2] * 2
        next3 = ugly[i3] * 3
        next5 = ugly[i5] * 5

        ugly[i] = MIN(next2, next3, next5)

        IF ugly[i] == next2: i2 += 1
        IF ugly[i] == next3: i3 += 1
        IF ugly[i] == next5: i5 += 1

    RETURN ugly[n - 1]
```

Three pointers track the next candidate from each prime factor. Advance all matching pointers to avoid duplicates.

# 483. Smallest Good Base

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-good-base](https://leetcode.com/problems/smallest-good-base)
**Companies:** Amazon, Google, Microsoft

---

## Approach: Math + Binary Search — O(log²n) ✅

```
FUNCTION smallestGoodBase(n):
    n = int(n)
    // Try from largest number of digits down
    FOR m ← floor(log2(n)) DOWN TO 2:
        k = floor(n^(1/m))    // candidate base
        IF (k^(m+1) - 1) / (k - 1) == n:
            RETURN str(k)
    RETURN str(n - 1)    // base n-1: "11"
```

n = 1 + k + k² + ... + k^m. For each m, binary search for k.

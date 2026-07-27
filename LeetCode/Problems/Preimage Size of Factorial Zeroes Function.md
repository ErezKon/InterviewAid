# 793. Preimage Size of Factorial Zeroes Function

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function](https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function)
**Companies:** Adobe

---

```
FUNCTION preimageSizeFZF(k):
    FUNCTION trailingZeroes(n):
        count = 0
        WHILE n >= 5: n /= 5; count += n
        RETURN count

    FUNCTION lowerBound(target):
        lo, hi = 0, 5 * target + 1
        WHILE lo < hi:
            mid = (lo + hi) / 2
            IF trailingZeroes(mid) >= target: hi = mid
            ELSE: lo = mid + 1
        RETURN lo

    RETURN lowerBound(k + 1) - lowerBound(k)
```

Either 0 or 5 numbers have exactly k trailing zeroes. Binary search for boundaries.

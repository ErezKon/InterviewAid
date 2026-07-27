# 374. Guess Number Higher or Lower

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/guess-number-higher-or-lower](https://leetcode.com/problems/guess-number-higher-or-lower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Samsung, Tcs

---

## 1. Problem Description

Guess a number between 1 and `n`. Use a provided `guess(num)` API that returns -1 (lower), 1 (higher), or 0 (correct).

## 2. Approach: Binary Search — O(log n) ✅

```
FUNCTION guessNumber(n):
    lo, hi = 1, n
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        result = guess(mid)
        IF result == 0: RETURN mid
        ELSE IF result == -1: hi = mid - 1
        ELSE: lo = mid + 1
```

## Key Takeaway

> Standard binary search with an API call instead of array access.

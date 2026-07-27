# 625. Minimum Factorization

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-factorization](https://leetcode.com/problems/minimum-factorization)
**Companies:** Tencent

---

## Problem Description

Given a positive integer `num`, find the smallest positive integer whose digits multiply to `num`. Return 0 if no such integer exists or if the result exceeds 32-bit integer range.

## Key Insight

> Greedily extract the **largest single-digit factors** (9 down to 2). Place smaller factors as more significant digits to minimize the number. If `num` has a prime factor > 9, it's impossible.

## Approach: Greedy Factor Extraction — O(log n) ✅

```
FUNCTION smallestFactorization(num):
    IF num == 1: RETURN 1
    digits ← []
    FOR d ← 9 DOWNTO 2:
        WHILE num % d == 0:
            digits.APPEND(d)
            num ← num / d
    IF num > 1: RETURN 0    // prime factor > 9
    digits.REVERSE()         // smallest digits first
    result ← digits as integer
    IF result > 2³¹ - 1: RETURN 0
    RETURN result
```

| Time | Space |
|------|-------|
| O(log n) | O(log n) |

## Key Takeaway

> To minimize a number from digit products, extract the **largest digit factors first** (greedy 9→2), then reverse to form the smallest number.

# 172. Factorial Trailing Zeroes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/factorial-trailing-zeroes](https://leetcode.com/problems/factorial-trailing-zeroes)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given integer `n`, return the number of **trailing zeroes** in `n!`.

---

## Key Insight

> Trailing zeros come from factors of 10 = 2 × 5. There are always more 2s than 5s in n!, so count factors of 5. Numbers like 25, 125 contribute multiple 5s.

---

## Approach: Count Factors of 5 — O(log n) ✅

```
FUNCTION trailingZeroes(n):
    count = 0
    WHILE n >= 5:
        n /= 5
        count += n
    RETURN count
```

---

## Walkthrough

```
n = 100
  100/5 = 20 (multiples of 5)
  20/5 = 4   (multiples of 25, extra 5 each)
  4/5 = 0    → STOP
  count = 20 + 4 = 24 trailing zeros ✅
```

---

## Key Takeaway

> **Trailing zeros in n! = sum of ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ... Count factors of 5 at every power level.**

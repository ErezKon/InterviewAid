# 3234. Count the Number of Substrings With Dominant Ones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones](https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Count substrings of a binary string where `count('1') >= count('0')²`. A substring has **dominant ones** if the number of ones is at least the square of the number of zeros.

---

## Key Insight

Since `zeros² ≤ length ≤ n`, we have `zeros ≤ √n`. Enumerate by the number of zeros in the substring (at most √n values). For each target zero count `z`, use prefix sums to find valid substring ranges efficiently.

---

## Approach

```
// Count substrings where count('1') >= count('0')^2
// Enumerate by number of zeros (since zeros² ≤ length ≤ n, zeros ≤ sqrt(n))
// For each pair of zero positions, count valid substrings

FUNCTION numberOfSubstrings(s):
    n = LENGTH(s)
    zeroPositions = [i for i in range(n) if s[i] == '0']
    prefixOnes = prefix sum of 1s

    result = 0
    // z = 0: count substrings with all 1s (runs)
    // z = 1, 2, ..., sqrt(n): use zero positions to bound substrings
    // For each group of z consecutive zeros, determine valid left/right bounds
    // where ones ≥ z²

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × √n) |
| **Space** | O(n) |

---

## Key Takeaway

> **When the constraint is `ones ≥ zeros²`, the number of zeros is bounded by √n. Enumerate by zero count for an O(n√n) solution — a classic trick when one variable is bounded by the square root of the other.**

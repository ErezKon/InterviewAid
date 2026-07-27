# 2999. Count the Number of Powerful Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-powerful-integers](https://leetcode.com/problems/count-the-number-of-powerful-integers)
**Companies:** Google, Hashedin, Jd, Meta, Sprinklr

---

## Problem Description

A **powerful** integer in `[start, finish]` ends with suffix string `s` and has all digits ≤ `limit`. Count such integers.

---

## Key Insight

Use digit DP with the formula `count(finish) - count(start - 1)`. The number has a fixed suffix `s` — only the **prefix digits** are free. Each prefix digit must be ≤ `limit`, and the tight constraint applies to digits of the upper bound.

---

## Approach: Digit DP — O(log(finish)) ✅

```
FUNCTION numberOfPowerfulInt(start, finish, limit, s):
    RETURN count(finish, limit, s) - count(start - 1, limit, s)

FUNCTION count(n, limit, s):
    numStr = str(n)
    suffixLen = LENGTH(s)
    prefixLen = LENGTH(numStr) - suffixLen
    IF prefixLen < 0: RETURN 0

    // Count numbers with prefixLen free digits (each ≤ limit)
    // followed by exact suffix s, total ≤ n
    result = 0
    FOR each prefix digit position (tight or free):
        IF tight: digit ≤ numStr[pos], also ≤ limit
        ELSE: digit ≤ limit
        // Count valid completions
    // Handle suffix matching against numStr's suffix
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log(finish)) — number of digits |
| **Space** | O(log(finish)) |

---

## Key Takeaway

> **Powerful integers with a fixed suffix: only the prefix digits are free variables. Apply digit DP on the prefix with the `limit` constraint, then verify the suffix matches exactly.**

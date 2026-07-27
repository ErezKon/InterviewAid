# 2151. Maximum Good People Based on Statements

**Difficulty:** 🔴 Hard
**Companies:** Microsoft, Oracle, Tusimple

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask Enumeration — O(2ⁿ · n²)](#approach-bitmask-enumeration--o2ⁿ--n²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` people and their statements about each other (good/bad/no statement), find the maximum number of people that can be "good" such that all good people's statements are consistent.

**Constraints:**
- `n ≤ 15`

---

## Key Insight

> With n ≤ 15, enumerate all 2ⁿ subsets as candidate "good" sets. For each subset, validate: every good person's statements must agree with the subset (if they say someone is good, that person must be in the subset; if bad, not in the subset).

---

## Approach: Bitmask Enumeration — O(2ⁿ · n²) ✅

```
FUNCTION maximumGood(statements):
    n = len(statements); result = 0
    FOR mask ← 0 TO (1 << n) - 1:
        IF isValid(mask, statements):
            result = MAX(result, popcount(mask))
    RETURN result

FUNCTION isValid(mask, statements):
    FOR i ← 0 TO n - 1:
        IF NOT (mask & (1 << i)): CONTINUE    // i not good, skip
        FOR j ← 0 TO n - 1:
            IF statements[i][j] == 1 AND NOT (mask & (1 << j)): RETURN false
            IF statements[i][j] == 0 AND (mask & (1 << j)): RETURN false
    RETURN true
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask | **O(2ⁿ · n²)** | O(1) |

With n ≤ 15: 32768 × 225 ≈ 7M operations.

---

## Key Takeaway

> **Small n → enumerate all subsets as bitmasks.** Validate each subset against the constraint matrix. Classic bitmask brute force.

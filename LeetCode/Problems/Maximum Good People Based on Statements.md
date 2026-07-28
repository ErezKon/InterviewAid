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
- [Examples](#examples)
- [Walkthrough](#walkthrough)

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

```text
FUNCTION maximumGood(statements):
    n ← LENGTH(statements)
    result ← 0
    FOR mask ← 0 TO (1 << n) - 1:
        IF isValid(mask, statements):
            result ← MAX(result, POPCOUNT(mask))
    RETURN result

FUNCTION isValid(mask, statements):
    FOR i ← 0 TO n - 1:
        IF NOT (mask & (1 << i)): CONTINUE   // person i not good
        FOR j ← 0 TO n - 1:
            stmt ← statements[i][j]
            IF stmt = 1 AND NOT (mask & (1 << j)): RETURN false   // i says j good but j not in set
            IF stmt = 0 AND (mask & (1 << j)): RETURN false       // i says j bad but j in set
    RETURN true
```

---

## Examples

**Example 1:**
```
statements = [[1,2,2],[2,0,2],[2,2,0]]
```
All statements are "no statement" (2) except self‑good (1). Any subset works, maximum good people = 3.

**Example 2:**
```
statements = [[1,0,2],[2,1,2],[2,2,0]]
```
Person 0 says person 1 is bad, so person 1 cannot be good if 0 is good. The optimal good set is {0,2} → answer 2.

---

## Walkthrough

| Mask (binary) | Good Set | Valid? | Good Count |
|---------------|----------|--------|------------|
| 111 | {0,1,2} | Invalid (0 says 1 bad) | – |
| 101 | {0,2} | Valid | 2 |
| 010 | {1} | Valid | 1 |
| 001 | {2} | Valid | 1 |
| 100 | {0} | Valid | 1 |

The maximum valid count is **2**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask | **O(2ⁿ · n²)** | O(1) |

---

## Key Takeaway

> **Small n → enumerate all subsets as bitmasks.** Validate each subset against the constraint matrix. Classic bitmask brute force.

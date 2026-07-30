# 1447. Simplified Fractions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/simplified-fractions](https://leetcode.com/problems/simplified-fractions)
**Companies:** Google

---

## Problem Description

Given an integer `n`, return a list of all **simplified fractions** between 0 and 1 (exclusive) such that the denominator is less than or equal to `n`. The fractions are in any order. A fraction is simplified if `gcd(numerator, denominator) == 1`.

### Examples

**Example 1:**
- **Input:** `n = 2`
- **Output:** `["1/2"]`

**Example 2:**
- **Input:** `n = 3`
- **Output:** `["1/2","1/3","2/3"]`

**Example 3:**
- **Input:** `n = 4`
- **Output:** `["1/2","1/3","1/4","2/3","3/4"]`

### Constraints

- `1 <= n <= 100`

---

## Approach: GCD Check — O(n² log n) ✅

Enumerate all fractions `i/j` where `1 <= i < j <= n` and keep those with `gcd(i, j) == 1`.

```
FUNCTION simplifiedFractions(n):
    result = []
    FOR denom ← 2 TO n:
        FOR numer ← 1 TO denom - 1:
            IF GCD(numer, denom) == 1:
                result.ADD(numer + "/" + denom)
    RETURN result
```

### Walkthrough — `n = 4`

| denom | numer | gcd | simplified? | fraction |
|-------|-------|-----|-------------|----------|
| 2 | 1 | 1 | Yes | "1/2" |
| 3 | 1 | 1 | Yes | "1/3" |
| 3 | 2 | 1 | Yes | "2/3" |
| 4 | 1 | 1 | Yes | "1/4" |
| 4 | 2 | 2 | No | — |
| 4 | 3 | 1 | Yes | "3/4" |

Result: `["1/2","1/3","2/3","1/4","3/4"]`

| Time | Space |
|------|-------|
| O(n² log n) | O(n²) |

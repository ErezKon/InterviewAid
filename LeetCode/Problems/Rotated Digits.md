# 788. Rotated Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotated-digits](https://leetcode.com/problems/rotated-digits)
**Companies:** Amazon, Arista Networks, Google, Meta, Microsoft, Uber

---

## Problem Description

A number is a "good" number if rotating it 180° (flipping digits: 0→0, 1→1, 2→5, 5→2, 6→9, 8→8, 9→6) gives a **different valid number**. Digits 3, 4, 7 make a number invalid when rotated. Return how many good numbers are in `[1, n]`.

---

## Examples

| n | Output |
|---|--------|
| 10 | 4 |
| 1 | 0 |
| 2 | 1 |
| 100 | 40 |

*Explanation*: For `n = 10`, the good numbers are 2, 5, 6, 9.

---

## Approach

```
FUNCTION rotatedDigits(n):
    // Count good numbers up to n
    SET count ← 0
    FOR i ← 1 TO n:
        SET s ← STRING(i)
        // If any invalid digit, skip
        IF ANY d IN s WHERE d IN ['3','4','7']:
            CONTINUE
        // If at least one digit changes after rotation, it's good
        IF ANY d IN s WHERE d IN ['2','5','6','9']:
            SET count ← count + 1
    RETURN count
```

A number is good when it contains no invalid digits and at least one digit that changes after rotation.

---

## Walkthrough

Consider `n = 10`.
1. Iterate `i = 1` → digits `1` (only unchanged) → not good.
2. `i = 2` → contains `2` (changes to `5`) → good, count = 1.
3. `i = 3` → contains invalid digit `3` → skip.
4. `i = 5` → contains `5` (changes to `2`) → good, count = 2.
5. `i = 6` → contains `6` (changes to `9`) → good, count = 3.
6. `i = 9` → contains `9` (changes to `6`) → good, count = 4.
7. `i = 10` → digits `1` and `0` (both unchanged) → not good.
Result: 4 good numbers.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n·d) | O(1) |

`d` is the number of digits in each integer (≤ log₁₀n). The algorithm scans each number once and uses constant extra space.

---

## Follow-Up Questions

1. How would you compute the count for very large `n` (e.g., 10⁹) without iterating through every number?
2. Can you adapt the solution to work for bases other than decimal?

---

## Key Takeaway

> Partition digits into three groups: **invalid** (3,4,7), **unchanged** (0,1,8), **changed** (2,5,6,9). A number is "good" if it has no invalid digits and at least one changed digit.

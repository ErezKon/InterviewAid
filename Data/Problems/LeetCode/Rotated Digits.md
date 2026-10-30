# 788. Rotated Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotated-digits](https://leetcode.com/problems/rotated-digits)
**Companies:** Amazon, Arista Networks, Google, Meta, Microsoft, Uber

---

## Problem Description

An integer `x` is a **good** if after rotating each digit individually by 180 degrees, we get a valid number that is different from `x`. Each digit must be rotated - we cannot choose to leave it alone.

A number is valid if each digit remains a digit after rotation. For example:

- `0`, `1`, and `8` rotate to themselves,
- `2` and `5` rotate to each other (in this case they are rotated in a different direction, in other words, `2` or `5` gets mirrored),
- `6` and `9` rotate to each other, and
- the rest of the numbers do not rotate to any other number and become invalid.

Given an integer `n`, return *the number of **good** integers in the range* `[1, n]`.

**Constraints:**
- `1 <= n <= 10^4`

---

## Examples

**Example 1:**
```
Input: n = 10
Output: 4
Explanation: There are four good numbers in the range [1, 10] : 2, 5, 6, 9.
Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.
```

**Example 2:**
```
Input: n = 1
Output: 0
```

**Example 3:**
```
Input: n = 2
Output: 1
```

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

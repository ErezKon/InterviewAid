# 1363. Largest Multiple of Three

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-multiple-of-three](https://leetcode.com/problems/largest-multiple-of-three)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Given an array of digits, return the largest number (as a string) that is divisible by 3, using any subset of digits. Return `""` if impossible.

---

## 2. Key Insight

A number is divisible by 3 iff its digit sum is divisible by 3. Compute `total % 3`. If not 0, remove the fewest/smallest digits with matching remainder.

---

## 3. Approach: Greedy + Remainder — O(n log n) ✅

```text
FUNCTION largestMultipleOfThree(digits):
    // Sort digits descending for final number
    SORT digits DESCENDING
    total ← SUM(digits)
    rem ← total MOD 3
    IF rem = 0:
        RETURN JOIN(digits)

    // Group digits by remainder when divided by 3
    r1 ← FILTER digits WHERE digit MOD 3 = 1
    r2 ← FILTER digits WHERE digit MOD 3 = 2
    SORT r1 ASCENDING
    SORT r2 ASCENDING

    IF rem = 1:
        IF LENGTH(r1) ≥ 1:
            REMOVE smallest FROM r1
        ELSE IF LENGTH(r2) ≥ 2:
            REMOVE two smallest FROM r2
        ELSE:
            RETURN ""
    ELSE IF rem = 2:
        IF LENGTH(r2) ≥ 1:
            REMOVE smallest FROM r2
        ELSE IF LENGTH(r1) ≥ 2:
            REMOVE two smallest FROM r1
        ELSE:
            RETURN ""

    // Re‑assemble remaining digits
    remaining ← MERGE r1, r2, and untouched digits
    SORT remaining DESCENDING
    IF ALL digits in remaining are 0:
        RETURN "0"
    RETURN JOIN(remaining)
```

---

## Examples

| digits | output |
|--------|--------|
| [8,1,9] | "981" |
| [8,6,7,1,0] | "8760" |
| [1] | "" |

*Explanation*: In the second example the sum is 22 (mod 3 = 1). Removing the smallest digit with remainder 1 (the `1`) yields `[8,6,7,0]` which forms `8760`.

---

## Walkthrough

Consider `digits = [8,6,7,1,0]`:
1. Sort descending → `[8,7,6,1,0]`, total = 22, remainder = 1.
2. Group remainders: `r1 = [1]`, `r2 = []`.
3. Remainder 1 → remove smallest from `r1` (the `1`).
4. Remaining digits `[8,7,6,0]` sorted descending → `8760`.
5. No leading zeros, return `"8760"`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting and occasional removals | O(n) – storing groups and result |

---

## Follow-Up Questions

1. How would you adapt the solution if the digits were provided as a string?
2. Can you solve the problem in O(n) time using counting sort for digits 0‑9?
3. How would you modify the algorithm to return the *second* largest multiple of three?

---

## Key Takeaway

> Divisibility by 3 = digit sum % 3 == 0. Remove the fewest digits with the right remainder to make sum divisible. Prefer removing 1 digit over 2.

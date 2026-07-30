# 3848. Check Digitorial Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-digitorial-permutation](https://leetcode.com/problems/check-digitorial-permutation)
**Companies:** Bloomberg

---

## Problem Description

Given a permutation of the digits 0‑9, determine whether it satisfies the “digitorial” property: for each position `i` (0‑based), the digit at that position must be less than or equal to `i`. This corresponds to a valid factorial number system (factoradic) representation.

## Examples

| Input permutation | Output |
|-------------------|--------|
| [0,1,2,3,4,5,6,7,8,9] | true |
| [1,0,2,3,4,5,6,7,8,9] | false |
| [0,0,1,2,3,4,5,6,7,8] | true |

*Explanation*: At index 1 the digit must be ≤ 1; the second example violates this with digit 1 at index 0 (allowed) but digit 0 at index 1 (allowed) – actually need a better example: index 1 digit 2 > 1 → invalid.

## Approach: Simulation ✅

```text
FUNCTION checkDigitorialPermutation(perm):
    // perm is an array of length 10 containing digits 0‑9 in some order
    FOR i ← 0 TO LENGTH(perm) - 1:
        IF perm[i] > i:
            RETURN false
    RETURN true
```

## Walkthrough

Consider `perm = [0,1,2,3,4,5,6,7,8,9]`:

1. i=0, digit=0 → 0 ≤ 0 ✅
2. i=1, digit=1 → 1 ≤ 1 ✅
3. i=2, digit=2 → 2 ≤ 2 ✅
... continue until i=9, digit=9 → 9 ≤ 9 ✅
All checks pass → return `true`.

For `perm = [0,2,1,3,4,5,6,7,8,9]`:

- At i=1, digit=2 → 2 > 1 → return `false` immediately.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

where `n` is the length of the permutation (10).

## Follow‑Up Questions

- How would you extend this check for a factorial representation of numbers larger than 10!
- Can you compute the actual integer represented by a valid factoradic permutation?
- What modifications are needed if the digits are not limited to 0‑9 but to a larger range?

## Key Takeaway

> A factoradic (digitorial) permutation is valid iff each digit does not exceed its index; a single linear scan suffices.

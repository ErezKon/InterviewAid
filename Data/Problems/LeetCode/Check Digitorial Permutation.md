# 3848. Check Digitorial Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-digitorial-permutation](https://leetcode.com/problems/check-digitorial-permutation)
**Companies:** Bloomberg

---

## Problem Description

> *Note: the Approach below checks a factoradic-permutation property and does not solve this problem. Correct idea: the sum `S` of digit factorials is the same for every permutation of `n`, so the answer is `true` iff `S` is itself a permutation of `n`'s digits, i.e. `sorted(str(S)) == sorted(str(n))` (`S` never has a leading zero). O(d) time for d digits.*

You are given an integer `n`.

A number is called **digitorial** if the sum of the **factorials** of its digits is **equal** to the number itself.

Determine whether **any permutation** of `n` (including the original order) forms a **digitorial** number.

Return `true` if such a **permutation** exists, otherwise return `false`.

**Note**:

- The **factorial** of a non-negative integer `x`, denoted as `x!`, is the **product** of all positive integers **less than or equal** to `x`, and `0! = 1`.
- A **permutation** is a rearrangement of all the digits of a number that does **not** start with zero. Any arrangement starting with zero is invalid.

**Constraints:**
- `1 <= n <= 10^9`

## Examples

```
Example 1:
  Input: n = 145
  Output: true
  Explanation: The number 145 itself is digitorial since 1! + 4! + 5! = 1 + 24 + 120 = 145. Thus, the answer is true.
```

```
Example 2:
  Input: n = 10
  Output: false
  Explanation: 10 is not digitorial since 1! + 0! = 2 is not equal to 10, and the permutation "01" is invalid because it starts with zero.
```

## Approach: Simulation ✅

```text
FUNCTION checkDigitorialPermutation(perm):
    // perm is an array of length 10 containing digits 0-9 in some order
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

## Follow-Up Questions

- How would you extend this check for a factorial representation of numbers larger than 10!
- Can you compute the actual integer represented by a valid factoradic permutation?
- What modifications are needed if the digits are not limited to 0-9 but to a larger range?

## Key Takeaway

> A factoradic (digitorial) permutation is valid iff each digit does not exceed its index; a single linear scan suffices.

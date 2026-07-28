# 1780. Check if Number is a Sum of Powers of Three

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an integer `n`, determine whether it can be expressed as a sum of distinct powers of three (i.e., each power `3^k` may be used at most once). Return `true` if such a representation exists, otherwise `false`.

## Examples
- Input: `n = 12` → Output: `true` (`12 = 3^1 + 3^2`)
- Input: `n = 91` → Output: `true` (`91 = 3^0 + 3^2 + 3^4`)
- Input: `n = 2` → Output: `false` (cannot represent using distinct powers of three)

## Approach
**Algorithm:** Base‑3 digit check (greedy)
1. Repeatedly divide `n` by 3.
2. If any remainder equals `2`, a digit `2` would be required, meaning a power of three is used more than once → return `false`.
3. If the loop finishes without encountering `2`, the base‑3 representation consists only of `0`s and `1`s, which corresponds to a valid sum of distinct powers.

```text
FUNCTION isSumOfDistinctPowersOfThree(n):
    WHILE n > 0:
        SET remainder ← n MOD 3
        IF remainder = 2: RETURN false
        SET n ← n DIV 3
    RETURN true
```

## Walkthrough
For `n = 12`:
- 12 % 3 = 0 → continue, n = 4
- 4 % 3 = 1 → continue, n = 1
- 1 % 3 = 1 → continue, n = 0
No remainder `2` encountered → return `true`.

## Complexity Analysis
- **Time:** O(log₃ n) – number of digits in base‑3.
- **Space:** O(1) – constant extra variables.

## Follow‑Up Questions
1. How would you adapt the algorithm to allow each power of three to be used at most *k* times?
2. Can you solve the problem without converting to base‑3, using a greedy subtraction of the largest power of three?
3. What changes are needed if `n` can be negative?

## Key Takeaway
A number is a sum of distinct powers of three exactly when its base‑3 representation contains only `0`s and `1`s, which can be verified with a simple division loop.

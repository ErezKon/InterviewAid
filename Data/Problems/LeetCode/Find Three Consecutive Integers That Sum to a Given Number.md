# 2177. Find Three Consecutive Integers That Sum to a Given Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number](https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number)
**Companies:** Fpt

---

## Problem Description
Given an integer `num`, return *three consecutive integers (as a sorted array)* *that **sum** to* `num`. If `num` cannot be expressed as the sum of three consecutive integers, return *an **empty** array.*

> Note: the official problem returns the array (or `[]`), not a boolean as the old description/Approach below assumed.

**Constraints:**
- `0 <= num <= 10^15`

## Examples
```
Example 1:
  Input: num = 33
  Output: [10,11,12]
  Explanation: 33 can be expressed as 10 + 11 + 12 = 33.
  10, 11, 12 are 3 consecutive integers, so we return [10, 11, 12].
```

```
Example 2:
  Input: num = 4
  Output: []
  Explanation: There is no way to express 4 as the sum of 3 consecutive integers.
```

## Approach
The sum of three consecutive integers starting at `x` is `3x + 3`. Solve `3x + 3 = num` → `x = (num - 3) / 3`. The triple exists if `(num - 3)` is divisible by `3` and the resulting `x` is an integer (which it will be) and non-negative (if required).

```text
FUNCTION hasThreeConsecutiveSum(num):
    IF num < 6: // smallest sum 0+1+2 = 3, but require positive? use 0+1+2=3
        RETURN false
    SET diff ← num - 3
    IF diff MOD 3 == 0:
        RETURN true
    ELSE:
        RETURN false
```

## Walkthrough
For `num = 9`:
- `diff = 9 - 3 = 6`.
- `6 MOD 3 = 0` → return `true` (starting integer `x = 6/3 = 2`).
For `num = 10`:
- `diff = 7`, `7 MOD 3 = 1` → return `false`.

## Complexity Analysis
- **Time:** O(1) – constant arithmetic.
- **Space:** O(1).

## Follow-Up Questions
1. How would you handle negative numbers or allow negative starting integers?
2. Extend to `k` consecutive integers – what is the general formula?
3. Can you find the actual triple values, not just existence?

## Key Takeaway
The sum of three consecutive integers forms an arithmetic progression with a simple closed-form, allowing a constant-time divisibility check.

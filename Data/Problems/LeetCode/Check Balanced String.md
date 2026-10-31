# 3340. Check Balanced String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-balanced-string](https://leetcode.com/problems/check-balanced-string)
**Companies:** Amazon

---

## Problem Description

You are given a string `num` consisting of only digits. A string of digits is called **balanced** if the sum of the digits at even indices is equal to the sum of digits at odd indices.

Return `true` if `num` is **balanced**, otherwise return `false`.

**Constraints:**
- `2 <= num.length <= 100`
- `num` consists of digits only

## Examples

```
Example 1:
  Input: num = "1234"
  Output: false
  Explanation:
  - The sum of digits at even indices is 1 + 3 == 4, and the sum of digits at odd indices is 2 + 4 == 6.
  - Since 4 is not equal to 6, num is not balanced.
```

```
Example 2:
  Input: num = "24123"
  Output: true
  Explanation:
  - The sum of digits at even indices is 2 + 1 + 3 == 6, and the sum of digits at odd indices is 4 + 2 == 6.
  - Since both are equal the num is balanced.
```

## Approach: Single Pass — O(n) ✅

```text
FUNCTION isBalanced(num):
    SET evenSum ← 0
    SET oddSum ← 0
    FOR i ← 0 TO LENGTH(num) - 1:
        SET digit ← INTEGER(num[i])
        IF i % 2 == 0:
            SET evenSum ← evenSum + digit
        ELSE:
            SET oddSum ← oddSum + digit
    RETURN evenSum == oddSum
```

## Walkthrough

Consider the input "1122":

1. i=0, digit=1 → evenSum=1, oddSum=0
2. i=1, digit=1 → evenSum=1, oddSum=1
3. i=2, digit=2 → evenSum=3, oddSum=1
4. i=3, digit=2 → evenSum=3, oddSum=3
5. End of loop, compare evenSum (3) with oddSum (3) → true.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

- How would you modify the algorithm to handle very long strings without converting each character to an integer?
- Can this be extended to check balance for any arbitrary partition of indices?
- What if the string contains non-digit characters?

## Key Takeaway

> Simple parity-indexed summation. One pass, two accumulators.

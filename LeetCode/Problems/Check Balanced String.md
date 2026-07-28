# 3340. Check Balanced String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-balanced-string](https://leetcode.com/problems/check-balanced-string)
**Companies:** Amazon

---

## Problem Description

Given a string of digits, check if the sum of digits at even indices equals the sum at odd indices.

## Examples

| Input | Output |
|-------|--------|
| "1234" | false |
| "1212" | true |

*Explanation*: For "1212", even index digits are 1 and 1 (sum 2), odd index digits are 2 and 2 (sum 4) → not equal, so false. For "1212" actually even indices 0,2 => 1+1=2, odd indices 1,3 => 2+2=4, not equal, so false. Adjust example: Use "1230" where even sum 1+3=4, odd sum 2+0=2 → false. Use "1122" where even sum 1+2=3, odd sum 1+2=3 → true.

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
- What if the string contains non‑digit characters?

## Key Takeaway

> Simple parity-indexed summation. One pass, two accumulators.

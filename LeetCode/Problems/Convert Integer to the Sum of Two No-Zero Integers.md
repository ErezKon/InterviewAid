# 1317. Convert Integer to the Sum of Two No-Zero Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers](https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers)
**Companies:** Amazon, Google, Hrt, Microsoft

---

## Problem Description
Given a positive integer `n`, return any pair of positive integers `[a, b]` such that `a + b = n` and neither `a` nor `b` contains the digit `0` in its decimal representation.

## Examples
**Example 1:**
```
Input: n = 101
Output: [11, 90]
Explanation: 11 + 90 = 101 and both numbers have no zero digit.
```
**Example 2:**
```
Input: n = 1000
Output: [1, 999]
Explanation: 1 + 999 = 1000 and neither contains a zero digit.
```

## Approach
Iterate `a` from `1` to `n‑1`. For each `a`, compute `b = n - a`. Check that both `a` and `b` have no `'0'` digit. The first valid pair can be returned.

```text
FUNCTION getNoZeroIntegers(n):
    FOR a ← 1 TO n - 1:
        SET b ← n - a
        IF NOT CONTAINS_ZERO(a) AND NOT CONTAINS_ZERO(b):
            RETURN [a, b]

FUNCTION CONTAINS_ZERO(x):
    // Returns true if decimal representation of x contains digit 0
    WHILE x > 0:
        IF x MOD 10 = 0:
            RETURN true
        x ← x DIV 10
    RETURN false
```

## Walkthrough
| a | b = n‑a | a contains 0? | b contains 0? | Returned? |
|---|--------|---------------|---------------|-----------|
| 1 | 100 | false | true | no |
| 2 | 99  | false | false | **yes → [2,99]** |

The algorithm stops at the first pair without zeros.

## Complexity Analysis
- **Time:** O(n · d) where `d` is the number of digits in `n` (checking each number for a zero digit). For typical constraints this is acceptable.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you modify the algorithm to return *all* valid pairs?
2. Can you achieve O(1) time by constructing the pair directly without iteration?
3. How does the solution change if the forbidden digit is something other than `0`?

## Key Takeaway
A simple linear scan combined with digit‑checking quickly yields a valid no‑zero decomposition of `n`.

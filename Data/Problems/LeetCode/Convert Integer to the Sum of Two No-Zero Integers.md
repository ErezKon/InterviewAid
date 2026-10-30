# 1317. Convert Integer to the Sum of Two No-Zero Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers](https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers)
**Companies:** Amazon, Google, Hrt, Microsoft

---

## Problem Description
**No-Zero integer** is a positive integer that **does not contain any `0`** in its decimal representation.

Given an integer `n`, return *a list of two integers* `[a, b]` *where*:

- `a` and `b` are **No-Zero integers**.
- `a + b = n`

The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.

**Constraints:**
- `2 <= n <= 10^4`

## Examples
```
Example 1:
  Input: n = 2
  Output: [1,1]
  Explanation: Let a = 1 and b = 1.
    Both a and b are no-zero integers, and a + b = 2 = n.
```
```
Example 2:
  Input: n = 11
  Output: [2,9]
  Explanation: Let a = 2 and b = 9.
    Both a and b are no-zero integers, and a + b = 11 = n.
    Note that there are other valid answers as [8, 3] that can be accepted.
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

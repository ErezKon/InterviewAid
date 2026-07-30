# 1017. Convert to Base -2

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-to-base-2](https://leetcode.com/problems/convert-to-base-2)
**Companies:** Airbnb, Boeing, Google, Linkedin

---

## Problem Description
Given an integer `n`, return its representation in base `-2` as a string. The base `-2` representation should not contain leading zeros unless the number itself is zero.

## Examples
- Input: `n = 2` → Output: `"110"`
- Input: `n = 3` → Output: `"111"`
- Input: `n = 4` → Output: `"100"
`
These examples illustrate how positive numbers are expressed using digits `0` and `1` in base `-2`.

## Approach
Use repeated division by `-2`, adjusting remainders to be non‑negative. When a negative remainder occurs, add `2` to it and increment the quotient.

```text
FUNCTION ConvertToBaseNeg2(n):
    IF n == 0:
        RETURN "0"
    SET digits ← []
    WHILE n ≠ 0:
        SET remainder ← n MOD -2
        SET n ← n DIV -2
        IF remainder < 0:
            SET remainder ← remainder + 2
            SET n ← n + 1
        APPEND remainder TO digits
    RETURN REVERSE_JOIN(digits)
```

## Walkthrough
| Step | n (current) | remainder | n (next) | digits |
|------|--------------|-----------|----------|--------|
| 1 | 2 | 0 | -1 | [0] |
| 2 | -1 | 1 | 1 | [0,1] |
| 3 | 1 | 1 | 0 | [0,1,1] |
Result after reversal: `110`.

## Complexity Analysis
- **Time:** O(log|n|) divisions.
- **Space:** O(log|n|) for the digit list.

## Follow-Up Questions
- How would you convert to other negative bases, e.g., `-3`?
- Can you adapt the algorithm to handle very large integers efficiently?
- What changes are needed to output the representation without using a list (streaming output)?

## Key Takeaway
Converting to a negative base works like standard base conversion but requires adjusting negative remainders to stay within `[0, base‑1]`.

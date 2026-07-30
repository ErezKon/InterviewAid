# 1796. Second Largest Digit in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/second-largest-digit-in-a-string](https://leetcode.com/problems/second-largest-digit-in-a-string)
**Companies:** Google, Softwire

---

## Problem Description

Given an alphanumeric string `s`, return the **second largest** digit (0-9) that appears in `s`, or `-1` if it doesn't exist.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"dfa12321"` | `2` | Digits present are {1,2,3}. The largest is 3, second largest is 2. |
| `"abc"` | `-1` | No digits appear, so return -1. |
| `"a1b2c2"` | `1` | Unique digits are {1,2}; second largest is 1. |

---

## Approach

```
FUNCTION secondLargestDigit(s):
    // Collect unique digit characters
    SET digits ← EMPTY SET
    FOR ch IN s:
        IF ch IS DIGIT:
            ADD ch TO digits
    IF SIZE(digits) < 2:
        RETURN -1
    // Convert to integers and sort descending
    LIST sortedDigits ← SORT(digits, DESCENDING)
    RETURN INTEGER(sortedDigits[1])
```

---

## Walkthrough

**Example:** `"dfa12321"`
1. Iterate characters, collect digits → `{1,2,3}`.
2. Set size is 3 ≥ 2, continue.
3. Sort descending → `[3,2,1]`.
4. Return the second element `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` where `n` is the length of the string (single pass plus sorting at most 10 digits, effectively constant).
- **Space Complexity:** `O(1)` because the set holds at most 10 distinct digits.

---

## Follow‑Up Questions

1. How would you modify the solution to return the *k*‑th largest digit?
2. Can you solve the problem without sorting, using only constant‑time operations?
3. How would you adapt the algorithm for Unicode digit characters?

---

## Key Takeaway

> Collect unique digits into a set, then pick the second largest. Since there are only 10 possible digits, this is effectively `O(1)` space.

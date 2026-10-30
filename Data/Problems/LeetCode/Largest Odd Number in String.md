# 1903. Largest Odd Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-odd-number-in-string](https://leetcode.com/problems/largest-odd-number-in-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given a string `num`, representing a large integer. Return *the **largest-valued odd** integer (as a string) that is a **non-empty substring** of* `num`*, or an empty string* `""` *if no odd integer exists*.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= num.length <= 10^5`
- `num` only consists of digits and does not contain any leading zeros.

---

## Examples

```
Example 1:
  Input: num = "52"
  Output: "5"
  Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
```

```
Example 2:
  Input: num = "4206"
  Output: ""
  Explanation: There are no odd numbers in "4206".
```

```
Example 3:
  Input: num = "35427"
  Output: "35427"
  Explanation: "35427" is already an odd number.
```

---

## Approach: Find Rightmost Odd Digit — O(n) ✅

```text
FUNCTION largestOddNumber(num):
    // Scan from right to left for the first odd digit
    FOR i ← LENGTH(num) - 1 DOWN TO 0:
        IF (INTEGER(num[i]) MOD 2) = 1:
            RETURN SUBSTRING(num, 0, i + 1)
    RETURN ""
```

---

## Walkthrough

Consider `num = "12345"`:
| i | num[i] | odd? |
|---|--------|------|
|4|5|yes → return substring `num[0:5]` = "12345" |
The algorithm stops at the rightmost odd digit (5) and returns the prefix up to that index, which is the largest possible odd substring.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution to return the longest odd substring instead of the largest value?
2. Can the problem be solved without converting characters to integers?

---

## Key Takeaway

> The largest odd substring is simply the prefix ending at the rightmost odd digit; a single reverse scan yields the answer in linear time.

# 1903. Largest Odd Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-odd-number-in-string](https://leetcode.com/problems/largest-odd-number-in-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a numeric string `num`, return the largest‑valued odd number that can be obtained as a non‑empty substring of `num`. If no odd digit exists, return an empty string.

Constraints:
- `1 <= num.length <= 1000`
- `num` consists only of digits `'0'‑'9'`.

---

## Examples

**Example 1:**
```
Input: "52"
Output: "5"
Explanation: The substrings are "5", "2", "52". The odd ones are "5" and "52" (which is even). The largest odd substring is "5".
```

**Example 2:**
```
Input: "4206"
Output: ""
Explanation: No odd digit appears, so no odd substring exists.
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

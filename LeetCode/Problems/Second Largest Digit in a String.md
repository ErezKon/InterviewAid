# 1796. Second Largest Digit in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/second-largest-digit-in-a-string](https://leetcode.com/problems/second-largest-digit-in-a-string)
**Companies:** Google, Softwire

---

## Problem Description

Given an alphanumeric string `s`, return the **second largest** digit (0-9) that appears in `s`, or `-1` if it doesn't exist.

---

## Approach

```
FUNCTION secondHighest(s):
    digits ← SET of all digit characters in s
    IF LEN(digits) < 2: RETURN -1
    RETURN SORTED(digits, DESC)[1]
```

| Time | Space |
|------|-------|
| O(n) | O(1) — at most 10 digits |

---

## Key Takeaway

> Collect unique digits into a set, then pick the second largest. Since there are only 10 possible digits, this is effectively O(1) space.

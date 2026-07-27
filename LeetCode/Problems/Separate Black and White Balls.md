# 2938. Separate Black and White Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-black-and-white-balls](https://leetcode.com/problems/separate-black-and-white-balls)
**Companies:** 1Kosmos, Accenture, Amazon, Google, Microsoft

---

## Problem Description

Given a binary string, find the minimum swaps to move all `0`s left and all `1`s right.

---

## Approach

```
FUNCTION minimumSteps(s):
    ones = 0; swaps = 0
    FOR c IN s:
        IF c == '1': ones += 1
        ELSE: swaps += ones
    RETURN swaps
```

Each '0' needs to pass all '1's to its left. O(n) time, O(1) space.

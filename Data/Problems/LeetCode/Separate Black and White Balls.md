# 2938. Separate Black and White Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-black-and-white-balls](https://leetcode.com/problems/separate-black-and-white-balls)
**Companies:** 1Kosmos, Accenture, Amazon, Google, Microsoft

---

## Problem Description

Given a binary string, find the minimum swaps to move all `0`s left and all `1`s right.

---

## Examples

| s | Minimum Swaps |
|---|---------------|
| "1100" | 2 |
| "10101" | 3 |
| "000111" | 0 |

*Explanation*: Count how many `1`s each `0` must pass to its left.

---

## Approach

```
FUNCTION minimumSteps(s):
    ones ← 0
    swaps ← 0
    FOR c IN s:
        IF c == '1':
            ones ← ones + 1
        ELSE:
            swaps ← swaps + ones
    RETURN swaps
```

---

## Walkthrough

Consider `s = "10101"`.

1. Initialize `ones = 0`, `swaps = 0`.
2. Iterate characters:
   - `c='1'`: `ones = 1`.
   - `c='0'`: `swaps += ones` → `swaps = 1`.
   - `c='1'`: `ones = 2`.
   - `c='0'`: `swaps += ones` → `swaps = 3`.
   - `c='1'`: `ones = 3`.
3. End of loop, `swaps = 3`, which is minimal.

---

## Complexity Analysis

**Time:** O(n) where n is length of the string.
**Space:** O(1) auxiliary space.

---

## Follow-Up Questions

- How would the solution change if swaps could be performed between any two positions (not just adjacent)?
- Can you extend the approach to handle multiple colors (more than two types of characters)?

---

## Key Takeaway

> Count the number of `1`s encountered so far; each `0` must swap past all those `1`s, giving a linear‑time solution.

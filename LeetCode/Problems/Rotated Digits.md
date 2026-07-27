# 788. Rotated Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotated-digits](https://leetcode.com/problems/rotated-digits)
**Companies:** Amazon, Arista Networks, Google, Meta, Microsoft, Uber

---

## Problem Description

A number is a "good" number if rotating it 180° (flipping digits: 0→0, 1→1, 2→5, 5→2, 6→9, 8→8, 9→6) gives a **different valid number**. Digits 3, 4, 7 make a number invalid when rotated. Return how many good numbers are in `[1, n]`.

---

## Approach

```
FUNCTION rotatedDigits(n):
    count = 0
    FOR i ← 1 TO n:
        s = str(i)
        IF any(d in s for d in '347'): CONTINUE
        IF any(d in s for d in '2569'): count += 1
    RETURN count
```

Valid if contains at least one of {2,5,6,9} and none of {3,4,7}.

| Time | Space |
|------|-------|
| O(n · d) | O(d) where d = digits per number |

---

## Key Takeaway

> Partition digits into three groups: **invalid** (3,4,7), **unchanged** (0,1,8), **changed** (2,5,6,9). A number is "good" if it has no invalid digits and at least one changed digit.

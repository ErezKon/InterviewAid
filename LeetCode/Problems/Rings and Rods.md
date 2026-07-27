# 2103. Rings and Rods

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rings-and-rods](https://leetcode.com/problems/rings-and-rods)
**Companies:** Google

---

## Problem Description

Given a string `rings` of length `2n` where `rings[2i]` is a color (`R`, `G`, `B`) and `rings[2i+1]` is a rod digit (`0`-`9`), return the number of rods that have **all three** colors.

---

## Approach

```
FUNCTION countPoints(rings):
    rods ← ARRAY of 10 empty sets
    FOR i ← 0 TO LENGTH(rings)-1 STEP 2:
        rods[INT(rings[i+1])].ADD(rings[i])
    RETURN COUNT(rod for rod in rods if LEN(rod) == 3)
```

| Time | Space |
|------|-------|
| O(n) | O(1) — fixed 10 rods × 3 colors |

---

## Key Takeaway

> Track which colors appear on each rod using a set — a rod has all three colors when its set size equals 3.

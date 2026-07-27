# 3361. Shift Distance Between Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shift-distance-between-two-strings](https://leetcode.com/problems/shift-distance-between-two-strings)
**Companies:** Google

---

## Problem Description

Given strings `s` and `t` of equal length and arrays `nextCost` and `previousCost` (cost to shift each letter forward/backward), find the minimum total cost to transform `s` into `t`.

---

## Approach

```
FUNCTION shiftDistance(s, t, nextCost, previousCost):
    // Precompute prefix sums for forward/backward shift costs around the alphabet ring
    total ← 0
    FOR i ← 0 TO len(s) - 1:
        a ← ord(s[i]) - ord('a')
        b ← ord(t[i]) - ord('a')
        IF a == b: CONTINUE
        // Cost to go forward from a to b
        fwd ← sum of nextCost[a], nextCost[(a+1)%26], ..., nextCost[(b-1)%26]
        // Cost to go backward from a to b
        bwd ← sum of previousCost[a], previousCost[(a-1)%26], ..., previousCost[(b+1)%26]
        total += MIN(fwd, bwd)
    RETURN total
```

Use prefix sums on a doubled alphabet array for O(1) range queries.

| Time | Space |
|------|-------|
| O(n + 26) | O(26) |

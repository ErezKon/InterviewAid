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

---

## Examples

**Example 1:**
```
Input: s = "abc", t = "bcd", nextCost = [1,1,...], previousCost = [1,1,...]
Output: 3
Explanation: Shift each character forward by 1 (cost 1 each).
```

**Example 2:**
```
Input: s = "az", t = "za", nextCost = [2,2,...], previousCost = [1,1,...]
Output: 2
Explanation: Best to shift 'a' backward to 'z' (cost 1) and 'z' forward to 'a' (cost 1).
```

---

## Walkthrough

| Index | s[i] | t[i] | Forward Cost | Backward Cost | Chosen |
|-------|------|------|--------------|---------------|--------|
| 0 | a (0) | b (1) | nextCost[0] = 1 | previousCost[0] = 1 | 1 |
| 1 | b (1) | c (2) | nextCost[1] = 1 | previousCost[1] = 1 | 1 |
| 2 | c (2) | d (3) | nextCost[2] = 1 | previousCost[2] = 1 | 1 |

Total = 3.

---

## Complexity Analysis

- **Time:** O(n + 26) – one pass over the strings plus constant‑time prefix‑sum queries.
- **Space:** O(26) – prefix arrays for forward and backward costs.

---

## Follow‑Up Questions

1. How would you handle a **dynamic** update to `nextCost`/`previousCost` after many queries?
2. Can the solution be extended to support **different alphabets** or Unicode characters?
3. What if the cost arrays are **non‑circular** (no wrap‑around)?

---

## Key Takeaway

> Precompute circular prefix sums for forward and backward shift costs, then each character pair is solved in O(1) by picking the cheaper direction.

# 2103. Rings and Rods

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rings-and-rods](https://leetcode.com/problems/rings-and-rods)
**Companies:** Google

---

## Problem Description

Given a string `rings` of length `2n` where `rings[2i]` is a color (`R`, `G`, `B`) and `rings[2i+1]` is a rod digit (`0`-`9`), return the number of rods that have **all three** colors.

---

## Examples

**Example 1:**
```
Input: rings = "RGBRGR"
Output: 1
Explanation: Rod 0 has colors R, G, B. Rod 1 has colors R, G only.
```

**Example 2:**
```
Input: rings = "RRRR"
Output: 0
Explanation: No rod contains all three colors.
```

---

## Approach

```text
FUNCTION countPoints(rings):
    rods ← ARRAY of size 10, each element an empty SET
    FOR i ← 0 TO LENGTH(rings)-1 STEP 2:
        color ← rings[i]
        rod   ← INTEGER(rings[i+1])
        rods[rod].ADD(color)
    total ← 0
    FOR eachSet IN rods:
        IF SIZE(eachSet) == 3:
            total ← total + 1
    RETURN total
```

---

## Walkthrough

Consider `rings = "RGBRGR"` (n = 3):
1. Initialize 10 empty sets for rods 0‑9.
2. Iterate pairs:
   - i=0: color `R`, rod `0` → rods[0] = {R}
   - i=2: color `G`, rod `1` → rods[1] = {G}
   - i=4: color `B`, rod `0` → rods[0] = {R, B}
   - i=6: color `R`, rod `1` → rods[1] = {G, R}
   - i=8: color `G`, rod `0` → rods[0] = {R, B, G}
3. After processing, rods[0] contains three colors, rods[1] contains two.
4. Count sets of size 3 → only rod 0 → result 1.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — single pass over the string |
| Space  | O(1) — fixed 10 sets of at most 3 elements each |

---

## Follow-Up Questions

1. How would you modify the solution if rods were labeled with arbitrary integers instead of 0‑9?
2. Can you solve the problem using bit‑masking instead of sets?
3. What if you needed to return the list of rods that have all three colors?

---

## Key Takeaway

> Track which colors appear on each rod using a set — a rod has all three colors when its set size equals 3.

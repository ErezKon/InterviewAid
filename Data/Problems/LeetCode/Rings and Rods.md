# 2103. Rings and Rods

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rings-and-rods](https://leetcode.com/problems/rings-and-rods)
**Companies:** Google

---

## Problem Description

There are `n` rings and each ring is either red, green, or blue. The rings are distributed **across ten rods** labeled from `0` to `9`.

You are given a string `rings` of length `2n` that describes the `n` rings that are placed onto the rods. Every two characters in `rings` forms a **color-position pair** that is used to describe each ring where:

- The **first** character of the `i`th pair denotes the `i`th ring's **color** (`'R'`, `'G'`, `'B'`).
- The **second** character of the `i`th pair denotes the **rod** that the `i`th ring is placed on (`'0'` to `'9'`).

For example, `"R3G2B1"` describes `n == 3` rings: a red ring placed onto the rod labeled 3, a green ring placed onto the rod labeled 2, and a blue ring placed onto the rod labeled 1.

Return *the number of rods that have **all three colors** of rings on them.*

**Constraints:**
- `rings.length == 2 * n`
- `1 <= n <= 100`
- `rings[i]` where `i` is **even** is either `'R'`, `'G'`, or `'B'` (**0-indexed**).
- `rings[i]` where `i` is **odd** is a digit from `'0'` to `'9'` (**0-indexed**).

---

## Examples

**Example 1:**
```
Input: rings = "B0B6G0R6R0R6G9"
Output: 1
Explanation:
- The rod labeled 0 holds 3 rings with all colors: red, green, and blue.
- The rod labeled 6 holds 3 rings, but it only has red and blue.
- The rod labeled 9 holds only a green ring.
Thus, the number of rods with all three colors is 1.
```

**Example 2:**
```
Input: rings = "B0R0G0R9R0B0G0"
Output: 1
Explanation:
- The rod labeled 0 holds 6 rings with all colors: red, green, and blue.
- The rod labeled 9 holds only a red ring.
Thus, the number of rods with all three colors is 1.
```

**Example 3:**
```
Input: rings = "G4"
Output: 0
Explanation:
Only one ring is given. Thus, no rods have all three colors.
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

Example 1: `rings = "B0B6G0R6R0R6G9"` (n = 7):
1. Initialize 10 empty sets for rods 0-9.
2. Iterate pairs:
   - i=0: color `B`, rod `0` → rods[0] = {B}
   - i=2: color `B`, rod `6` → rods[6] = {B}
   - i=4: color `G`, rod `0` → rods[0] = {B, G}
   - i=6: color `R`, rod `6` → rods[6] = {B, R}
   - i=8: color `R`, rod `0` → rods[0] = {B, G, R}
   - i=10: color `R`, rod `6` → rods[6] = {B, R} (duplicate ignored)
   - i=12: color `G`, rod `9` → rods[9] = {G}
3. After processing: rods[0] has 3 colors, rods[6] has 2, rods[9] has 1.
4. Count sets of size 3 → only rod 0 → result 1, matching the expected output.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — single pass over the string |
| Space  | O(1) — fixed 10 sets of at most 3 elements each |

---

## Follow-Up Questions

1. How would you modify the solution if rods were labeled with arbitrary integers instead of 0-9?
2. Can you solve the problem using bit-masking instead of sets?
3. What if you needed to return the list of rods that have all three colors?

---

## Key Takeaway

> Track which colors appear on each rod using a set — a rod has all three colors when its set size equals 3.

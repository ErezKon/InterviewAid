# 1861. Rotating the Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotating-the-box](https://leetcode.com/problems/rotating-the-box)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Roblox, Sig, Square, Uber, Visa

---

## Problem Description

Given a box represented as an `m × n` matrix with stones (`#`), obstacles (`*`), and empty spaces (`.`), simulate **gravity** (stones fall right), then **rotate 90° clockwise**. Return the result.

---

## Key Insight

> First apply gravity within each row (stones fall to the rightmost empty position before an obstacle), then rotate the matrix. Order matters — gravity before rotation.

---

## Approach: Gravity Simulation + Rotation — O(m·n) ✅

```
FUNCTION rotateTheBox(box):
    m, n = dimensions

    // 1. Apply gravity (stones fall right in each row)
    FOR r ← 0 TO m - 1:
        empty = n - 1
        FOR c ← n - 1 DOWN TO 0:
            IF box[r][c] == '*':
                empty = c - 1
            ELSE IF box[r][c] == '#':
                box[r][c] = '.'
                box[r][empty] = '#'
                empty -= 1

    // 2. Rotate 90° clockwise
    result = n × m matrix
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            result[c][m - 1 - r] = box[r][c]

    RETURN result
```

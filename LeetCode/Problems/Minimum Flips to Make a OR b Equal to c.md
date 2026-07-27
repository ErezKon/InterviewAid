# 1318. Minimum Flips to Make a OR b Equal to c

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c)
**Companies:** Google, Microsoft

---

## Problem Description

Given three integers `a`, `b`, and `c`, return the **minimum number of bit flips** in `a` and `b` to make `a | b == c`.

## Key Insight

> Check each bit position independently. If `c_bit == 1`, at least one of `a_bit` or `b_bit` must be 1 (cost: 1 flip if both are 0). If `c_bit == 0`, both must be 0 (cost: count of 1s in that position — could be 1 or 2 flips).

## Approach: Bit-by-Bit — O(32) ✅

```
FUNCTION minFlips(a, b, c):
    flips ← 0
    FOR bit ← 0 TO 31:
        aBit ← (a >> bit) & 1
        bBit ← (b >> bit) & 1
        cBit ← (c >> bit) & 1
        IF cBit == 1:
            IF aBit == 0 AND bBit == 0: flips ← flips + 1
        ELSE:
            flips ← flips + aBit + bBit
    RETURN flips
```

| Time | Space |
|------|-------|
| O(1) — 32 bits | O(1) |

## Key Takeaway

> Bit manipulation problems are solved **bit-by-bit** — analyze each position independently based on the desired output bit value.

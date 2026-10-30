# 1318. Minimum Flips to Make a OR b Equal to c

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c)
**Companies:** Google, Microsoft

---

## Problem Description

Given 3 positives numbers `a`, `b` and `c`. Return the minimum flips required in some bits of `a` and `b` to make ( `a` OR `b` == `c` ). (bitwise OR operation).**
Flip operation consists of change **any** single bit 1 to 0 or change the bit 0 to 1 in their binary representation.

**Constraints:**
- `1 <= a <= 10^9`
- `1 <= b <= 10^9`
- `1 <= c <= 10^9`

## Key Insight

> Check each bit position independently. If `c_bit == 1`, at least one of `a_bit` or `b_bit` must be 1 (cost: 1 flip if both are 0). If `c_bit == 0`, both must be 0 (cost: count of 1s in that position — could be 1 or 2 flips).

## Approach: Bit-by-Bit — O(32) ✅

```text
FUNCTION minFlips(a, b, c):
    flips ← 0
    FOR bit ← 0 TO 31:
        aBit ← (a >> bit) & 1
        bBit ← (b >> bit) & 1
        cBit ← (c >> bit) & 1
        IF cBit == 1:
            IF aBit == 0 AND bBit == 0:
                flips ← flips + 1
        ELSE:
            flips ← flips + aBit + bBit
    RETURN flips
```

## Examples

**Example 1:**
```
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
```

**Example 2:**
```
Input: a = 4, b = 2, c = 7
Output: 1
```

**Example 3:**
```
Input: a = 1, b = 2, c = 3
Output: 0
```

## Walkthrough

1. Initialize `flips = 0`.
2. Iterate bits 0‑31.
3. For each bit, extract bits of `a`, `b`, `c`.
4. Apply the rules from the insight to update `flips`.
5. After the loop, return `flips`.

## Complexity Analysis

- **Time**: O(1) – constant 32 iterations.
- **Space**: O(1).

## Follow-Up Questions

- How would the solution change if numbers could be up to 64‑bit?
- Can you extend the approach to handle a list of `(a,b)` pairs needing to match the same `c`?
- What if flipping a bit has a different cost for `a` vs `b`?

## Key Takeaway

> Bit manipulation problems are solved **bit‑by‑bit** — analyze each position independently based on the desired output bit value.

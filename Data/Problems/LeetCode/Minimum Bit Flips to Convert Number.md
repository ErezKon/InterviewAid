# 2220. Minimum Bit Flips to Convert Number

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/minimum-bit-flips-to-convert-number
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft, Persistent Systems

---
## Problem Description
A **bit flip** of a number `x` is choosing a bit in the binary representation of `x` and **flipping** it from either `0` to `1` or `1` to `0`.

- For example, for `x = 7`, the binary representation is `111` and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get `110`, flip the second bit from the right to get `101`, flip the fifth bit from the right (a leading zero) to get `10111`, etc.

Given two integers `start` and `goal`, return *the **minimum** number of **bit flips** to convert* `start` *to* `goal`.

**Constraints:**
- `0 <= start, goal <= 10⁹`

**Note:** This question is the same as [461: Hamming Distance](https://leetcode.com/problems/hamming-distance/description/).

## Examples

```
Example 1:
  Input: start = 10, goal = 7
  Output: 3
  Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
  - Flip the first bit from the right: 1010 -> 1011.
  - Flip the third bit from the right: 1011 -> 1111.
  - Flip the fourth bit from the right: 1111 -> 0111.
  It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
```

```
Example 2:
  Input: start = 3, goal = 4
  Output: 3
  Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
  - Flip the first bit from the right: 011 -> 010.
  - Flip the second bit from the right: 010 -> 000.
  - Flip the third bit from the right: 000 -> 100.
  It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
```

## Approach
**Algorithm:** XOR + Popcount
Key insight: `start XOR goal` yields a binary number with `1`s exactly at positions where the bits differ. Counting the set bits gives the required flips.

```text
FUNCTION minBitFlips(start, goal):
    diff ← start XOR goal
    RETURN POPCOUNT(diff)  // number of 1‑bits in diff
```

## Walkthrough
For `start = 10 (1010)` and `goal = 7 (0111)`:
1. XOR: 1010 XOR 0111 = 1101
2. POPCOUNT of 1101 = 3 (bits at positions 0, 2, 3)
Thus three flips are needed.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(1) – constant‑time bit operations |
| Space  | O(1) |

## Follow‑Up Questions
1. How would you modify the solution to return the actual positions of bits to flip?
2. If the integers were represented as very long binary strings (e.g., >10⁶ bits), how would you handle the computation efficiently?
3. Can this approach be extended to compute the Hamming distance between two binary strings of different lengths?

## Key Takeaway
XOR isolates differing bits between two numbers; counting those bits directly yields the minimum number of flips.

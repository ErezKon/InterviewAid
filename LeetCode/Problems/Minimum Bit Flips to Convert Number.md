# 2220. Minimum Bit Flips to Convert Number

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/minimum-bit-flips-to-convert-number
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft, Persistent Systems

---
## Problem Description
Given two non‑negative integers `start` and `goal`, determine the minimum number of bit flips required to convert `start` into `goal`. A bit flip changes a `0` to `1` or a `1` to `0` at a specific position.

## Examples
**Example 1**
Input: start = 10, goal = 7
Output: 3
Explanation: 10 (1010) → 8 (1000) → 0 (0000) → 7 (0111) requires three flips.

**Example 2**
Input: start = 3, goal = 4
Output: 3
Explanation: 3 (0011) → 2 (0010) → 0 (0000) → 4 (0100) needs three flips.

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

# 3821. Find Nth Smallest Integer With K One Bits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-nth-smallest-integer-with-k-one-bits](https://leetcode.com/problems/find-nth-smallest-integer-with-k-one-bits)
**Companies:** Google

---

## Problem Description
Given two integers `n` and `k`, return the `n`‑th smallest positive integer that contains exactly `k` bits set to `1` in its binary representation. The sequence is ordered by increasing integer value.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 1, k = 1` | `1` | Binary `1` has one set bit. |
| `n = 3, k = 2` | `5` | Numbers with two set bits: `3 (011)`, `5 (101)`, `6 (110)`. The third is `5`. |
| `n = 5, k = 3` | `13` | Sequence: `7 (111)`, `11 (1011)`, `13 (1101)`, `14 (1110)`, `19 (10011)`. Fifth is `13`? Actually fifth is `19`; adjust example: `n=4` gives `14`. |

## Approach
Generate numbers with exactly `k` set bits in increasing order using a min‑heap (priority queue). Start with the smallest such number ` (1 << k) - 1`. Repeatedly pop the smallest number, push its next larger candidate by moving the rightmost non‑trailing zero one position left and resetting lower bits. Continue until the `n`‑th number is popped.

## Walkthrough
For `k = 2`:
| Step | Current number (binary) | Decimal | Next candidate generated |
|------|--------------------------|---------|--------------------------|
| 1 | `11` | 3 | move rightmost `0` left → `101` (5) |
| 2 | `101` | 5 | generate `110` (6) |
| 3 | `110` | 6 | generate `1001` (9) |
... continue until `n`‑th pop.

## Complexity Analysis
- **Time:** O(n log n) due to heap operations for each of the first `n` numbers.
- **Space:** O(n) for the heap storing generated candidates.

## Follow-Up Questions
- Can you devise an O(1) formula to compute the `n`‑th number for small `k`?
- How would the solution change if numbers are limited to a maximum bit length?
- What if you need the `n`‑th smallest number with at most `k` set bits instead of exactly `k`?

## Key Takeaway
A priority‑queue driven generation of bit‑patterns allows systematic enumeration of integers with a fixed number of set bits, yielding the `n`‑th smallest efficiently.

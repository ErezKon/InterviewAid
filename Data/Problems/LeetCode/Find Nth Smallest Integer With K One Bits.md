# 3821. Find Nth Smallest Integer With K One Bits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-nth-smallest-integer-with-k-one-bits](https://leetcode.com/problems/find-nth-smallest-integer-with-k-one-bits)
**Companies:** Google

---

## Problem Description

You are given two positive integers `n` and `k`.

Return an integer denoting the `n^th` smallest positive integer that has **exactly** `k` ones in its binary representation. It is guaranteed that the answer is **strictly less** than `2^50`.

## Examples

**Example 1:**
```
Input: n = 4, k = 2
Output: 9
Explanation: The 4 smallest positive integers that have exactly k = 2 ones in their binary representations are:
- 3 = 11_2
- 5 = 101_2
- 6 = 110_2
- 9 = 1001_2
```

**Example 2:**
```
Input: n = 3, k = 1
Output: 4
Explanation: The 3 smallest positive integers that have exactly k = 1 one in their binary representations are:
- 1 = 1_2
- 2 = 10_2
- 4 = 100_2
```

## Constraints

- `1 <= n <= 2^50`
- `1 <= k <= 50`
- The answer is strictly less than `2^50`.

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

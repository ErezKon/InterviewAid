# 3215. Count Triplets with Even XOR Set Bits II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii)
**Companies:** Amazon

---

## Problem Description

Count triplets `(a, b, c)` from three arrays where `popcount(a XOR b XOR c)` is even.

---

## Key Insight

`popcount(a XOR b XOR c)` is even iff the parity of set bits is even. For each bit position independently: the XOR bit is 1 iff an odd number of (a, b, c) have that bit set. The total popcount parity = XOR of individual bit parities = parity of `popcount(a) + popcount(b) + popcount(c)`. So we just need `popcount(a) + popcount(b) + popcount(c)` to be even.

Count even/odd popcount elements in each array, then count triplets where the sum of parities is even.

---

## Approach

```
FUNCTION countTriplets(a, b, c):
    // Count even/odd popcount in each array
    eA, oA = count even/odd popcount in a
    eB, oB = count even/odd popcount in b
    eC, oC = count even/odd popcount in c

    // Sum of parities even: 0+0+0, 0+1+1, 1+0+1, 1+1+0
    RETURN eA*eB*eC + eA*oB*oC + oA*eB*oC + oA*oB*eC
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m + k) — single pass per array |
| **Space** | O(1) |

---

## Key Takeaway

> **Even total popcount of XOR = even sum of individual popcounts' parities. Reduce to counting even/odd popcount elements per array, then combine with the 4 valid parity triples.**

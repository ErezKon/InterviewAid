# 3199. Count Triplets with Even XOR Set Bits I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i)
**Companies:** Amazon

---

## Problem Description

Given three integer arrays `a`, `b`, and `c`, return the number of triplets `(a[i], b[j], c[k])`, such that the bitwise `XOR` of the elements of each triplet has an **even** number of set bits.

**Constraints:**
- `1 <= a.length, b.length, c.length <= 100`
- `0 <= a[i], b[i], c[i] <= 100`

---

## Examples

```
Example 1:
  Input: a = [1], b = [2], c = [3]
  Output: 1
  Explanation: The only triplet is (a[0], b[0], c[0]) and their XOR is: 1 XOR 2 XOR 3 = 00 (binary).
```

```
Example 2:
  Input: a = [1,1], b = [2,3], c = [1,5]
  Output: 4
  Explanation: Consider these four triplets:
  - (a[0], b[1], c[0]): 1 XOR 3 XOR 1 = 011 (binary)
  - (a[1], b[1], c[0]): 1 XOR 3 XOR 1 = 011 (binary)
  - (a[0], b[0], c[1]): 1 XOR 2 XOR 5 = 110 (binary)
  - (a[1], b[0], c[1]): 1 XOR 2 XOR 5 = 110 (binary)
```

---

## Approach

```
FUNCTION countTriplets(a, b, c):
    // Count even/odd popcount in each array
    eA, oA ← count even/odd popcount in a
    eB, oB ← count even/odd popcount in b
    eC, oC ← count even/odd popcount in c

    // Even total popcount occurs when the sum of parities is even
    RETURN eA*eB*eC + eA*oB*oC + oA*eB*oC + oA*oB*eC
```

The parity-based O(n) solution works even for the small-constraint version, replacing the brute-force triple loop.

---

## Walkthrough

Consider `a = [1,2]`, `b = [3,4]`, `c = [5,6]`.

1. Compute popcount parity for each element:
   - `a`: 1→odd, 2→odd → eA=0, oA=2
   - `b`: 3→even, 4→odd → eB=1, oB=1
   - `c`: 5→even, 6→odd → eC=1, oC=1
2. Apply formula:
   - `eA*eB*eC = 0`
   - `eA*oB*oC = 0`
   - `oA*eB*oC = 2*1*1 = 2`
   - `oA*oB*eC = 2*1*1 = 2`
   - Total = 4 valid triplets.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m + k) — single pass per array |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution if the arrays were of different lengths?
2. Can the approach be extended to count quadruplets with even XOR set bits?
3. What changes are needed if the constraint on array sizes is removed and a brute-force solution becomes infeasible?

---

## Key Takeaway

> **Even total popcount of XOR = even sum of individual popcounts' parities. Reduce to counting even/odd popcount elements per array, then combine with the 4 valid parity triples.**
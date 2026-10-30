# 3215. Count Triplets with Even XOR Set Bits II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii)
**Companies:** Amazon

---

## Problem Description

Given three integer arrays `a`, `b`, and `c`, return the number of triplets `(a[i], b[j], c[k])`, such that the bitwise `XOR` between the elements of each triplet has an **even** number of set bits.

**Constraints:**
- `1 <= a.length, b.length, c.length <= 10^5`
- `0 <= a[i], b[i], c[i] <= 10^9`

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

## Key Insight

`popcount(a XOR b XOR c)` is even iff the parity of set bits is even. For each bit position independently: the XOR bit is 1 iff an odd number of (a, b, c) have that bit set. The total popcount parity = XOR of individual bit parities = parity of `popcount(a) + popcount(b) + popcount(c)`. So we just need `popcount(a) + popcount(b) + popcount(c)` to be even.

Count even/odd popcount elements in each array, then count triplets where the sum of parities is even.

---

## Approach

```
FUNCTION countTriplets(a, b, c):
    // Count even/odd popcount in each array
    eA, oA ← count even/odd popcount in a
    eB, oB ← count even/odd popcount in b
    eC, oC ← count even/odd popcount in c

    // Sum of parities even: 0+0+0, 0+1+1, 1+0+1, 1+1+0
    RETURN eA*eB*eC + eA*oB*oC + oA*eB*oC + oA*oB*eC
```

---

## Walkthrough

Consider `a = [1,2]`, `b = [3,4]`, `c = [5,6]`.

1. Compute parity of popcount for each element:
   - `a`: 1→odd, 2→odd → eA=0, oA=2
   - `b`: 3→even, 4→odd → eB=1, oB=1
   - `c`: 5→even, 6→odd → eC=1, oC=1
2. Apply formula:
   - `eA*eB*eC = 0`
   - `eA*oB*oC = 0`
   - `oA*eB*oC = 2*1*1 = 2`
   - `oA*oB*eC = 2*1*1 = 2`
   - Total = 4 valid triplets, matching the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m + k) — single pass per array |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would the solution change if the arrays could contain negative integers?
2. Can the approach be extended to count quadruplets with even XOR set bits?
3. What if we need to return the actual triplet indices instead of just the count?

---

## Key Takeaway

> **Even total popcount of XOR = even sum of individual popcounts' parities. Reduce to counting even/odd popcount elements per array, then combine with the 4 valid parity triples.**
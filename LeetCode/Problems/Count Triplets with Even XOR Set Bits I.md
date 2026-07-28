# 3199. Count Triplets with Even XOR Set Bits I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i)
**Companies:** Amazon

---

## Problem Description

Same as version II but with small constraints, allowing brute force O(n³).

---

## Examples

| Input Arrays | Output | Explanation |
|--------------|--------|-------------|
| `a = [1,2]`, `b = [3,4]`, `c = [5,6]` | `4` | All 8 possible triplets are checked; 4 have an even number of set bits in `a ^ b ^ c`.
| `a = [0]`, `b = [0]`, `c = [0]` | `1` | Only one triplet `(0,0,0)` with XOR `0` (popcount 0, even).

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

The parity‑based O(n) solution works even for the small‑constraint version, replacing the brute‑force triple loop.

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
3. What changes are needed if the constraint on array sizes is removed and a brute‑force solution becomes infeasible?

---

## Key Takeaway

> **Even total popcount of XOR = even sum of individual popcounts' parities. Reduce to counting even/odd popcount elements per array, then combine with the 4 valid parity triples.**
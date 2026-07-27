# 1734. Decode XORed Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decode-xored-permutation](https://leetcode.com/problems/decode-xored-permutation)
**Companies:** Amazon

---

## Problem Description

Given `encoded[i] = perm[i] XOR perm[i+1]` for a permutation of `[1..n]` (n is odd), decode the original permutation.

---

## Key Insight

XOR of all `[1..n]` is known. XOR of `encoded[1], encoded[3], ...` (odd indices) gives `perm[1] XOR perm[2] XOR ... XOR perm[n-1]` which combined with the total XOR reveals `perm[0]`. Then reconstruct sequentially.

---

## Approach

```
FUNCTION decode(encoded):
    n = len(encoded) + 1
    totalXOR = XOR(1..n)
    // XOR of encoded[1], encoded[3], ... = perm[1] ^ perm[2] ^ ... ^ perm[n-1]
    oddXOR = XOR(encoded[i] for i in 1,3,5,...)
    perm = [totalXOR ^ oddXOR]  // perm[0]
    FOR i ← 0 TO len(encoded)-1:
        perm.ADD(perm[-1] ^ encoded[i])
    RETURN perm
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Exploit XOR properties: XOR of entire permutation is computable, and XOR of alternate encoded values isolates all elements except perm[0]. This recovers perm[0], then sequential decoding follows.**

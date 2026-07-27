# 1442. Count Triplets That Can Form Two Arrays of Equal XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor](https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor)
**Companies:** Google, Meta

---

## Problem Description

Count triplets `(i, j, k)` where `i < j <= k` such that `XOR(arr[i..j-1]) == XOR(arr[j..k])`.

---

## Key Insight

If `XOR(arr[i..j-1]) == XOR(arr[j..k])`, then `XOR(arr[i..k]) = 0` (since a ⊕ a = 0). So we just need segments `[i..k]` with XOR = 0. For each such segment, any `j` in `(i, k]` is valid → contributes `k - i` triplets.

Using prefix XOR: `prefix[i] == prefix[k+1]` means the segment XOR is 0.

---

## Approach

```
FUNCTION countTriplets(arr):
    n = LENGTH(arr)
    prefix = [0] * (n + 1)
    FOR i ← 0 TO n-1: prefix[i+1] = prefix[i] ^ arr[i]

    result = 0
    FOR i ← 0 TO n-1:
        FOR k ← i+1 TO n-1:
            IF prefix[i] == prefix[k+1]:
                result += k - i
    RETURN result
```

Can be optimized to O(n) using a hash map tracking count and index-sum of each prefix XOR.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) brute force, O(n) with hash map |
| **Space** | O(n) |

---

## Key Takeaway

> **XOR(a..b) == XOR(b+1..c) ⟹ XOR(a..c) == 0. Reduce to finding segments with zero XOR via prefix XOR. Each zero-XOR segment of length L contributes L-1 valid split points.**

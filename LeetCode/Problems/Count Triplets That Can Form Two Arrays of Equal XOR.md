# 1442. Count Triplets That Can Form Two Arrays of Equal XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor](https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor)
**Companies:** Google, Meta

---

## Problem Description

Count triplets `(i, j, k)` where `i < j <= k` such that `XOR(arr[i..j-1]) == XOR(arr[j..k])`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `arr = [2,3,1,6,7]` | `4` | The valid triplets are `(0,1,2)`, `(0,2,3)`, `(1,2,3)`, `(2,3,4)`.
| `arr = [1,1,1,1,1]` | `10` | Every possible `(i, j, k)` satisfies the condition because any subarray XOR is `0`.

---

## Key Insight

If `XOR(arr[i..j-1]) == XOR(arr[j..k])`, then `XOR(arr[i..k]) = 0` (since a ⊕ a = 0). So we just need segments `[i..k]` with XOR = 0. For each such segment, any `j` in `(i, k]` is valid → contributes `k - i` triplets.

Using prefix XOR: `prefix[i] == prefix[k+1]` means the segment XOR is 0.

---

## Approach

```
FUNCTION countTriplets(arr):
    n ← LENGTH(arr)
    prefix ← ARRAY of size n+1 initialized to 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] XOR arr[i]

    // hashmap: prefix value → (count, sum of indices)
    hashmap ← EMPTY MAP
    result ← 0
    FOR index ← 0 TO n:
        val ← prefix[index]
        IF val IN hashmap:
            (cnt, idxSum) ← hashmap[val]
            // each previous occurrence forms (index-1 - prevIdx) triplets
            result ← result + cnt * (index-1) - idxSum
            hashmap[val] ← (cnt+1, idxSum + index)
        ELSE:
            hashmap[val] ← (1, index)
    RETURN result
```

The hash map tracks how many times each prefix XOR has appeared and the sum of their indices, allowing O(1) contribution calculation per position.

---

## Walkthrough

Consider `arr = [2,3,1,6,7]`.

1. Compute prefix XORs: `[0, 2, 1, 0, 6, 1]`.
2. Iterate indices:
   - index 0, val 0: first occurrence → store (1,0).
   - index 1, val 2: first → store (1,1).
   - index 2, val 1: first → store (1,2).
   - index 3, val 0: seen before (cnt=1, idxSum=0). Contribution = 1 * (3‑1) - 0 = 2 → result=2. Update (cnt=2, idxSum=3).
   - index 4, val 6: first → store (1,4).
   - index 5, val 1: seen before (cnt=1, idxSum=2). Contribution = 1 * (5‑1) - 2 = 2 → result=4. Update (cnt=2, idxSum=7).
3. Final result = 4 triplets, matching the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – single pass with hash map |
| **Space** | O(n) – prefix array and hash map |

---

## Follow-Up Questions

1. How would the solution change if the array could contain negative numbers?
2. Can you extend the approach to count quadruplets with equal XOR on two halves?
3. What if we need to return the actual triplet indices instead of just the count?

---

## Key Takeaway

> **XOR(a..b) == XOR(b+1..c) ⟹ XOR(a..c) == 0. Reduce to finding segments with zero XOR via prefix XOR. Each zero‑XOR segment of length L contributes L‑1 valid split points.**
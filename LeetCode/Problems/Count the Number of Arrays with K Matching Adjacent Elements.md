# 3405. Count the Number of Arrays with K Matching Adjacent Elements

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements](https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements)
**Companies:** Amazon, Bloomberg, Google, Meta, Phonepe

---

## Problem Description

Count arrays of length `n` with elements in `[1, m]` that have exactly `k` adjacent pairs where `arr[i] == arr[i+1]`.

---

## Key Insight

There are `n-1` adjacent positions. Choose `k` of them to be matching pairs: `C(n-1, k)`. The first element has `m` choices. Each non-matching transition has `m-1` choices (any value except the previous). There are `n-1-k` such transitions.

---

## Approach: Combinatorics — O(n) ✅

```
FUNCTION countGoodArrays(n, m, k):
    MOD = 10^9 + 7
    RETURN C(n-1, k) * m % MOD * pow(m-1, n-1-k, MOD) % MOD
```

Formula: `C(n-1, k) × m × (m-1)^(n-1-k)`

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) for computing `C(n-1, k)` |
| **Space** | O(n) for factorial precomputation |

---

## Key Takeaway

> **When counting arrays with exactly k matching adjacent pairs, decompose into: choose which k positions match × first element choices × non-matching transition choices. Pure combinatorics, no DP needed.**

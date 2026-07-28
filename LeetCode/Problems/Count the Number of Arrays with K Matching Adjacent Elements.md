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

## Examples

**Example 1:**
```
Input: n = 3, m = 2, k = 1
Output: 4
Explanation: Valid arrays are [1,1,2], [2,2,1], [1,2,2], [2,1,1].
```

**Example 2:**
```
Input: n = 2, m = 3, k = 0
Output: 6
Explanation: All arrays where the two elements differ: 3*2 = 6.
```

---

## Approach: Combinatorics — O(n) ✅

```
FUNCTION countGoodArrays(n, m, k):
    MOD = 10^9 + 7
    RETURN C(n-1, k) * m % MOD * pow(m-1, n-1-k, MOD) % MOD
```

---

## Walkthrough

**Input:** `n = 4, m = 3, k = 2`

1. Choose which `k = 2` of the `n-1 = 3` adjacent positions will match → `C(3,2) = 3` ways.
2. Choose the first element value → `m = 3` choices.
3. For each of the `n-1-k = 1` non‑matching positions, pick any value except the previous one → `m-1 = 2` choices.
4. Multiply: `3 (choices for positions) * 3 (first element) * 2 (non‑matching) = 18`.
5. Apply modulo `10^9+7` → result `18`.

Thus there are 18 arrays of length 4 over [1,3] with exactly two matching adjacent pairs.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) for computing `C(n-1, k)` |
| **Space** | O(1) |

---

## Key Takeaway

> **When an array is required to have exactly `k` matching adjacent pairs, the answer is a product of three independent choices: which positions match, the first element, and the values for non‑matching transitions.**
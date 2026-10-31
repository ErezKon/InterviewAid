# 3405. Count the Number of Arrays with K Matching Adjacent Elements

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements](https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements)
**Companies:** Amazon, Bloomberg, Google, Meta, Phonepe

---

## Problem Description

You are given three integers `n`, `m`, `k`. A **good array** `arr` of size `n` is defined as follows:

- Each element in `arr` is in the **inclusive** range `[1, m]`.
- **Exactly** `k` indices `i` (where `1 <= i < n`) satisfy the condition `arr[i - 1] == arr[i]`.

Return the number of **good arrays** that can be formed.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= m <= 10^5`
- `0 <= k <= n - 1`

---

## Key Insight

There are `n-1` adjacent positions. Choose `k` of them to be matching pairs: `C(n-1, k)`. The first element has `m` choices. Each non-matching transition has `m-1` choices (any value except the previous). There are `n-1-k` such transitions.

---

## Examples

```
Example 1:
  Input: n = 3, m = 2, k = 1
  Output: 4
  Explanation: There are 4 good arrays. They are [1, 1, 2], [1, 2, 2], [2, 1, 1] and [2, 2, 1]. Hence, the answer is 4.
```

```
Example 2:
  Input: n = 4, m = 2, k = 2
  Output: 6
  Explanation: The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1]. Hence, the answer is 6.
```

```
Example 3:
  Input: n = 5, m = 2, k = 0
  Output: 2
  Explanation: The good arrays are [1, 2, 1, 2, 1] and [2, 1, 2, 1, 2]. Hence, the answer is 2.
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
3. For each of the `n-1-k = 1` non-matching positions, pick any value except the previous one → `m-1 = 2` choices.
4. Multiply: `3 (choices for positions) * 3 (first element) * 2 (non-matching) = 18`.
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

> **When an array is required to have exactly `k` matching adjacent pairs, the answer is a product of three independent choices: which positions match, the first element, and the values for non-matching transitions.**
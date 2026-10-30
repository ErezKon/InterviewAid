# 1806. Minimum Number of Operations to Reinitialize a Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation](https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation)
**Companies:** Google

---

## Problem Description

You are given an **even** integer `n`. You initially have a permutation `perm` of size `n` where `perm[i] == i` **(0-indexed)**.

In one operation, you will create a new array `arr`, and for each `i`:

- If `i % 2 == 0`, then `arr[i] = perm[i / 2]`.
- If `i % 2 == 1`, then `arr[i] = perm[n / 2 + (i - 1) / 2]`.

You will then assign `arr` to `perm`.

Return *the minimum **non-zero** number of operations you need to perform on *`perm`* to return the permutation to its initial value.*

**Constraints:**
- `2 <= n <= 1000`
- `n` is even.

## Examples

**Example 1:**
```
Input: n = 2
Output: 1
Explanation: perm = [0,1] initially.
After the 1^st operation, perm = [0,1]
So it takes only 1 operation.
```

**Example 2:**
```
Input: n = 4
Output: 2
Explanation: perm = [0,1,2,3] initially.
After the 1^st operation, perm = [0,2,1,3]
After the 2^nd operation, perm = [0,1,2,3]
So it takes only 2 operations.
```

**Example 3:**
```
Input: n = 6
Output: 4
```

## Approach
The operation defines a deterministic mapping of indices. Observing the pattern reveals that each index follows a cycle whose length is the order of 2 modulo `n‑1`. The number of operations needed is the smallest `k` such that `2^k ≡ 1 (mod n‑1)`.

1. Set `mod ← n‑1` and `k ← 0`.
2. Initialize `pow ← 1`.
3. While `pow != 1` or `k == 0`:
   - `pow ← (pow * 2) mod mod`.
   - `k ← k + 1`.
4. Return `k`.
The loop runs at most `mod` times because the multiplicative order divides `φ(mod)`.

## Walkthrough
| Step | pow (2^step mod n‑1) | k |
|------|----------------------|---|
| 0 | 1 | 0 |
| 1 | 2 mod (n‑1) | 1 |
| 2 | 4 mod (n‑1) | 2 |
| … | … | … |
When `pow` returns to 1, `k` is the answer.

## Complexity Analysis
- **Time:** O(n) in the worst case, but typically O(log n) because the order of 2 grows slowly.
- **Space:** O(1).

## Follow‑Up Questions
1. How would the solution change if the permutation size `n` could be odd?
2. Can you compute the answer without iterating, using number‑theoretic formulas for the multiplicative order?
3. What is the total number of distinct permutations reachable from the identity under this operation?

## Key Takeaway
The reinitialization count equals the multiplicative order of 2 modulo `n‑1`; iteratively multiplying by 2 until reaching 1 yields the minimal operations.

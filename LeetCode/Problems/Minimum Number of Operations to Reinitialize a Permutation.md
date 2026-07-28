# 1806. Minimum Number of Operations to Reinitialize a Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation](https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation)
**Companies:** Google

---

## Problem Description
You are given an integer `n` (even). Consider the permutation `perm` of length `n` where `perm[i] = i` (0‑indexed). You may perform the following operation any number of times:
- Create a new array `arr` of length `n` where `arr[0] = 0`.
- For each `i` from `1` to `n-1`:
  - If `i` is odd, set `arr[i] = perm[i‑1]`.
  - If `i` is even, set `arr[i] = perm[n‑i]`.
Replace `perm` with `arr`. Return the minimum number of operations required to transform `perm` back to the original identity permutation.

## Examples
**Example 1:**
```
Input: n = 2
Output: 1
Explanation: Starting from [0,1], after one operation we get [0,1] again.
```
**Example 2:**
```
Input: n = 4
Output: 2
Explanation: [0,1,2,3] → [0,3,2,1] → [0,1,2,3].
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

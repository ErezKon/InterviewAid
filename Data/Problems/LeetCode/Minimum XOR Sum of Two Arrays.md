# 1879. Minimum XOR Sum of Two Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-xor-sum-of-two-arrays](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays)
**Companies:** Medianet

---

## Problem Description
You are given two integer arrays `nums1` and `nums2`, each of length `n`. You may permute the order of elements within each array arbitrarily. After permuting, compute the sum of `nums1[i] XOR nums2[i]` for all `i` from `0` to `n‑1`. Return the minimum possible sum.

## Examples
| nums1 | nums2 | Minimum XOR Sum |
|-------|-------|-----------------|
| [1,2] | [2,3] | 2 (permute to `[1,2]` & `[3,2]` → 1⊕3 + 2⊕2 = 2) |
| [0,1,2] | [3,4,5] | 6 |

## Approach
**Algorithm:** DP over subsets (bitmask) – classic assignment problem for small `n` (≤14).
1. Let `dp[mask]` be the minimum XOR sum achievable when a subset `mask` of indices from `nums2` has been assigned to the first `k` elements of `nums1`, where `k = popcount(mask)`.
2. Transition: for each unset bit `j` in `mask`, assign `nums2[j]` to `nums1[k]` and update `dp[mask | (1<<j)]`.
3. Initialize `dp[0] = 0`. The answer is `dp[(1<<n) - 1]`.

### Pseudocode
```text
FUNCTION minXorSum(nums1, nums2):
    SET n ← LENGTH(nums1)
    SET fullMask ← (1 << n) - 1
    CREATE dp[0 .. fullMask] ← INF
    SET dp[0] ← 0
    FOR mask ← 0 TO fullMask:
        SET k ← POPCOUNT(mask) // number of assigned elements
        IF k == n: CONTINUE
        FOR j ← 0 TO n-1:
            IF (mask >> j) & 1 == 0: // j not used yet
                SET newMask ← mask OR (1 << j)
                SET candidate ← dp[mask] + (nums1[k] XOR nums2[j])
                SET dp[newMask] ← MIN(dp[newMask], candidate)
    RETURN dp[fullMask]
```

## Walkthrough
Take `nums1 = [1,2]`, `nums2 = [2,3]` (n=2).
| mask (binary) | k | Assign j | newMask | dp value |
|---------------|---|----------|---------|----------|
| 00            | 0 | j=0 (2)  | 01      | 1⊕2 = 3 |
| 00            | 0 | j=1 (3)  | 10      | 1⊕3 = 2 |
| 01            | 1 | j=1      | 11      | 3 + (2⊕3=1) = 4 |
| 10            | 1 | j=0      | 11      | 2 + (2⊕2=0) = 2 |
Result `dp[11] = 2` – the minimal XOR sum.

## Complexity Analysis
- Time: O(n * 2^n) – each mask iterates over at most `n` unset bits.
- Space: O(2^n) for the DP array.

## Follow‑Up Questions
1. How would you adapt the solution if `n` could be up to 1000? (Hint: use Hungarian algorithm with cost matrix.)
2. Can you modify the DP to also return the actual permutation achieving the minimum?
3. What changes are needed if the XOR operation is replaced by another binary operation like AND?

## Key Takeaway
When `n` is small, a bitmask DP efficiently explores all assignments, turning the minimum‑XOR‑sum problem into a tractable exponential‑time dynamic programming solution.

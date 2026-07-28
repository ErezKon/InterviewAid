# 3149. Find the Minimum Cost Array Permutation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-cost-array-permutation](https://leetcode.com/problems/find-the-minimum-cost-array-permutation)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask DP — O(n²·2ⁿ) ✅](#4-approach-bitmask-dp)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of size `n` (permutation of 0..n-1), find the permutation `perm` of 0..n-1 that minimizes `Σ|perm[i] - nums[perm[(i+1) % n]]|`. Return the lexicographically smallest such permutation.

**Constraints:**
- `2 <= n <= 14`

---

## 2. Examples

| `nums` | Minimum Cost Permutation | Cost |
|--------|--------------------------|------|
| `[0,1,2]` | `[0,1,2]` | 0 |
| `[2,0,1]` | `[0,2,1]` | 3 |

*Explanation:* For the second example, the optimal ordering `[0,2,1]` yields `|0-nums[2]| + |2-nums[1]| + |1-nums[0]| = |0-1| + |2-0| + |1-2| = 1+2+1 = 4` (adjusted to minimal). The lexicographically smallest permutation among those achieving the minimum cost is returned.

---

## 3. Key Insight

> With n ≤ 14, use bitmask DP. Fix `perm[0] = 0` (circular shift invariance). `dp[mask][last]` = min cost of placing the elements in `mask`, ending with `last`. Reconstruct the lexicographically smallest path.

---

## 4. Approach: Bitmask DP — O(n²·2ⁿ) ✅

```text
FUNCTION findPermutation(nums):
    n ← LENGTH(nums)
    dp ← 2ⁿ × n array initialized to ∞
    dp[1][0] ← 0    // start with element 0 fixed at position 0

    FOR mask FROM 1 TO 2ⁿ - 1 DO
        FOR last FROM 0 TO n-1 DO
            IF dp[mask][last] == ∞ THEN CONTINUE
            FOR next FROM 0 TO n-1 DO
                IF (mask >> next) & 1 == 0 THEN
                    cost ← ABS(last - nums[next])
                    newMask ← mask OR (1 << next)
                    dp[newMask][next] ← MIN(dp[newMask][next], dp[mask][last] + cost)

    // Complete the cycle back to 0 and find minimal total cost
    minCost ← ∞
    FOR last FROM 0 TO n-1 DO
        total ← dp[(1<<n)-1][last] + ABS(last - nums[0])
        minCost ← MIN(minCost, total)

    // Reconstruct lexicographically smallest permutation achieving minCost
    RETURN reconstructPermutation(dp, nums)
```

---

## 5. Walkthrough

Consider `nums = [2,0,1]` (n = 3).

1. **Initialization:** `dp[1][0] = 0` (mask `001`). All other states are ∞.
2. **Mask 001:** last = 0.
   - Try adding `next = 1` → cost `|0 - nums[1]| = |0-0| = 0`; `newMask = 011`; `dp[011][1] = 0`.
   - Try adding `next = 2` → cost `|0 - nums[2]| = |0-1| = 1`; `newMask = 101`; `dp[101][2] = 1`.
3. **Mask 011:** last = 1.
   - Add `next = 2` → cost `|1 - nums[2]| = |1-1| = 0`; `newMask = 111`; `dp[111][2] = 0`.
4. **Mask 101:** last = 2.
   - Add `next = 1` → cost `|2 - nums[1]| = |2-0| = 2`; `newMask = 111`; `dp[111][1] = 3` (worse).
5. **Complete cycle:** For mask `111` (all visited), evaluate returning to start (0).
   - From last = 2: total = `dp[111][2] + |2 - nums[0]| = 0 + |2-2| = 0`.
   - From last = 1: total = `3 + |1 - nums[0]| = 3 + |1-2| = 4`.
   - Minimum cost = 0, achieved by path `0 → 1 → 2` → back to 0, i.e., permutation `[0,1,2]`.

Thus the algorithm finds the optimal permutation and its cost.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²·2ⁿ) — DP over subsets and transitions |
| **Space** | O(n·2ⁿ) — DP table |

---

## 7. Follow-Up Questions

1. How would the solution adapt if the cost function were `|perm[i] - perm[(i+1) % n]|` without referencing `nums`?
2. Can we improve the time complexity using meet‑in‑the‑middle or other combinatorial tricks for larger `n`?
3. What changes are needed to output all permutations achieving the minimum cost instead of just the lexicographically smallest?

---

## 8. Key Takeaway

> **Bitmask DP for small n** (≤ 14) with circular cost function. Fix element 0 at position 0 to break symmetry, then reconstruct the lexicographically smallest optimal permutation.

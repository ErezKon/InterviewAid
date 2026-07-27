# 1000. Minimum Cost to Merge Stones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-merge-stones](https://leetcode.com/problems/minimum-cost-to-merge-stones)
**Companies:** Amazon, De Shaw, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Interval DP — O(n³/k)](#approach-interval-dp--onk)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` piles of stones in a row. In each move, you merge exactly `k` **consecutive** piles into one pile. The cost of this merge is the total number of stones in those `k` piles.

Return the **minimum total cost** to merge all piles into one. If it's impossible, return `-1`.

**Constraints:**
- `1 ≤ n ≤ 30`
- `2 ≤ k ≤ 30`
- `1 ≤ stones[i] ≤ 100`

---

## Examples

**Example 1:**
```
Input: stones = [3, 2, 4, 1], k = 2
Output: 20
Explanation:
  Merge [3,2] → cost 5, stones = [5, 4, 1]
  Merge [4,1] → cost 5, stones = [5, 5]
  Merge [5,5] → cost 10, stones = [10]
  Total = 5 + 5 + 10 = 20
```

**Example 2:**
```
Input: stones = [3, 2, 4, 1], k = 3
Output: -1
Explanation: Each merge reduces pile count by k-1=2. Starting with 4 piles, we can reach 4-2=2, but never 1.
```

---

## Key Insight

> Each merge reduces the number of piles by `k - 1`. Starting from `n` piles, we can reach 1 pile only if `(n - 1) % (k - 1) == 0`. The problem becomes an **interval DP** where `dp[i][j]` = minimum cost to optimally merge the subarray `stones[i..j]`.

The key observation: we split an interval into a left part that reduces to 1 pile and a remaining right part, stepping by `k - 1` to ensure valid merge boundaries.

---

## Approach: Interval DP — O(n³/k) ✅

```
FUNCTION mergeStones(stones, k):
    n = len(stones)
    IF (n - 1) % (k - 1) != 0: RETURN -1

    prefix = prefix sums of stones
    dp = n × n of 0

    FOR length ← k TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            dp[i][j] = infinity
            FOR mid ← i TO j - 1 STEP k - 1:
                dp[i][j] = MIN(dp[i][j], dp[i][mid] + dp[mid+1][j])
            IF (length - 1) % (k - 1) == 0:
                dp[i][j] += prefix[j+1] - prefix[i]

    RETURN dp[0][n-1]
```

---

## Walkthrough

```
stones = [3, 2, 4, 1], k = 2
prefix = [0, 3, 5, 9, 10]
```

**Building DP bottom-up (length = 2 to 4):**

| i | j | length | dp[i][j] | Explanation |
|---|---|--------|----------|-------------|
| 0 | 1 | 2 | 5 | Merge [3,2] → cost 5 |
| 1 | 2 | 2 | 6 | Merge [2,4] → cost 6 |
| 2 | 3 | 2 | 5 | Merge [4,1] → cost 5 |
| 0 | 2 | 3 | 9+5=14 or 5+5=10 → **10** | Best split: dp[0][0]+dp[1][2]=0+6, then can't merge 3; dp[0][1]+dp[2][2]=5+0+4=9. Min=9... Actually: split at mid=0: dp[0][0]+dp[1][2]=0+6=6, split at mid=1: dp[0][1]+dp[1][2]=5+0=5... |
| 0 | 3 | 4 | **20** | Best way to merge all into one pile |

**Result:** `dp[0][3]` = **20** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n³ / k) — three nested loops, inner steps by k-1 |
| **Space** | O(n²) — DP table |

---

## Follow-Up Questions

1. **Why the `(n-1) % (k-1) != 0` check?** Each merge removes `k-1` piles. To go from `n` piles to 1, we need `(n-1)` removals, which must be divisible by `k-1`.
2. **How is this different from Matrix Chain Multiplication?** Same interval DP structure, but the split step increments by `k-1` instead of 1 to respect the "merge exactly k consecutive piles" constraint.
3. **Can this be extended to non-consecutive merges?** That becomes a different (harder) problem — without the consecutive constraint, greedy/heap approaches may apply.
4. **What about k=2?** It reduces to the classic "merge stones" problem solvable with standard interval DP in O(n³).

---

## Key Takeaway

> Interval DP with a step-size of `k-1` efficiently handles the "merge exactly k consecutive elements" constraint — always check the feasibility condition `(n-1) % (k-1) == 0` first.

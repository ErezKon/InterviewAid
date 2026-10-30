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

There are `n` piles of `stones` arranged in a row. The `i-th` pile has `stones[i]` stones.

A move consists of merging exactly `k` **consecutive** piles into one pile, and the cost of this move is equal to the total number of stones in these `k` piles.

Return *the minimum cost to merge all piles of stones into one pile*. If it is impossible, return `-1`.

**Constraints:**
- `n == stones.length`
- `1 ≤ n ≤ 30`
- `1 ≤ stones[i] ≤ 100`
- `2 ≤ k ≤ 30`

---

## Examples

```
Example 1:
  Input: stones = [3,2,4,1], k = 2
  Output: 20
  Explanation: We start with [3, 2, 4, 1].
  We merge [3, 2] for a cost of 5, and we are left with [5, 4, 1].
  We merge [4, 1] for a cost of 5, and we are left with [5, 5].
  We merge [5, 5] for a cost of 10, and we are left with [10].
  The total cost was 20, and this is the minimum possible.
```

```
Example 2:
  Input: stones = [3,2,4,1], k = 3
  Output: -1
  Explanation: After any merge operation, there are 2 piles left, and we can't merge anymore. So the task is impossible.
```

```
Example 3:
  Input: stones = [3,5,1,2,6], k = 3
  Output: 25
  Explanation: We start with [3, 5, 1, 2, 6].
  We merge [5, 1, 2] for a cost of 8, and we are left with [3, 8, 6].
  We merge [3, 8, 6] for a cost of 17, and we are left with [17].
  The total cost was 25, and this is the minimum possible.
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

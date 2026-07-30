# 1547. Minimum Cost to Cut a Stick

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-cut-a-stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick)
**Companies:** Amazon, Bloomberg, Cyware, Google, Line, Meta, Microsoft, Oracle

---

## Problem Description

You are given a stick of length `n` and an array `cuts` where each element is a position on the stick to cut. Each cut splits a stick segment into two parts and incurs a cost equal to the length of the segment being cut. Determine the minimum total cost to perform all cuts.

## Examples

1. **Input:** `n = 7`, `cuts = [1,3,4,5]`
   **Output:** `16`
   **Explanation:** One optimal sequence of cuts is:
   - Cut at 1 (cost 7) → segments `[0,1]` and `[1,7]`
   - Cut at 3 (cost 6) → segments `[1,3]` and `[3,7]`
   - Cut at 4 (cost 4) → segments `[3,4]` and `[4,7]`
   - Cut at 5 (cost 3) → total cost `7+6+4+3 = 20`. A better order yields `16`.
2. **Input:** `n = 9`, `cuts = [5,6,1,4,2]`
   **Output:** `22`
   **Explanation:** Optimal ordering gives total cost `22`.

## Approach

**Algorithm:** Interval Dynamic Programming (DP).

1. Append the stick boundaries `0` and `n` to the `cuts` array and sort it.
2. Let `dp[i][j]` be the minimum cost to cut the segment between `cuts[i]` and `cuts[j]` (exclusive). If there is no cut between them (`j = i+1`), the cost is `0`.
3. For increasing segment lengths, try every possible first cut `k` inside the segment and combine the costs of the left and right sub‑segments plus the cost of cutting the current segment (`cuts[j] - cuts[i]`).

```text
FUNCTION minCostToCutStick(n, cuts):
    cuts ← SORT([0] + cuts + [n])
    m ← LENGTH(cuts)
    dp ← MATRIX(m, m, 0)
    FOR length ← 2 TO m - 1 DO
        FOR i ← 0 TO m - length - 1 DO
            j ← i + length
            dp[i][j] ← INFINITY
            FOR k ← i + 1 TO j - 1 DO
                cost ← dp[i][k] + dp[k][j] + cuts[j] - cuts[i]
                IF cost < dp[i][j] THEN
                    dp[i][j] ← cost
    RETURN dp[0][m-1]
```

## Walkthrough

Consider `n = 7`, `cuts = [1,3,4,5]`.

| i | j | Segment | Possible k | Computed dp[i][j] |
|---|---|---------|------------|-------------------|
|0|5|[0,7]|k=1,2,3,4|dp[0][5] = 16 |
|…|…|…|…|…|

The DP fills smaller intervals first, then builds up to the whole stick, yielding the minimal total cost.

## Complexity Analysis

- **Time:** `O(m³)` where `m = len(cuts) + 2` (all interval pairs and inner cuts).
- **Space:** `O(m²)` for the DP table.

## Follow‑Up Questions

- How would the solution change if each cut had a different individual cost?
- Can the problem be solved in `O(m²)` using Knuth optimization?
- What if cuts could be performed in parallel on independent segments?

## Key Takeaway

Interval DP solves problems where the cost of an operation depends on the current segment length; by breaking the problem into sub‑segments and trying every possible first cut, we obtain the optimal total cost.

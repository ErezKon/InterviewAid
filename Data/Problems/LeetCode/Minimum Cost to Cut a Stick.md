# 1547. Minimum Cost to Cut a Stick

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-cut-a-stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick)
**Companies:** Amazon, Bloomberg, Cyware, Google, Line, Meta, Microsoft, Oracle

---

## Problem Description

Given a wooden stick of length `n` units. The stick is labelled from `0` to `n`. For example, a stick of length **6** is labelled as follows:

```
|----|----|----|----|----|----|
0    1    2    3    4    5    6
```

Given an integer array `cuts` where `cuts[i]` denotes a position you should perform a cut at.

You should perform the cuts in order, you can change the order of the cuts as you wish.

The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.

Return *the minimum total cost* of the cuts.

**Constraints:**
- `2 <= n <= 10^6`
- `1 <= cuts.length <= min(n - 1, 100)`
- `1 <= cuts[i] <= n - 1`
- All the integers in `cuts` array are **distinct**.

## Examples

```
Example 1:
  Input: n = 7, cuts = [1,3,4,5]
  Output: 16
  Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:
  The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.
  Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (7 + 4 + 3 + 2 = 16).
```

```
Example 2:
  Input: n = 9, cuts = [5,6,1,4,2]
  Output: 22
  Explanation: If you try the given cuts ordering the cost will be 25.
  There are much ordering with total cost <= 25, for example, the order [4, 6, 5, 2, 1] has total cost = 22 which is the minimum possible.
```

## Approach

**Algorithm:** Interval Dynamic Programming (DP).

1. Append the stick boundaries `0` and `n` to the `cuts` array and sort it.
2. Let `dp[i][j]` be the minimum cost to cut the segment between `cuts[i]` and `cuts[j]` (exclusive). If there is no cut between them (`j = i+1`), the cost is `0`.
3. For increasing segment lengths, try every possible first cut `k` inside the segment and combine the costs of the left and right sub-segments plus the cost of cutting the current segment (`cuts[j] - cuts[i]`).

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

## Follow-Up Questions

- How would the solution change if each cut had a different individual cost?
- Can the problem be solved in `O(m²)` using Knuth optimization?
- What if cuts could be performed in parallel on independent segments?

## Key Takeaway

Interval DP solves problems where the cost of an operation depends on the current segment length; by breaking the problem into sub-segments and trying every possible first cut, we obtain the optimal total cost.

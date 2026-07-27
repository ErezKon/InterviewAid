# 3193. Count the Number of Inversions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-inversions](https://leetcode.com/problems/count-the-number-of-inversions)
**Companies:** Amazon, Google, Microsoft, Salesforce

---

## Problem Description

Given `n` and a `requirements` array specifying that `perm[0..end_i]` must have exactly `cnt_i` inversions, count valid permutations of `[0..n-1]` modulo `10^9 + 7`.

---

## Key Insight

Use DP: `dp[i][j]` = number of ways to arrange the first `i` elements with exactly `j` inversions. The `(i+1)`-th element (0-indexed) can create 0 to `i` new inversions depending on its relative position. Apply constraints from `requirements` to prune invalid states.

---

## Approach

```
FUNCTION numberOfPermutations(n, requirements):
    MOD = 10^9 + 7
    // dp[i][j] = ways to place first i elements with j inversions
    // Transition: placing element at position contributes 0..i-1 new inversions
    // Use prefix sums for O(1) range summation

    reqMap = {end: cnt for [end, cnt] in requirements}
    maxInv = max inversions needed
    dp = [[0] * (maxInv+1) for _ in range(n)]
    dp[0][0] = 1

    FOR i ← 1 TO n-1 DO
        FOR j ← 0 TO maxInv DO
            // dp[i][j] = sum(dp[i-1][j-k] for k in 0..min(i, j))
            // Use prefix sum optimization
            IF i IN reqMap AND j != reqMap[i]: continue  // constraint
            dp[i][j] = prefixSum(dp[i-1], j-i, j) % MOD

    RETURN dp[n-1][reqMap[n-1]]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × maxInversions) with prefix sum optimization |
| **Space** | O(n × maxInversions) |

---

## Key Takeaway

> **Permutation inversion counting DP: the i-th element creates 0 to i-1 new inversions. Use prefix sums for efficient range transitions, and prune states using the requirements constraints.**

# 887. Super Egg Drop

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-egg-drop](https://leetcode.com/problems/super-egg-drop)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tiktok

---

## Problem Description

You are given `k` identical eggs and you have access to a building with `n` floors labeled from `1` to `n`.

You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor **higher** than `f` will **break**, and any egg dropped **at or below** floor `f` will **not break**.

Each move, you may take an unbroken egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. However, if the egg does not break, you may **reuse** it in future moves.

Return *the **minimum number of moves** that you need to determine **with certainty** what the value of* `f` is.

**Constraints:**
- `1 <= k <= 100`
- `1 <= n <= 10^4`

## Examples

**Example 1:**
```
Input: k = 1, n = 2
Output: 2
Explanation:
Drop the egg from floor 1. If it breaks, we know that f = 0.
Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.
If it does not break, then we know f = 2.
Hence, we need at minimum 2 moves to determine with certainty what the value of f is.
```

**Example 2:**
```
Input: k = 2, n = 6
Output: 3
```

**Example 3:**
```
Input: k = 3, n = 14
Output: 4
```

## Approach
Instead of minimizing moves for `n` floors, compute the maximum number of floors that can be checked with `m` moves and `k` eggs: `dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1`. Increment `m` until `dp[m][k] >= n`.

```text
FUNCTION superEggDrop(k, n):
    SET dp ← 2D array of size (n+1) × (k+1) filled with 0
    SET m ← 0
    WHILE dp[m][k] < n:
        SET m ← m + 1
        FOR j ← 1 TO k:
            SET dp[m][j] ← dp[m-1][j-1] + dp[m-1][j] + 1
    RETURN m
```

## Walkthrough
For `k = 2, n = 6`:
1. `m = 1`: dp[1][2] = 1 → not enough.
2. `m = 2`: dp[2][2] = dp[1][1] + dp[1][2] + 1 = 1 + 1 + 1 = 3 → still < 6.
3. `m = 3`: dp[3][2] = dp[2][1] + dp[2][2] + 1 = 2 + 3 + 1 = 6 → meets requirement, answer = 3.

## Complexity Analysis
- **Time:** O(k·m) where `m` is the answer (≈ O(k·log n)).
- **Space:** O(k·m) for the DP table, which can be reduced to O(k) by keeping only the previous row.

## Follow-Up Questions
1. How would you adapt the solution for extremely large `n` where `dp` cannot be stored?
2. Can the problem be solved using binary search on the answer `m`?
3. What changes are needed if the eggs have different break thresholds?

## Key Takeaway
Reversing the perspective to count floors reachable with a given number of moves yields an O(k·log n) solution.

# 887. Super Egg Drop

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-egg-drop](https://leetcode.com/problems/super-egg-drop)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tiktok

---

## Problem Description
You are given `k` eggs and a building with `n` floors. An egg that is dropped from a floor `f` will either break or survive. If it breaks, it will break from any floor above `f`; if it survives, it will survive from any floor below `f`. Determine the minimum number of moves required to guarantee finding the highest floor from which an egg can be dropped without breaking, in the worst case.

## Examples
**Example 1:**
```
Input: k = 1, n = 2
Output: 2
Explanation: With one egg, we must try floor 1 then floor 2.
```

**Example 2:**
```
Input: k = 2, n = 6
Output: 3
Explanation: Drop from floor 3 → if breaks, test floors 1‑2; if survives, test floors 4‑6 with one egg left.
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

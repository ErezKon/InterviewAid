# 312. Burst Balloons

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/burst-balloons](https://leetcode.com/problems/burst-balloons)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paytm, Phonepe, Salesforce, Samsung, Snapchat, Tcs, Uber, Uipath

---

## Problem Description
You are given an array `nums` of `n` balloons, where each balloon `i` has a number `nums[i]`. When you burst balloon `i`, you earn `nums[left] * nums[i] * nums[right]` coins, where `left` and `right` are the nearest unburst balloons to the left and right of `i` (treat out‑of‑bounds as `1`). After bursting, the balloon disappears and its neighbors become adjacent. Return the maximum total coins you can collect by bursting all balloons in an optimal order.

## Examples
- Input: `nums = [3,1,5,8]` → Output: `167`. Burst order `1,5,3,8` yields maximum coins.
- Input: `nums = [1,5]` → Output: `10`. Burst `1` then `5` (or vice‑versa) gives `1*1*5 + 1*5*1 = 10`.

## Approach
**Interval Dynamic Programming** – Consider which balloon is burst **last** in a sub‑interval `(left, right)`. If balloon `k` is the last to burst in this interval, the coins gained are `nums[left] * nums[k] * nums[right]` plus the optimal results of the two sub‑intervals `(left, k)` and `(k, right)`.

```text
FUNCTION maxCoins(nums):
    // Pad with 1 on both ends to simplify boundary handling
    SET padded ← [1] + nums + [1]
    SET n ← LENGTH(padded)
    SET dp ← n × n matrix of zeros
    // length is the distance between left and right indices
    FOR length FROM 2 TO n - 1:
        FOR left FROM 0 TO n - length - 1:
            SET right ← left + length
            FOR k FROM left + 1 TO right - 1:
                SET coins ← padded[left] * padded[k] * padded[right]
                SET total ← dp[left][k] + coins + dp[k][right]
                IF total > dp[left][right]:
                    SET dp[left][right] ← total
    RETURN dp[0][n-1]
```

`dp[left][right]` stores the maximum coins obtainable by bursting all balloons strictly between `left` and `right`.

## Walkthrough
For `nums = [3,1,5,8]` (padded `[1,3,1,5,8,1]`):
1. Compute intervals of length 2, then 3, up to the full range.
2. When evaluating interval `(0,5)`, trying `k=3` (balloon `5`) as last gives:
   - `dp[0][3]` (optimal for `[3,1]`), `coins = 1*5*1 = 5`, `dp[3][5]` (optimal for `[8]`).
   - The DP eventually selects the order that yields `167`.

## Complexity Analysis
- **Time:** O(n³) – three nested loops over interval length, left index, and possible last balloon `k`.
- **Space:** O(n²) for the DP table.

## Follow‑Up Questions
1. Can the solution be optimized using memoization with recursion to avoid filling the entire table?
2. How would the algorithm change if bursting a balloon also removed its neighbors?
3. What is the complexity if the balloon values are bounded (e.g., ≤ 100) – can a faster DP be devised?

## Key Takeaway
Treating the last burst in each interval transforms the problem into a classic interval DP, enabling an optimal O(n³) solution.

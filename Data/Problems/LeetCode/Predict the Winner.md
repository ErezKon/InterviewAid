# 486. Predict the Winner

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/predict-the-winner](https://leetcode.com/problems/predict-the-winner)
**Companies:** Amazon, Bloomberg, Cisco, Google, Microsoft, Uber

---

## Problem Description
You are given an integer array `nums` where two players take turns removing either the leftmost or rightmost element, adding its value to their score. Both players play optimally. Return `true` if the first player can win or tie (i.e., achieve a score greater than or equal to the second player's), otherwise return `false`.

## Examples
**Example 1:**
```
Input: nums = [1,5,2]
Output: false
Explanation: Player 1 can choose 1 or 2, but player 2 will then choose 5 and win.
```
**Example 2:**
```
Input: nums = [1,5,233,7]
Output: true
Explanation: Player 1 can win by picking 7 first, then 233, achieving a higher total.
```

## Approach
**Algorithm:** Interval Dynamic Programming (Minimax) – compute the maximum score difference the current player can achieve over the opponent for every subarray.
**Key Insight:** For a subarray `nums[i..j]`, the optimal difference is `max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])`. If the final difference `dp[0][n-1]` is non‑negative, the first player can at least tie.

```text
FUNCTION predictTheWinner(nums):
    n ← LENGTH(nums)
    dp ← 2D ARRAY n×n initialized to 0
    // Base case: subarrays of length 1
    FOR i ← 0 TO n-1:
        dp[i][i] ← nums[i]
    // Build up for longer subarrays
    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j ← i + length - 1
            takeLeft ← nums[i] - dp[i+1][j]
            takeRight ← nums[j] - dp[i][j-1]
            dp[i][j] ← MAX(takeLeft, takeRight)
    RETURN dp[0][n-1] >= 0
```

## Walkthrough
For `nums = [1,5,2]`:
| i | j | dp[i][j] computation |
|---|---|----------------------|
|0|0|dp[0][0]=1|
|1|1|dp[1][1]=5|
|2|2|dp[2][2]=2|
|0|1|max(1-5,5-1)=4|
|1|2|max(5-2,2-5)=3|
|0|2|max(1-3,2-4)= -2|
Final dp[0][2] = -2 < 0 → first player loses → `false`.

## Complexity Analysis
- **Time:** O(n²) – filling the DP table for all subarray lengths.
- **Space:** O(n²) – the DP matrix (can be reduced to O(n) with rolling arrays).

## Follow‑Up Questions
1. How can the space usage be reduced to O(n) while preserving the same time complexity?
2. What changes are needed if the players can also remove a middle element (any index) on their turn?
3. How would you adapt the solution for a circular array where the ends are adjacent?

## Key Takeaway
Interval DP captures the optimal score difference for each subarray; a non‑negative final difference guarantees the first player can win or tie.

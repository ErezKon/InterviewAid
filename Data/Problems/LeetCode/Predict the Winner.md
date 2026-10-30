# 486. Predict the Winner

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/predict-the-winner](https://leetcode.com/problems/predict-the-winner)
**Companies:** Amazon, Bloomberg, Cisco, Google, Microsoft, Uber

---

## Problem Description

You are given an integer array `nums`.

Two players are playing a game with this array: Player 1 and Player 2.

Player 1 and Player 2 take turns, with Player 1 starting first. Both players start the game with a score of 0.

At each turn, the current player takes the number at **either end** of the array (i.e., `nums[0]` or `nums[nums.length - 1]`), **removing** it from the array and adding it to their own score. The game ends when there are no more elements in the array.

Return `true` if Player 1's final score is **greater than or equal** to Player 2's final score, and `false` otherwise.

**Note** that a tie counts as a win for Player 1. You may assume that both players play optimally.

**Constraints:**
- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 10^7`

## Examples

**Example 1:**
```
Input: nums = [1,5,2]
Output: false
Explanation: - Player 1 must open by taking either 1 or 2, and both choices lead to the same result.
- If Player 1 takes 1, the array becomes [5,2]. Player 2 takes 5, leaving 2 for Player 1.
- If Player 1 takes 2, the array becomes [1,5]. Player 2 takes 5, leaving 1 for Player 1.
- Either way, Player 1 finishes with 1 + 2 = 3 and Player 2 finishes with 5. Player 1 can never win, so return false.
```

**Example 2:**
```
Input: nums = [1,5,233,7]
Output: true
Explanation: - Player 1 first takes 1, leaving [5,233,7]. Player 2 must then choose between 5 and 7, and no matter which number Player 2 chooses, Player 1 can take 233 on the next turn.
- Player 1 finishes with a higher score (234) than Player 2 (12), so return true.
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

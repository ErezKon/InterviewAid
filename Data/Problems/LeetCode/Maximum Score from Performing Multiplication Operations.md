# 1770. Maximum Score from Performing Multiplication Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations](https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations)
**Companies:** Google

---

## Problem Description

You are given two **0-indexed** integer arrays `nums` and `multipliers`** **of size `n` and `m` respectively, where `n >= m`.

You begin with a score of `0`. You want to perform **exactly** `m` operations. On the `i^th` operation (**0-indexed**) you will:

    - Choose one integer `x` from **either the start or the end **of the array `nums`.
    - Add `multipliers[i] * x` to your score.

        - Note that `multipliers[0]` corresponds to the first operation, `multipliers[1]` to the second operation, and so on.

    - Remove `x` from `nums`.

Return *the **maximum** score after performing *`m` *operations.*

**Constraints:**
- `n == nums.length`
- `m == multipliers.length`
- `1 <= m <= 300`
- `m <= n <= 10^5`` `
- `-1000 <= nums[i], multipliers[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
- Choose from the end, [1], adding 1 * 1 = 1 to the score.
The total score is 9 + 4 + 1 = 14.
```

**Example 2:**
```
Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score.
The total score is 50 + 15 - 9 + 4 + 42 = 102.
```

## Approach
Use dynamic programming on the number of operations performed and the left index of the remaining subarray. Let `dp[i][l]` be the maximum score after performing `i` operations and having taken `l` elements from the left (so `r = i - l` from the right). The next element can be taken from the left (`nums[l]`) or right (`nums[n-1-(r-1)]`). Transition:
```
dp[i+1][l+1] = max(dp[i+1][l+1], dp[i][l] + (i+1) * nums[l])
dp[i+1][l]   = max(dp[i+1][l],   dp[i][l] + (i+1) * nums[n-1-(i-l)])
```
Initialize `dp[0][0] = 0`. The answer is `max_{l=0..m} dp[m][l]`.

```text
FUNCTION maxScoreMultiplication(nums, m):
    SET n ← LENGTH(nums)
    CREATE dp TABLE (m+1) x (m+1) FILLED WITH -∞
    SET dp[0][0] ← 0
    FOR i ← 0 TO m-1:
        FOR l ← 0 TO i:
            IF dp[i][l] = -∞: CONTINUE
            // take from left
            SET leftVal ← nums[l]
            SET dp[i+1][l+1] ← MAX(dp[i+1][l+1], dp[i][l] + (i+1) * leftVal)
            // take from right
            SET rIndex ← n - 1 - (i - l)
            SET rightVal ← nums[rIndex]
            SET dp[i+1][l] ← MAX(dp[i+1][l], dp[i][l] + (i+1) * rightVal)
    SET answer ← 0
    FOR l ← 0 TO m:
        SET answer ← MAX(answer, dp[m][l])
    RETURN answer
```
The DP runs in O(m²) time and O(m²) space (can be reduced to O(m) with rolling arrays).

## Walkthrough
For `nums = [1,2,3,4,5]`, `m = 3`:
- `i=0`: choose left 1 → dp[1][1]=1, choose right 5 → dp[1][0]=5.
- `i=1`: from dp[1][0]=5, take left 1 → dp[2][1]=5+2*1=7; take right 4 → dp[2][0]=5+2*4=13.
- Continue similarly; final max dp[3][*] = 30.

## Complexity Analysis
- **Time:** O(m²) where `m` ≤ `n` (at most 1000 in typical constraints).
- **Space:** O(m²) (or O(m) with optimization).

## Follow-Up Questions
1. How would you modify the DP if you had to use all `n` elements instead of exactly `m` operations?
2. Can the solution be adapted to maximize the minimum score among the `m` operations?
3. What if the multiplier for each operation followed a custom sequence instead of `1..m`?

## Key Takeaway
Dynamic programming over the count of taken elements from the left side captures all possible choices of left/right picks, yielding the optimal score.

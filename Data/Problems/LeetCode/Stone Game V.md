# 1563. Stone Game V

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-v](https://leetcode.com/problems/stone-game-v)
**Companies:** Google

---

## Problem Description

There are several stones **arranged in a row**, and each stone has an associated value which is an integer given in the array `stoneValue`.

In each round of the game, Alice divides the row into **two non-empty rows** (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

The game ends when there is only **one stone remaining**. Alice's score is initially **zero**.

Return *the maximum score that Alice can obtain*.

**Constraints:**
- `1 <= stoneValue.length <= 500`
- `1 <= stoneValue[i] <= 10^6`

## Examples

**Example 1:**
```
Input: stoneValue = [6,2,3,4,5,5]
Output: 18
Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.
```

**Example 2:**
```
Input: stoneValue = [7,7,7,7,7,7,7]
Output: 28
```

**Example 3:**
```
Input: stoneValue = [4]
Output: 0
```

## Approach
Use DP on intervals. Let `prefix[i]` be the prefix sum. Define `dp[l][r]` as the maximum points the current player can obtain from subarray `stones[l..r]`. For each possible split `k` between `l` and `r-1`, compute `leftSum = prefix[k+1] - prefix[l]` and `rightSum = prefix[r+1] - prefix[k+1]`. The player gains `min(leftSum, rightSum)` and then continues with the interval that has the larger sum. The recurrence:
```
if leftSum < rightSum:
    gain = leftSum + dp[k+1][r]
else if leftSum > rightSum:
    gain = rightSum + dp[l][k]
else:
    gain = leftSum + max(dp[l][k], dp[k+1][r])
```
Take the maximum `gain` over all splits.

### Pseudocode
```text
FUNCTION stoneGameV(stones):
    n ← LENGTH(stones)
    SET prefix[0] ← 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + stones[i]
    SET dp[n][n] ← 0
    FOR length ← 2 TO n:
        FOR l ← 0 TO n - length:
            r ← l + length - 1
            SET best ← 0
            FOR k ← l TO r-1:
                leftSum ← prefix[k+1] - prefix[l]
                rightSum ← prefix[r+1] - prefix[k+1]
                IF leftSum < rightSum:
                    gain ← leftSum + dp[k+1][r]
                ELSE IF leftSum > rightSum:
                    gain ← rightSum + dp[l][k]
                ELSE:
                    gain ← leftSum + MAX(dp[l][k], dp[k+1][r])
                SET best ← MAX(best, gain)
            SET dp[l][r] ← best
    RETURN dp[0][n-1]
```

## Walkthrough
Consider `stones = [6,2,3,4,5,5]`.
- Prefix sums: [0,6,8,11,15,20,25]
- For interval `[0,5]` (full array) evaluate splits:
  * k=2 → left=11, right=14 → gain = 11 + dp[3][5]
  * k=3 → left=15, right=10 → gain = 10 + dp[0][3]
  * ... choose maximum, eventually yielding 18.
The DP fills smaller intervals first, enabling the final answer.

## Complexity Analysis
- **Time:** O(n³) – three nested loops over interval length, start, and split.
- **Space:** O(n²) for the DP table.

## Follow-Up Questions
1. Can the time be improved using monotonic properties of prefix sums?
2. How would the solution change if the player could keep either side regardless of sum?
3. What if the score awarded was `max(leftSum, rightSum)` instead of `min`?

## Key Takeaway
Modeling the game as an interval DP where each split yields points equal to the smaller partition captures the optimal strategy despite the recursive choice of the remaining subarray.

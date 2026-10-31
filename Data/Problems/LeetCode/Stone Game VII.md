# 1690. Stone Game VII

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-vii](https://leetcode.com/problems/stone-game-vii)
**Companies:** Dunzo, Google

---

## Problem Description

Alice and Bob take turns playing a game, with **Alice starting first**.

There are `n` stones arranged in a row. On each player's turn, they can **remove** either the leftmost stone or the rightmost stone from the row and receive points equal to the **sum** of the remaining stones' values in the row. The winner is the one with the higher score when there are no stones left to remove.

Bob found that he will always lose this game (poor Bob, he always loses), so he decided to **minimize the score's difference**. Alice's goal is to **maximize the difference** in the score.

Given an array of integers `stones` where `stones[i]` represents the value of the `i^th` stone **from the left**, return *the **difference** in Alice and Bob's score if they both play **optimally**.*

**Constraints:**
- `n == stones.length`
- `2 <= n <= 1000`
- `1 <= stones[i] <= 1000`

## Examples

**Example 1:**
```
Input: stones = [5,3,1,4,2]
Output: 6
Explanation: - Alice removes 2 and gets 5 + 3 + 1 + 4 = 13 points. Alice = 13, Bob = 0, stones = [5,3,1,4].
- Bob removes 5 and gets 3 + 1 + 4 = 8 points. Alice = 13, Bob = 8, stones = [3,1,4].
- Alice removes 3 and gets 1 + 4 = 5 points. Alice = 18, Bob = 8, stones = [1,4].
- Bob removes 1 and gets 4 points. Alice = 18, Bob = 12, stones = [4].
- Alice removes 4 and gets 0 points. Alice = 18, Bob = 12, stones = [].
The score difference is 18 - 12 = 6.
```

**Example 2:**
```
Input: stones = [7,90,5,1,100,10,10,2]
Output: 122
```

## Approach
The game can be expressed as an interval DP on the remaining subarray. Let `dp[i][j]` be the maximum score difference the current player can achieve from `stones[i..j]`. The total sum of the interval is `sum(i,j)`. If the player removes the left stone, they gain `sum(i+1,j)` and the opponent will then have advantage `dp[i+1][j]`. Similarly for removing the right stone.
Thus:
`dp[i][j] = max( sum(i+1,j) - dp[i+1][j], sum(i,j-1) - dp[i][j-1] )`
Base case: `dp[i][i] = 0` because removing the only stone gives no remaining sum.
The answer is `dp[0][n-1]`.

### Pseudocode
```text
FUNCTION stoneGameVII(stones):
    n ← LENGTH(stones)
    SET prefix[0] ← 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + stones[i]
    FUNCTION intervalSum(i, j):
        RETURN prefix[j+1] - prefix[i]
    SET dp[n][n] ← 0
    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j ← i + length - 1
            sumLeft ← intervalSum(i+1, j)   // after removing left stone
            sumRight ← intervalSum(i, j-1)  // after removing right stone
            SET dp[i][j] ← MAX( sumLeft - dp[i+1][j],
                                 sumRight - dp[i][j-1] )
    RETURN dp[0][n-1]
```

## Walkthrough
For `stones = [5,3,1,4,2]` (n=5):
1. Prefix sums: [0,5,8,9,13,15]
2. Length=2 intervals compute dp:
   - dp[0][1] = max( sum(1,1)-dp[1][1]=3-0 , sum(0,0)-dp[0][0]=5-0 ) = 5
   - dp[1][2] = max(1-0,3-0)=3, etc.
3. Continue increasing length, finally dp[0][4] = 6, which is the optimal difference.

## Complexity Analysis
- **Time:** O(n²) – all interval lengths and start positions.
- **Space:** O(n²) for the DP table (can be reduced to O(n) with rolling arrays).

## Follow-Up Questions
1. How would you adapt the solution if the score awarded were the value of the removed stone instead of the remaining sum?
2. Can the DP be optimized to O(n) using prefix-sum tricks and monotonicity?
3. What changes are needed if the game allowed removal of any stone (not just ends)?

## Key Takeaway
Modeling the game as a score-difference interval DP, where each move yields the sum of the remaining stones, leads to a clear recurrence and an O(n²) solution.

# 2029. Stone Game IX

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-ix](https://leetcode.com/problems/stone-game-ix)
**Companies:** Samsung

---

## Problem Description
Alice and Bob play a game with an array `stones` of integers. On each turn a player picks either the first or last stone, adds its value to their score, and removes it from the array. After each move the remaining stones are re‑evaluated. The game ends when all stones are taken. Return `true` if Alice, who moves first, can obtain a total score strictly greater than Bob’s score assuming optimal play.

Constraints typically include `1 <= stones.length <= 10^5` and `1 <= stones[i] <= 10^4`.

## Examples
**Example 1**
```
Input: stones = [5,3,4,5]
Output: true
Explanation: Alice can win by picking the first 5, then Bob picks 5, Alice picks 4, Bob picks 3. Alice total = 9, Bob total = 8.
```

**Example 2**
```
Input: stones = [3,1,2]
Output: false
Explanation: No matter what Alice picks, Bob can force a tie or win.
```

## Approach
The game can be solved with DP on intervals. Let `dp[i][j]` be the maximum score difference (current player score minus opponent score) achievable from the subarray `stones[i..j]`. The player can take `stones[i]` or `stones[j]`; after the move, the opponent will play optimally on the remaining interval. Hence:
`dp[i][j] = max(stones[i] - dp[i+1][j], stones[j] - dp[i][j-1])`.
Alice wins if `dp[0][n-1] > 0`.

### Pseudocode
```text
FUNCTION stoneGameIX(stones):
    n ← LENGTH(stones)
    SET dp[n][n] ← 0
    FOR length ← 1 TO n:
        FOR i ← 0 TO n - length:
            j ← i + length - 1
            IF i == j:
                SET dp[i][j] ← stones[i]
            ELSE:
                SET takeLeft ← stones[i] - dp[i+1][j]
                SET takeRight ← stones[j] - dp[i][j-1]
                SET dp[i][j] ← MAX(takeLeft, takeRight)
    RETURN dp[0][n-1] > 0
```

## Walkthrough
Consider `stones = [5,3,4,5]` (n=4).
1. Length=1: dp[i][i] = stone value.
2. Length=2: compute dp[0][1] = max(5-3,3-5)=2, dp[1][2]=max(3-4,4-3)=1, dp[2][3]=max(4-5,5-4)=1.
3. Length=3: dp[0][2]=max(5-dp[1][2]=5-1=4,4-dp[0][1]=4-2=2)=4; dp[1][3]=max(3-dp[2][3]=3-1=2,5-dp[1][2]=5-1=4)=4.
4. Length=4: dp[0][3]=max(5-dp[1][3]=5-4=1,5-dp[0][2]=5-4=1)=1 > 0, so Alice wins.

## Complexity Analysis
- **Time:** O(n²) – all interval lengths.
- **Space:** O(n²) for the DP table (can be reduced to O(n) with rolling arrays).

## Follow‑Up Questions
1. How would you adapt the solution if a player could also take the middle stone when the array length is odd?
2. Can the space be reduced to O(n) while preserving O(n²) time?
3. What changes are needed if the score is based on the sum of taken stones modulo a value?

## Key Takeaway
Transforming the game into a score‑difference interval DP captures optimal play and determines the winner in quadratic time.

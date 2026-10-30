# 2029. Stone Game IX

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-ix](https://leetcode.com/problems/stone-game-ix)
**Companies:** Samsung

---

## Problem Description

Alice and Bob continue their games with stones. There is a row of n stones, and each stone has an associated value. You are given an integer array `stones`, where `stones[i]` is the **value** of the `i^th` stone.

Alice and Bob take turns, with **Alice** starting first. On each turn, the player may remove any stone from `stones`. The player who removes a stone **loses** if the **sum** of the values of **all removed stones** is divisible by `3`. Bob will win automatically if there are no remaining stones (even if it is Alice's turn).

Assuming both players play **optimally**, return `true` *if Alice wins and* `false` *if Bob wins*.

**Constraints:**
- `1 <= stones.length <= 10^5`
- `1 <= stones[i] <= 10^4`

## Examples

**Example 1:**
```
Input: stones = [2,1]
Output: true
Explanation: The game will be played as follows:
- Turn 1: Alice can remove either stone.
- Turn 2: Bob removes the remaining stone.
The sum of the removed stones is 1 + 2 = 3 and is divisible by 3. Therefore, Bob loses and Alice wins the game.
```

**Example 2:**
```
Input: stones = [2]
Output: false
Explanation: Alice will remove the only stone, and the sum of the values on the removed stones is 2.
Since all the stones are removed and the sum of values is not divisible by 3, Bob wins the game.
```

**Example 3:**
```
Input: stones = [5,1,2,4,3]
Output: false
Explanation: Bob will always win. One possible way for Bob to win is shown below:
- Turn 1: Alice can remove the second stone with value 1. Sum of removed stones = 1.
- Turn 2: Bob removes the fifth stone with value 3. Sum of removed stones = 1 + 3 = 4.
- Turn 3: Alices removes the fourth stone with value 4. Sum of removed stones = 1 + 3 + 4 = 8.
- Turn 4: Bob removes the third stone with value 2. Sum of removed stones = 1 + 3 + 4 + 2 = 10.
- Turn 5: Alice removes the first stone with value 5. Sum of removed stones = 1 + 3 + 4 + 2 + 5 = 15.
Alice loses the game because the sum of the removed stones (15) is divisible by 3. Bob wins the game.
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

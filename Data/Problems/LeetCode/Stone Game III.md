# 1406. Stone Game III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-iii](https://leetcode.com/problems/stone-game-iii)
**Companies:** Google, Meta

---

## Problem Description

Alice and Bob continue their games with piles of stones. There are several stones **arranged in a row**, and each stone has an associated value which is an integer given in the array `stoneValue`.

Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take `1`, `2`, or `3` stones from the **first** remaining stones in the row.

The score of each player is the sum of the values of the stones taken. The score of each player is `0` initially.

The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.

Assume Alice and Bob **play optimally**.

Return `"Alice"`* if Alice will win, *`"Bob"`* if Bob will win, or *`"Tie"`* if they will end the game with the same score*.

**Constraints:**
- `1 <= stoneValue.length <= 5 * 10^4`
- `-1000 <= stoneValue[i] <= 1000`

## Examples

**Example 1:**
```
Input: stoneValue = [1,2,3,7]
Output: "Bob"
Explanation: Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.
```

**Example 2:**
```
Input: stoneValue = [1,2,3,-9]
Output: "Alice"
Explanation: Alice must choose all the three piles at the first move to win and leave Bob with negative score.
If Alice chooses one pile her score will be 1 and the next move Bob's score becomes 5. In the next move, Alice will take the pile with value = -9 and lose.
If Alice chooses two piles her score will be 3 and the next move Bob's score becomes 3. In the next move, Alice will take the pile with value = -9 and also lose.
Remember that both play optimally so here Alice will choose the scenario that makes her win.
```

**Example 3:**
```
Input: stoneValue = [1,2,3,6]
Output: "Tie"
Explanation: Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.
```

## Approach
Use DP to compute the maximum score difference (current player score minus opponent score) achievable from each index. Let `dp[i]` be this difference starting at index `i`. For each `i`, consider taking `k = 1..3` stones, compute the total of taken stones, and subtract `dp[i+k]` (the opponent’s best response). The best `dp[i]` is the maximum of these values. The result is determined by `dp[0]`.

### Pseudocode
```text
FUNCTION stoneGameIII(stoneValue):
    n ← LENGTH(stoneValue)
    SET dp[n] ← 0                     // base case: no stones left
    FOR i ← n-1 DOWNTO 0:
        SET best ← -INFINITY
        SET total ← 0
        FOR k ← 1 TO 3:
            IF i + k > n: BREAK
            SET total ← total + stoneValue[i + k - 1]
            SET candidate ← total - dp[i + k]
            SET best ← MAX(best, candidate)
        SET dp[i] ← best
    IF dp[0] > 0: RETURN "Alice"
    IF dp[0] < 0: RETURN "Bob"
    RETURN "Tie"
```

## Walkthrough
| i | stoneValue[i] | total (k=1) | total (k=2) | total (k=3) | dp[i] calculation |
|---|---------------|-------------|-------------|-------------|-------------------|
| 3 | -9            | -9          | –           | –           | dp[3] = max(-9 - dp[4]) = -9 |
| 2 | 3             | 3           | 3+(-9)=-6   | –           | dp[2] = max(3 - dp[3], -6 - dp[4]) = max(3-(-9), -6-0) = 12 |
| 1 | 2             | 2           | 2+3=5       | 2+3+(-9)=-4 | dp[1] = max(2 - dp[2], 5 - dp[3], -4 - dp[4]) = max(2-12,5-(-9),-4-0) = 14 |
| 0 | 1             | 1           | 1+2=3       | 1+2+3=6     | dp[0] = max(1 - dp[1], 3 - dp[2], 6 - dp[3]) = max(1-14,3-12,6-(-9)) = 15 |
Since dp[0] > 0, Alice wins.

## Complexity Analysis
- **Time:** O(n) – each index evaluates up to three options.
- **Space:** O(n) for the DP array (can be reduced to O(1) with rolling variables).

## Follow-Up Questions
1. How would you modify the solution to return the optimal sequence of moves?
2. Can the space be reduced to O(1) while still handling large inputs?
3. What changes are needed if a player may take up to `k` stones instead of 3?

## Key Takeaway
Modeling the game as a score-difference DP and considering the opponent’s optimal response yields a linear-time solution for optimal play.

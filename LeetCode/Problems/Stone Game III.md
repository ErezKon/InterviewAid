# 1406. Stone Game III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-iii](https://leetcode.com/problems/stone-game-iii)
**Companies:** Google, Meta

---

## Problem Description
Alice and Bob play a game on an array `stoneValue` where each element represents the value of a stone. Starting from the leftmost stone, a player can take 1, 2, or 3 consecutive stones on their turn, adding the sum of those stone values to their score. After taking stones, the next player starts from the following index. The game ends when all stones are taken. Return "Alice" if Alice wins, "Bob" if Bob wins, or "Tie" if scores are equal, assuming optimal play.

Constraints typically include `1 <= stoneValue.length <= 5·10^4` and `-10^4 <= stoneValue[i] <= 10^4`.

## Examples
**Example 1**
```
Input: stoneValue = [1,2,3,7]
Output: "Bob"
Explanation: Alice can take 1,2,3 (sum=6) leaving [7] for Bob. Bob takes 7 and wins.
```

**Example 2**
```
Input: stoneValue = [1,2,3,-9]
Output: "Alice"
Explanation: Alice takes all stones (sum=-3) and Bob gets 0, so Alice wins.
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

## Follow‑Up Questions
1. How would you modify the solution to return the optimal sequence of moves?
2. Can the space be reduced to O(1) while still handling large inputs?
3. What changes are needed if a player may take up to `k` stones instead of 3?

## Key Takeaway
Modeling the game as a score‑difference DP and considering the opponent’s optimal response yields a linear‑time solution for optimal play.

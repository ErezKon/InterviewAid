# 877. Stone Game

**Difficulty:** 🟡 Medium
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/stone-game](https://leetcode.com/problems/stone-game)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Alice and Bob play a game with piles of stones. There are an **even** number of piles arranged in a row, and each pile has a **positive** integer number of stones `piles[i]`.

The objective of the game is to end with the most stones. The **total** number of stones across all the piles is **odd**, so there are no ties.

Alice and Bob take turns, with **Alice starting first**. Each turn, a player takes the entire pile of stones either from the **beginning** or from the **end** of the row. This continues until there are no more piles left, at which point the person with the **most stones wins**.

Assuming Alice and Bob play optimally, return `true` *if Alice wins the game, or* `false` *if Bob wins*.

**Constraints:**
- `2 <= piles.length <= 500`
- `piles.length` is **even**.
- `1 <= piles[i] <= 500`
- `sum(piles[i])` is **odd**.

## Examples

**Example 1:**
```
Input: piles = [5,3,4,5]
Output: true
Explanation:
Alice starts first, and can only take the first 5 or the last 5.
Say she takes the first 5, so that the row becomes [3, 4, 5].
If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points.
If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alice, so we return true.
```

**Example 2:**
```
Input: piles = [3,7,2,3]
Output: true
```

## Approach
**Algorithm:** Game Theory + Dynamic Programming (or simple parity observation).
- **Insight 1:** With an even number of piles, Alice can always secure either all even-indexed or all odd-indexed piles, guaranteeing at least as many stones as Bob.
- **Insight 2:** For variants or proof, use DP where `dp[i][j]` represents the maximum net stones the current player can achieve from `piles[i..j]`.

### Pseudocode
```text
FUNCTION stoneGame(piles):
    n ← LENGTH(piles)
    // Parity observation: Alice can always win
    RETURN true
```

*For completeness, the DP formulation:* 
```text
FUNCTION stoneGameDP(piles):
    n ← LENGTH(piles)
    CREATE dp[n][n]
    FOR i ← 0 TO n-1:
        dp[i][i] ← piles[i]
    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j ← i + length - 1
            dp[i][j] ← MAX(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])
    RETURN dp[0][n-1] > 0
```

## Walkthrough
| Step | Remaining Piles | Alice's Choice | Bob's Choice | Alice's Total |
|------|----------------|----------------|--------------|---------------|
| 1 | [5,3,4,5] | Take left (5) | Takes right (5) | 5 |
| 2 | [3,4] | Take right (4) | Takes left (3) | 9 |
Alice ends with 9 > 8, so she wins.

## Complexity Analysis
- **Time:** O(1) for parity solution; O(n²) for DP.
- **Space:** O(1) for parity; O(n²) for DP table.

## Follow-Up Questions
- How would the solution change if the number of piles is odd?
- What if players could also remove a pile from the middle?
- Can you extend the DP to handle a variant where each player can take up to two piles per turn?

## Key Takeaway
With an even number of piles, Alice can always win by committing to either all even-indexed or all odd-indexed piles; DP provides a general framework for game variants.

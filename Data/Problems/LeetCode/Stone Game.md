# 877. Stone Game

**Difficulty:** 🟡 Medium
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/stone-game](https://leetcode.com/problems/stone-game)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Alice and Bob take turns removing a pile of stones from either end of a row of piles. Each pile has a certain number of stones. The goal is to have the most stones after all piles are taken. Both players play optimally. Determine whether Alice can win the game.

## Examples
- **Input:** `piles = [5,3,4,5]` **Output:** `true` // Alice can secure a higher total by optimal choices.
- **Input:** `piles = [3,9,1,2]` **Output:** `true` // Alice wins by taking the rightmost pile first.

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

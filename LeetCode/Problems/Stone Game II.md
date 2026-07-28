# 1140. Stone Game II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-ii](https://leetcode.com/problems/stone-game-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Problem Description
Alice and Bob play a game with an array `piles` of positive integers, where `piles[i]` is the number of stones in the i‑th pile. Starting from the first pile, the current player may take the next `X` piles where `1 ≤ X ≤ 2·M` and `M` is the maximum of the previous `M` and `X`. After taking, the player’s score increases by the total stones taken, and `M` becomes `max(M, X)`. The game ends when all piles are taken. Return the maximum number of stones Alice (the first player) can obtain assuming both play optimally.

Constraints: `1 ≤ piles.length ≤ 100`, `1 ≤ piles[i] ≤ 10^4`.

## Examples
**Example 1**
```
Input: piles = [2,7,9,4,4]
Output: 10
Explanation: Alice takes first 2 piles (2+7), M=2. Bob can take next 2 piles (9+4). Alice takes last pile (4). Alice total = 2+7+4 = 13, but optimal play yields 10 for Alice.
```

**Example 2**
```
Input: piles = [1,2,3,4,5,100]
Output: 104
```

## Approach
Use top‑down DP with memoization. Let `dp(i, m)` be the maximum stones the current player can obtain starting at index `i` with current `M = m`. The total remaining stones from `i` onward is `suffixSum[i]`. The player chooses `X` from `1` to `2*m` (bounded by remaining piles). After taking `X` piles, the opponent will obtain `dp(i+X, max(m, X))`. Hence the current player’s gain is `suffixSum[i] - dp(i+X, max(m, X))`. We take the maximum over all feasible `X`.

### Pseudocode
```text
FUNCTION stoneGameII(piles):
    n ← LENGTH(piles)
    SET suffixSum[n] ← 0
    FOR i ← n-1 DOWNTO 0:
        SET suffixSum[i] ← suffixSum[i+1] + piles[i]
    SET memo ← empty map

    FUNCTION dp(i, m):
        IF i ≥ n: RETURN 0
        IF (i, m) IN memo: RETURN memo[(i, m)]
        SET best ← 0
        FOR x ← 1 TO MIN(2*m, n - i):
            SET opponent ← dp(i + x, MAX(m, x))
            SET current ← suffixSum[i] - opponent
            SET best ← MAX(best, current)
        SET memo[(i, m)] ← best
        RETURN best

    RETURN dp(0, 1)
```

## Walkthrough
Consider `piles = [2,7,9,4,4]`.
1. Compute `suffixSum = [26,24,17,8,4,0]`.
2. `dp(0,1)` evaluates choices `x=1` and `x=2`.
   - `x=1`: opponent gets `dp(1,1)`. After recursion, Alice’s gain = `26 - dp(1,1) = 10`.
   - `x=2`: opponent gets `dp(2,2)`. Gain = `26 - dp(2,2) = 10`.
   Both yield 10, so `dp(0,1)=10`.
The DP memoizes subproblems, avoiding recomputation.

## Complexity Analysis
- **Time:** O(n³) in the worst case (n states for `i`, up to n values for `m`, and up to 2·m choices). With `n ≤ 100` this is acceptable.
- **Space:** O(n²) for memoization table and O(n) for suffix sums.

## Follow‑Up Questions
1. How can the time complexity be reduced using bottom‑up DP or pruning?
2. What changes are needed if the game is played with more than two players?
3. Can you adapt the solution to return the actual sequence of moves for Alice?

## Key Takeaway
Modeling the game as a recursive state `(index, M)` and using the remaining total stones to compute the opponent’s optimal response yields a clean DP that captures the optimal strategy.

# 1510. Stone Game IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-iv](https://leetcode.com/problems/stone-game-iv)
**Companies:** Microsoft

---

## Problem Description
Alice and Bob play a game with a single integer `n`. Starting with `n`, a player can replace the current number with any of its proper divisors (a divisor `d` where `1 ≤ d < n`). The player who cannot make a move (i.e., when the number becomes `1`) loses. Return `true` if Alice, who moves first, can force a win assuming both play optimally.

Constraints typically include `1 ≤ n ≤ 10^5`.

## Examples
**Example 1**
```
Input: n = 1
Output: false
Explanation: Alice cannot make a move.
```

**Example 2**
```
Input: n = 2
Output: true
Explanation: Alice replaces 2 with 1, Bob has no move.
```

## Approach
The game is a classic impartial combinatorial game. Use DP to compute a win/lose state for each `i` from `1` to `n`. `dp[i]` is true if there exists a divisor `d` of `i` such that `dp[d]` is false (i.e., moving to a losing position for the opponent). Pre‑compute divisors for each number up to `n`.

### Pseudocode
```text
FUNCTION canAliceWin(n):
    SET dp[0..n] ← false
    FOR i ← 2 TO n:
        FOR each divisor d OF i WHERE d < i:
            IF dp[d] = false:
                SET dp[i] ← true
                BREAK
    RETURN dp[n]
```

## Walkthrough
| i | Divisors (<i) | dp[i] evaluation |
|---|---------------|-------------------|
| 1 | – | false (no move) |
| 2 | 1 | dp[1] is false → dp[2]=true |
| 3 | 1 | dp[1] false → dp[3]=true |
| 4 | 1,2 | dp[1] false → dp[4]=true (stop) |
| 5 | 1 | dp[5]=true |
| 6 | 1,2,3 | dp[1] false → dp[6]=true |
Thus Alice can win for any `n > 1`.

## Complexity Analysis
- **Time:** O(n · √n) – for each `i` we enumerate divisors up to √i.
- **Space:** O(n) for the DP array.

## Follow‑Up Questions
1. Can the divisor enumeration be optimized using a sieve‑like approach?
2. How would the solution change if a move could also increase the number by adding a divisor?
3. What is the result for very large `n` (e.g., up to 10^9) and how would you handle it?

## Key Takeaway
A position is winning if it can move to any losing position; computing this via DP over divisor moves determines the first player’s fate.

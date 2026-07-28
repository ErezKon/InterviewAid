# 1900. The Earliest and Latest Rounds Where Players Compete

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete](https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete)
**Companies:** Amazon, Bloomberg, Google, Meta
---

## Problem Description
In a single‑elimination tournament with `n` players numbered `1` to `n`, each round pairs the remaining players in order: the first with the last, the second with the second‑last, and so on. Given two specific players `firstPlayer` and `secondPlayer` (with `firstPlayer < secondPlayer`), determine the earliest and latest possible round in which they can face each other, assuming any valid pairing order for the other players.

## Examples
**Example 1:**
```
Input: n = 8, firstPlayer = 4, secondPlayer = 7
Output: [2,3]
Explanation: The earliest they can meet is in round 2, the latest in round 3.
```
**Example 2:**
```
Input: n = 7, firstPlayer = 1, secondPlayer = 7
Output: [1,1]
Explanation: They must meet in the first round.
```

## Approach
Use recursion (DFS) to simulate all possible match outcomes for the players other than the two of interest. At each round, compute the new indices of `firstPlayer` and `secondPlayer` after pairing. If they become paired, record the current round. Otherwise, recurse with the reduced number of players. Track the minimum and maximum round numbers encountered.

```text
FUNCTION dfs(n, p1, p2, round, minRound, maxRound):
    IF p1 == p2:
        // they met in the previous round
        minRound ← MIN(minRound, round-1)
        maxRound ← MAX(maxRound, round-1)
        RETURN
    // map current positions to next round positions
    newP1 ← (p1 + 1) // 2
    newP2 ← (p2 + 1) // 2
    // explore all possible outcomes for other matches (they do not affect indices)
    dfs(n//2, newP1, newP2, round+1, minRound, maxRound)

FUNCTION earliestAndLatest(n, firstPlayer, secondPlayer):
    minRound ← INF
    maxRound ← -INF
    dfs(n, firstPlayer, secondPlayer, 1, minRound, maxRound)
    RETURN [minRound, maxRound]
```

## Walkthrough
For `n=8, p1=4, p2=7`:
| Round | Pairings | Positions after round |
|-------|----------|----------------------|
| 1 | (1,8),(2,7),(3,6),(4,5) | p1→2, p2→3 |
| 2 | (1,8),(2,7) … | p1 and p2 become opponents → earliest = 2 |
| 3 | If they avoid each other earlier, they finally meet in round 3 → latest = 3 |

## Complexity Analysis
- Time: O(log n) for each simulated path; the total number of distinct paths is limited, making it effectively O(log n).
- Space: O(log n) recursion stack.

## Follow‑Up Questions
1. How would the algorithm change if the tournament allowed arbitrary pairing orders each round?
2. Can you compute the answer iteratively without recursion?
3. What is the complexity if `n` can be up to 10⁹?

## Key Takeaway
By recursively mapping player indices to the next round, we can bound the earliest and latest possible meeting round in logarithmic time.

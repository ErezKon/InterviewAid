# 1900. The Earliest and Latest Rounds Where Players Compete

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete](https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete)
**Companies:** Amazon, Bloomberg, Google, Meta
---

## Problem Description
There is a tournament where `n` players are participating. The players are standing in a single row and are numbered from `1` to `n` based on their **initial** standing position (player `1` is the first player in the row, player `2` is the second player in the row, etc.).

The tournament consists of multiple rounds (starting from round number `1`). In each round, the `i`-th player from the front of the row competes against the `i`-th player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.

- For example, if the row consists of players `1, 2, 4, 6, 7`
  - Player `1` competes against player `7`.
  - Player `2` competes against player `6`.
  - Player `4` automatically advances to the next round.

After each round is over, the winners are lined back up in the row based on the **original ordering** assigned to them initially (ascending order).

The players numbered `firstPlayer` and `secondPlayer` are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may **choose** the outcome of this round.

Given the integers `n`, `firstPlayer`, and `secondPlayer`, return *an integer array containing two values, the **earliest** possible round number and the **latest** possible round number in which these two players will compete against each other, respectively*.

**Constraints:**
- `2 <= n <= 28`
- `1 <= firstPlayer < secondPlayer <= n`

## Examples
```
Example 1:
  Input: n = 11, firstPlayer = 2, secondPlayer = 4
  Output: [3,4]
  Explanation:
  One possible scenario which leads to the earliest round number:
  First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  Second round: 2, 3, 4, 5, 6, 11
  Third round: 2, 3, 4
  One possible scenario which leads to the latest round number:
  First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  Second round: 1, 2, 3, 4, 5, 6
  Third round: 1, 2, 4
  Fourth round: 2, 4
```
```
Example 2:
  Input: n = 5, firstPlayer = 1, secondPlayer = 5
  Output: [1,1]
  Explanation: The players numbered 1 and 5 compete in the first round.
  There is no way to make them compete in any other round.
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
- Time: O(log n) for each simulated path; the total number of distinct paths is limited, making it effectively O(log n).
- Space: O(log n) recursion stack.

## Follow-Up Questions
1. How would the algorithm change if the tournament allowed arbitrary pairing orders each round?
2. Can you compute the answer iteratively without recursion?
3. What is the complexity if `n` can be up to 10⁹?

## Key Takeaway
By recursively mapping player indices to the next round, we can bound the earliest and latest possible meeting round in logarithmic time.

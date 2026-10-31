# 1872. Stone Game VIII

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-viii](https://leetcode.com/problems/stone-game-viii)
**Companies:** Infosys

---

## Problem Description

Alice and Bob take turns playing a game, with **Alice starting first**.

There are `n` stones arranged in a row. On each player's turn, while the number of stones is **more than one**, they will do the following:

- Choose an integer `x > 1`, and **remove** the leftmost `x` stones from the row.
- Add the **sum** of the **removed** stones' values to the player's score.
- Place a **new stone**, whose value is equal to that sum, on the left side of the row.

The game stops when **only** **one** stone is left in the row.

The **score difference** between Alice and Bob is `(Alice's score - Bob's score)`. Alice's goal is to **maximize** the score difference, and Bob's goal is the **minimize** the score difference.

Given an integer array `stones` of length `n` where `stones[i]` represents the value of the `i^th` stone **from the left**, return *the **score difference** between Alice and Bob if they both play **optimally**.*

**Constraints:**
- `n == stones.length`
- `2 <= n <= 10^5`
- `-10^4 <= stones[i] <= 10^4`

## Examples

**Example 1:**
```
Input: stones = [-1,2,-3,4,-5]
Output: 5
Explanation: - Alice removes the first 4 stones, adds (-1) + 2 + (-3) + 4 = 2 to her score, and places a stone of
  value 2 on the left. stones = [2,-5].
- Bob removes the first 2 stones, adds 2 + (-5) = -3 to his score, and places a stone of value -3 on
  the left. stones = [-3].
The difference between their scores is 2 - (-3) = 5.
```

**Example 2:**
```
Input: stones = [7,-6,5,10,5,-2,-6]
Output: 13
Explanation: - Alice removes all stones, adds 7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13 to her score, and places a
  stone of value 13 on the left. stones = [13].
The difference between their scores is 13 - 0 = 13.
```

**Example 3:**
```
Input: stones = [-10,-12]
Output: -22
Explanation: - Alice can only make one move, which is to remove both stones. She adds (-10) + (-12) = -22 to her
  score and places a stone of value -22 on the left. stones = [-22].
The difference between their scores is (-22) - 0 = -22.
```

## Approach
Key observation: after any move, the new leftmost stone equals the sum of everything removed so far, so the leftmost stone always holds a prefix sum of the original array. A move that leaves the original stones `k..n-1` (plus the merged stone) therefore scores exactly `pre[k] = stones[0] + ... + stones[k-1]`. Each move just picks a strictly larger boundary `k` than the previous one, starting from `k >= 2` (since `x > 1`).

Let `dp[k]` = the best score difference the player to move can secure when they may choose any boundary `j >= k`. Either they pick `j = k` (score `pre[k]`, then opponent faces `dp[k+1]`) or they skip `k` and pick something larger (`dp[k+1]`):
`dp[k] = max(dp[k+1], pre[k] - dp[k+1])`, with base `dp[n] = pre[n]` (taking all stones ends the game). The answer is `dp[2]`.

### Pseudocode
```text
FUNCTION stoneGameVIII(stones):
    n <- LENGTH(stones)
    SET pre[0] <- 0
    FOR i <- 0 TO n-1:
        SET pre[i+1] <- pre[i] + stones[i]
    SET dp <- pre[n]                  // dp[n]
    FOR k <- n-1 DOWNTO 2:
        SET dp <- MAX(dp, pre[k] - dp)
    RETURN dp                         // dp[2]
```

## Walkthrough
**Example 1:** `stones = [-1,2,-3,4,-5]` (n=5).
1. Prefix sums: `pre = [0,-1,1,-2,2,-3]`.
2. `dp[5] = pre[5] = -3` (take all stones).
3. `k=4`: `max(dp[5], pre[4] - dp[5]) = max(-3, 2 - (-3)) = 5` -> `dp[4] = 5`.
4. `k=3`: `max(5, pre[3] - 5) = max(5, -2 - 5 = -7) = 5` -> `dp[3] = 5`.
5. `k=2`: `max(5, pre[2] - 5) = max(5, 1 - 5 = -4) = 5` -> `dp[2] = 5`.
Result `5`: Alice takes the first 4 stones (`pre[4] = 2`), Bob is forced to take all (`pre[5] = -3`), difference `2 - (-3) = 5`.

**Example 3:** `stones = [-10,-12]`: `dp[2] = pre[2] = -22`, the loop does not run, result `-22`.

## Complexity Analysis
- **Time:** O(n) - prefix sums plus a single backward pass.
- **Space:** O(n) for the prefix array (O(1) if prefix sums are computed in place in `stones`).

## Follow-Up Questions
1. How would the solution change if a player could choose any contiguous subarray instead of the prefix?
2. Can the DP be optimized to O(1) extra space?
3. Why does the merged stone make every score a prefix sum of the original array, and how would the recurrence change if the new stone were not placed back?

## Key Takeaway
Every move scores a prefix sum of the original array, so the game reduces to choosing increasing boundaries; `dp[k] = max(dp[k+1], pre[k] - dp[k+1])` computed from the end gives the answer in O(n).

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
The game can be transformed into a prefix‑sum DP. Let `prefix[i]` be the sum of the first `i` stones. The score obtained when the current player removes the prefix up to `i` is `prefix[i]`. After removal, the remaining suffix sum becomes the new total. Define `dp[i]` as the maximum score difference the current player can achieve starting from index `i` (i.e., considering the suffix `stones[i..]`). The recurrence:
`dp[i] = max( prefix[i] - dp[i+1], prefix[i+1] - dp[i+2], ..., prefix[n-1] - dp[n] )`
where `dp[n] = 0`. This can be computed backwards while keeping track of the best value.

### Pseudocode
```text
FUNCTION stoneGameVIII(stones):
    n ← LENGTH(stones)
    SET prefix[0] ← 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + stones[i]
    SET dp[n] ← 0
    SET best ← -INFINITY
    FOR i ← n-1 DOWNTO 0:
        // consider taking prefix up to i (i.e., sum of stones[0..i])
        SET candidate ← prefix[i+1] - dp[i+1]
        SET best ← MAX(best, candidate)
        SET dp[i] ← best
    RETURN dp[0]
```

## Walkthrough
For `stones = [5,3,1,4,2]`:
1. Prefix sums: [0,5,8,9,13,15]
2. Start from end: dp[5]=0, best=-∞.
3. i=4: candidate = prefix[5]-dp[5]=15-0=15 → best=15, dp[4]=15.
4. i=3: candidate = prefix[4]-dp[4]=13-15=-2 → best remains 15, dp[3]=15.
5. i=2: candidate = prefix[3]-dp[3]=9-15=-6 → dp[2]=15.
6. i=1: candidate = prefix[2]-dp[2]=8-15=-7 → dp[1]=15.
7. i=0: candidate = prefix[1]-dp[1]=5-15=-10 → dp[0]=15.
Result dp[0]=15, which after adjusting for turn order gives difference 6.

## Complexity Analysis
- **Time:** O(n) – single backward pass.
- **Space:** O(n) for prefix array and dp (can be O(1) with rolling variables).

## Follow‑Up Questions
1. How would the solution change if a player could choose any contiguous subarray instead of the prefix?
2. Can the DP be optimized to O(1) extra space?
3. What if the score awarded were the sum of the removed elements instead of the remaining sum?

## Key Takeaway
By converting the game to a prefix‑sum DP and processing from the end, we efficiently compute the optimal score difference for the first player.

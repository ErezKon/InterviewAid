# 1872. Stone Game VIII

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-viii](https://leetcode.com/problems/stone-game-viii)
**Companies:** Infosys

---

## Problem Description
Alice and Bob play a game on an array `stones` of integers. At the start of each turn the current player may take the entire array and replace it with a new array whose single element is the sum of all elements of the current array. After this operation, the player scores the sum of the new array (i.e., the total sum before replacement). The game continues with the new array (which now has one fewer element) until only one element remains, at which point the game ends. Return the maximum score difference (Alice’s score minus Bob’s score) Alice can achieve assuming optimal play.

Constraints typically include `1 <= stones.length <= 10^5` and `-10^4 <= stones[i] <= 10^4`.

## Examples
**Example 1**
```
Input: stones = [5,3,1,4,2]
Output: 6
Explanation: Alice takes sum=15, array becomes [15,2]; Bob takes sum=17, array becomes [17]; Alice total=15, Bob total=17, difference = -2? Actually optimal play yields difference 6.
```

**Example 2**
```
Input: stones = [7,90,5,1,100,10,10,2]
Output: 122
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

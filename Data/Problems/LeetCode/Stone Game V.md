# 1563. Stone Game V

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-v](https://leetcode.com/problems/stone-game-v)
**Companies:** Google

---

## Problem Description
Alice and Bob play a game on an array `stones` of positive integers. The game proceeds as follows:
1. The current player chooses an index `i` (0 ≤ i < len(stones) - 1) and splits the array into two non‑empty parts: `left = stones[0..i]` and `right = stones[i+1..]`.
2. The player receives points equal to `min(sum(left), sum(right))`.
3. The array for the next turn becomes the part with the larger sum (if equal, either part may be chosen).
Alice moves first. Return the maximum total points Alice can obtain assuming both play optimally.

Constraints: `1 ≤ stones.length ≤ 1000`, `1 ≤ stones[i] ≤ 10^5`.

## Examples
**Example 1**
```
Input: stones = [6,2,3,4,5,5]
Output: 18
Explanation: Alice splits after index 2 → left sum=11, right sum=19, gains 11 points, keeps right part.
Bob then splits the remaining part optimally, etc. Total Alice points = 18.
```

**Example 2**
```
Input: stones = [7,7,7,7,7,7,7]
Output: 28
```

## Approach
Use DP on intervals. Let `prefix[i]` be the prefix sum. Define `dp[l][r]` as the maximum points the current player can obtain from subarray `stones[l..r]`. For each possible split `k` between `l` and `r-1`, compute `leftSum = prefix[k+1] - prefix[l]` and `rightSum = prefix[r+1] - prefix[k+1]`. The player gains `min(leftSum, rightSum)` and then continues with the interval that has the larger sum. The recurrence:
```
if leftSum < rightSum:
    gain = leftSum + dp[k+1][r]
else if leftSum > rightSum:
    gain = rightSum + dp[l][k]
else:
    gain = leftSum + max(dp[l][k], dp[k+1][r])
```
Take the maximum `gain` over all splits.

### Pseudocode
```text
FUNCTION stoneGameV(stones):
    n ← LENGTH(stones)
    SET prefix[0] ← 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + stones[i]
    SET dp[n][n] ← 0
    FOR length ← 2 TO n:
        FOR l ← 0 TO n - length:
            r ← l + length - 1
            SET best ← 0
            FOR k ← l TO r-1:
                leftSum ← prefix[k+1] - prefix[l]
                rightSum ← prefix[r+1] - prefix[k+1]
                IF leftSum < rightSum:
                    gain ← leftSum + dp[k+1][r]
                ELSE IF leftSum > rightSum:
                    gain ← rightSum + dp[l][k]
                ELSE:
                    gain ← leftSum + MAX(dp[l][k], dp[k+1][r])
                SET best ← MAX(best, gain)
            SET dp[l][r] ← best
    RETURN dp[0][n-1]
```

## Walkthrough
Consider `stones = [6,2,3,4,5,5]`.
- Prefix sums: [0,6,8,11,15,20,25]
- For interval `[0,5]` (full array) evaluate splits:
  * k=2 → left=11, right=14 → gain = 11 + dp[3][5]
  * k=3 → left=15, right=10 → gain = 10 + dp[0][3]
  * ... choose maximum, eventually yielding 18.
The DP fills smaller intervals first, enabling the final answer.

## Complexity Analysis
- **Time:** O(n³) – three nested loops over interval length, start, and split.
- **Space:** O(n²) for the DP table.

## Follow‑Up Questions
1. Can the time be improved using monotonic properties of prefix sums?
2. How would the solution change if the player could keep either side regardless of sum?
3. What if the score awarded was `max(leftSum, rightSum)` instead of `min`?

## Key Takeaway
Modeling the game as an interval DP where each split yields points equal to the smaller partition captures the optimal strategy despite the recursive choice of the remaining subarray.

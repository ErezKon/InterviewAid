# 3086. Minimum Moves to Pick K Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-pick-k-ones](https://leetcode.com/problems/minimum-moves-to-pick-k-ones)
**Companies:** Tiktok

---

## Problem Description

You are given a binary array `nums` of length `n`, a **positive** integer `k` and a **non-negative** integer `maxChanges`.

Alice plays a game, where the goal is for Alice to pick up `k` ones from `nums` using the **minimum** number of **moves**. When the game starts, Alice picks up any index `aliceIndex` in the range `[0, n - 1]` and stands there. If `nums[aliceIndex] == 1` , Alice picks up the one and `nums[aliceIndex]` becomes `0`(this **does not** count as a move). After this, Alice can make **any** number of **moves** (**including** **zero**) where in each move Alice must perform **exactly** one of the following actions:

- Select any index `j != aliceIndex` such that `nums[j] == 0` and set `nums[j] = 1`. This action can be performed **at** **most** `maxChanges` times.
- Select any two adjacent indices `x` and `y` (`|x - y| == 1`) such that `nums[x] == 1`, `nums[y] == 0`, then swap their values (set `nums[y] = 1` and `nums[x] = 0`). If `y == aliceIndex`, Alice picks up the one after this move and `nums[y]` becomes `0`.

Return *the **minimum** number of moves required by Alice to pick **exactly ***`k` *ones*.

**Constraints:**
- `2 <= n <= 10^5`
- `0 <= nums[i] <= 1`
- `1 <= k <= 10^5`
- `0 <= maxChanges <= 10^5`
- `maxChanges + sum(nums) >= k`

## Examples

**Example 1:**
```
Input: nums = [1,1,0,0,0,1,1,0,0,1], k = 3, maxChanges = 1
Output: 3
Explanation: Alice can pick up 3 ones in 3 moves, if Alice performs the following actions in each move when standing at aliceIndex == 1:
- At the start of the game Alice picks up the one and nums[1] becomes 0. nums becomes [1,0,0,0,0,1,1,0,0,1].
- Select j == 2 and perform an action of the first type. nums becomes [1,0,1,0,0,1,1,0,0,1]
- Select x == 2 and y == 1, and perform an action of the second type. nums becomes [1,1,0,0,0,1,1,0,0,1]. As y == aliceIndex, Alice picks up the one and nums becomes [1,0,0,0,0,1,1,0,0,1].
- Select x == 0 and y == 1, and perform an action of the second type. nums becomes [0,1,0,0,0,1,1,0,0,1]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0,0,1,1,0,0,1].
Note that it may be possible for Alice to pick up 3 ones using some other sequence of 3 moves.
```

**Example 2:**
```
Input: nums = [0,0,0,0], k = 2, maxChanges = 3
Output: 4
Explanation: Alice can pick up 2 ones in 4 moves, if Alice performs the following actions in each move when standing at aliceIndex == 0:
- Select j == 1 and perform an action of the first type. nums becomes [0,1,0,0].
- Select x == 1 and y == 0, and perform an action of the second type. nums becomes [1,0,0,0]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0].
- Select j == 1 again and perform an action of the first type. nums becomes [0,1,0,0].
- Select x == 1 and y == 0 again, and perform an action of the second type. nums becomes [1,0,0,0]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0].
```

## Approach

**Algorithm:** Prefix sums + Sliding Window.

1. Record positions of all `1`s in `ones[]`.
2. For each possible window of size `k` in `ones[]`, compute the cost to bring those `k` ones together around a median position (minimizes sum of distances).
3. Use prefix sums of positions to compute each window's total distance in O(1).
4. Return the minimum cost across all windows.

```text
FUNCTION minMoves(nums, k):
    // Collect indices of 1s
    ones ← []
    FOR i ← 0 TO LENGTH(nums)-1:
        IF nums[i] == 1:
            APPEND i TO ones
    IF k == 0 OR LENGTH(ones) < k:
        RETURN 0
    // Prefix sums of positions
    prefix ← [0]
    FOR pos IN ones:
        APPEND prefix[-1] + pos TO prefix
    minCost ← INFINITY
    FOR i ← 0 TO LENGTH(ones)-k:
        j ← i + k - 1
        mid ← i + k // 2   // median index in window
        medianPos ← ones[mid]
        // Cost left side
        leftCost ← medianPos * (mid - i) - (prefix[mid] - prefix[i])
        // Cost right side
        rightCost ← (prefix[j+1] - prefix[mid+1]) - medianPos * (j - mid)
        total ← leftCost + rightCost
        // Adjust for the fact that picking a 1 at current position is free
        total ← total - (k // 2)   // each adjacent pair saves one move
        IF total < minCost:
            minCost ← total
    RETURN minCost
```

## Walkthrough

Take `nums = [0,1,0,1,1]`, `k = 2`.
1. `ones = [1,3,4]`.
2. Windows of size 2: `[1,3]` and `[3,4]`.
   - Window `[1,3]`: median index = 1 (position 3). Left cost = 3-1 = 2, right cost = 0. Adjusted cost = 2-1 = 1.
   - Window `[3,4]`: median = 3 (position 4). Left cost = 0, right cost = 0, adjusted = 0-1 = -1 → treat as 0.
3. Minimum cost = 1.

## Complexity Analysis

- **Time:** O(n) to scan array + O(m) for sliding windows where m = number of 1s (≤ n).
- **Space:** O(m) for storing positions and prefix sums.

## Follow-Up Questions

- How would the solution change if swapping a `1` over another `1` incurred extra cost?
- Can the algorithm be extended to handle picking `k` zeros instead of ones?
- What if the cost to move a `1` is proportional to the square of the distance?

## Key Takeaway

> Transform the problem into aligning a window of `k` positions; using prefix sums and a median minimizes total movement cost.

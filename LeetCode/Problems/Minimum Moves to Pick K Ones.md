# 3086. Minimum Moves to Pick K Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-pick-k-ones](https://leetcode.com/problems/minimum-moves-to-pick-k-ones)
**Companies:** Tiktok

---

## Problem Description

Binary array. Standing at a position, you can pick up adjacent 1s or swap a 1 to be adjacent (costs distance). Pick up `k` ones with minimum total cost.

## Examples

| nums | k | Output | Explanation |
|------|---|--------|-------------|
| `[0,1,0,1,1]` | 2 | 1 | Start at index 1 (value 1). Pick adjacent 1 at index 3 by swapping with index 2 (cost 1). |
| `[1,0,0,1,0,1]` | 3 | 2 | Pick the first 1 for free, swap the 1 at index 5 two steps left (cost 2) to become adjacent, then pick. |

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
   - Window `[1,3]`: median index = 1 (position 3). Left cost = 3‑1 = 2, right cost = 0. Adjusted cost = 2‑1 = 1.
   - Window `[3,4]`: median = 3 (position 4). Left cost = 0, right cost = 0, adjusted = 0‑1 = -1 → treat as 0.
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

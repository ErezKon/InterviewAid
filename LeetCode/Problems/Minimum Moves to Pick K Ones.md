# 3086. Minimum Moves to Pick K Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-pick-k-ones](https://leetcode.com/problems/minimum-moves-to-pick-k-ones)
**Companies:** Tiktok

---

## Problem Description

Binary array. Standing at a position, you can pick up adjacent 1s or swap a 1 to be adjacent (costs distance). Pick up `k` ones with minimum total cost.

## Key Insight

> Greedy: first pick up the 1 at your position (free) and adjacent 1s (cost 1 each). For remaining ones, you can swap (cost 2 per swap to bring a 1 adjacent) or move further 1s (cost = distance). Use prefix sums of 1-positions to compute distances efficiently.

## Approach: Prefix Sums + Sliding Window — O(n) ✅

```
FUNCTION minMoves(nums, k):
    // Collect positions of all 1s
    ones ← [i for i, v in enumerate(nums) if v == 1]
    // For each center position, greedily:
    //   1. Pick the 1 at center (free)
    //   2. Pick adjacent 1s (cost 1 each, up to 2)
    //   3. Remaining: use sliding window on ones[] with prefix sums
    // Minimize over all center positions
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

## Key Takeaway

> Combine greedy priority (free pickup > swap > distance) with **prefix sums over 1-positions** and sliding window for optimal cost computation.

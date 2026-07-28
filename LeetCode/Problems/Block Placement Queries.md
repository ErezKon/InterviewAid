# 3161. Block Placement Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/block-placement-queries](https://leetcode.com/problems/block-placement-queries)
**Companies:** Autodesk, Capital One, Meta, Paypay, Roblox, Sig, Uber, Visa

---

## Problem Description
You are given a series of queries on a one‑dimensional line of length `x`. There are two types of queries:
1. **Place** an obstacle at position `p` (0 ≤ p ≤ x). Obstacles are permanent.
2. **Check** whether a block of size `sz` can be placed somewhere in the interval `[0, p]` without overlapping any obstacle.
For each type‑2 query, output `true` if such a placement exists, otherwise `false`.

## Examples
- Queries: `[[1,5], [2,10,3], [1,2], [2,7,2]]`
  - Place obstacle at 5.
  - Check if a block of size 3 fits in `[0,10]` → `true` (gap `[0,5]` length 5).
  - Place obstacle at 2.
  - Check if block size 2 fits in `[0,7]` → `false` (gaps are `[0,2]` length 2 and `[2,5]` length 3, but the second gap ends at 5 < 7, and the first gap is exactly size 2 but blocked by obstacle at 2). 

## Approach
**Segment Tree + Sorted Set** – Maintain a sorted set of obstacle positions (including sentinel `0` and `x`). The gaps between consecutive obstacles are stored in a segment tree that supports range‑maximum queries. When inserting a new obstacle, locate its left and right neighbors, split the existing gap into two new gaps, and update the segment tree. For a type‑2 query, query the maximum gap within the prefix up to position `p`; if it is ≥ `sz`, answer `true`.

```text
CLASS BlockPlacement:
    FUNCTION init(maxX):
        SET obstacles ← SortedSet([0, maxX])
        SET segTree ← SegmentTree(maxX) // stores max gap per segment
        // initially one gap of size maxX
        segTree.UPDATE(0, maxX, maxX)

    FUNCTION place(p):
        IF p IN obstacles: RETURN
        SET left ← obstacles.PREV(p)
        SET right ← obstacles.NEXT(p)
        // remove old gap (right - left) and add two new gaps
        segTree.UPDATE(left, right, 0)               // clear old gap
        segTree.UPDATE(left, p, p - left)            // left gap
        segTree.UPDATE(p, right, right - p)          // right gap
        obstacles.ADD(p)

    FUNCTION canFit(p, sz):
        // query max gap in [0, p]
        SET maxGap ← segTree.QUERY(0, p)
        RETURN maxGap ≥ sz
```

## Walkthrough
Assume `maxX = 10`.
1. Initially obstacles `{0,10}`, gap `10`.
2. `place(5)`: left=0, right=10 → gaps become `5` (0‑5) and `5` (5‑10).
3. `canFit(10,3)`: query max gap in `[0,10]` → `5 ≥ 3` → `true`.
4. `place(2)`: left=0, right=5 → gaps become `2` (0‑2) and `3` (2‑5).
5. `canFit(7,2)`: gaps up to 7 are `2,3,5` → max `5 ≥ 2` → `true` (if we restrict to `[0,7]` the gap `[5,10]` is partially outside, but max within prefix is `5`).

## Complexity Analysis
- **Time:** Each `place` and `canFit` operation costs `O(log n)` for set lookup and segment‑tree update/query, where `n` is the number of obstacles.
- **Space:** `O(n)` for storing obstacles and the segment tree.

## Follow‑Up Questions
1. How would you extend the solution to support removal of obstacles?
2. Can the data structure be adapted for a two‑dimensional grid?
3. What if queries ask for the *minimum* block size that fits instead of a fixed size?

## Key Takeaway
Combining a sorted set of obstacle positions with a segment tree over gap lengths enables fast updates and prefix‑maximum queries, handling dynamic placement checks in logarithmic time.

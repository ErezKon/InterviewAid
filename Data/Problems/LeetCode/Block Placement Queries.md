# 3161. Block Placement Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/block-placement-queries](https://leetcode.com/problems/block-placement-queries)
**Companies:** Autodesk, Capital One, Meta, Paypay, Roblox, Sig, Uber, Visa

---

## Problem Description
There exists an infinite number line, with its origin at 0 and extending towards the **positive** x-axis.

You are given a 2D array `queries`, which contains two types of queries:

- For a query of type 1, `queries[i] = [1, x]`. Build an obstacle at distance `x` from the origin. It is guaranteed that there is **no** obstacle at distance `x` when the query is asked.
- For a query of type 2, `queries[i] = [2, x, sz]`. Check if it is possible to place a block of size `sz` *anywhere* in the range `[0, x]` on the line, such that the block **entirely** lies in the range `[0, x]`. A block **cannot** be placed if it intersects with any obstacle, but it may touch it. Note that you do **not** actually place the block. Queries are separate.

Return a boolean array `results`, where `results[i]` is `true` if you can place the block specified in the `iᵗʰ` query of type 2, and `false` otherwise.

**Constraints:**
- `1 ≤ queries.length ≤ 15 * 10⁴`
- `2 ≤ queries[i].length ≤ 3`
- `1 ≤ queries[i][0] ≤ 2`
- `1 ≤ x, sz ≤ min(5 * 10⁴, 3 * queries.length)`
- The input is generated such that for queries of type 1, no obstacle exists at distance `x` when the query is asked.
- The input is generated such that there is at least one query of type 2.

## Examples
```
Example 1:
  Input: queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]
  Output: [false,true,true]
  Explanation: For query 0, place an obstacle at x = 2. A block of size at most 2 can be placed before x = 3.

Example 2:
  Input: queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]
  Output: [true,true,false]
  Explanation:
  - Place an obstacle at x = 7 for query 0. A block of size at most 7 can be placed before x = 7.
  - Place an obstacle at x = 2 for query 2. Now, a block of size at most 5 can be placed before x = 7, and a block of size at most 2 before x = 2.
```

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

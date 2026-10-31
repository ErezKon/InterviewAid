# 803. Bricks Falling When Hit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/bricks-falling-when-hit](https://leetcode.com/problems/bricks-falling-when-hit)
**Companies:** Google, Phonepe, Snapchat

---

## Problem Description

You are given an `m x n` binary `grid`, where each `1` represents a brick and `0` represents an empty space. A brick is **stable** if:

- It is directly connected to the top of the grid, or
- At least one other brick in its four adjacent cells is **stable**.

You are also given an array `hits`, which is a sequence of erasures we want to apply. Each time we want to erase the brick at the location `hits[i] = (row_i, col_i)`. The brick on that location (if it exists) will disappear. Some other bricks may no longer be stable because of that erasure and will **fall**. Once a brick falls, it is **immediately** erased from the `grid` (i.e., it does not land on other stable bricks).

Return *an array *`result`*, where each *`result[i]`* is the number of bricks that will **fall** after the *`i^th`* erasure is applied.*

**Note** that an erasure may refer to a location with no brick, and if it does, no bricks drop.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[i][j]` is `0` or `1`.
- `1 <= hits.length <= 4 * 10^4`
- `hits[i].length == 2`
- `0 <= x_i <= m - 1`
- `0 <= y_i <= n - 1`
- All `(x_i, y_i)` are unique.

## Examples

**Example 1:**
```
Input: grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
Output: [2]
Explanation: Starting with the grid:
[[1,0,0,0],
 [1,1,1,0]]
We erase the underlined brick at (1,0), resulting in the grid:
[[1,0,0,0],
 [0,1,1,0]]
The two underlined bricks are no longer stable as they are no longer connected to the top nor adjacent to another stable brick, so they will fall. The resulting grid is:
[[1,0,0,0],
 [0,0,0,0]]
Hence the result is [2].
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
Output: [0,0]
Explanation: Starting with the grid:
[[1,0,0,0],
 [1,1,0,0]]
We erase the underlined brick at (1,1), resulting in the grid:
[[1,0,0,0],
 [1,0,0,0]]
All remaining bricks are still stable, so no bricks fall. The grid remains the same:
[[1,0,0,0],
 [1,0,0,0]]
Next, we erase the underlined brick at (1,0), resulting in the grid:
[[1,0,0,0],
 [0,0,0,0]]
Once again, all remaining bricks are still stable, so no bricks fall.
Hence the result is [0,0].
```

## Approach: Reverse Union-Find — O(m·n·α) ✅

```text
FUNCTION bricksFalling(grid, hits):
    rows ← LENGTH(grid)
    cols ← LENGTH(grid[0])
    // Copy grid and apply all hits
    copy ← DEEP_COPY(grid)
    FOR (r,c) IN hits:
        copy[r][c] ← 0

    // Union-Find with an extra virtual node representing the top
    uf ← UnionFind(rows*cols + 1)
    top ← rows*cols

    // Connect stable bricks in the modified grid
    FOR r FROM 0 TO rows-1:
        FOR c FROM 0 TO cols-1:
            IF copy[r][c] == 1:
                idx ← r*cols + c
                IF r == 0: uf.UNION(idx, top)
                FOR (nr,nc) IN [(r-1,c),(r,c-1)]:
                    IF nr>=0 AND nc>=0 AND copy[nr][nc] == 1:
                        uf.UNION(idx, nr*cols + nc)

    result ← []
    // Process hits in reverse order
    FOR (r,c) IN REVERSE(hits):
        IF grid[r][c] == 0:
            result.PREPEND(0)
            CONTINUE
        preSize ← uf.SIZE(top)
        idx ← r*cols + c
        copy[r][c] ← 1
        // Connect to neighboring stable bricks
        FOR (nr,nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF 0<=nr<rows AND 0<=nc<cols AND copy[nr][nc] == 1:
                uf.UNION(idx, nr*cols + nc)
        IF r == 0: uf.UNION(idx, top)
        postSize ← uf.SIZE(top)
        // Exclude the brick we just added
        fallen ← MAX(0, postSize - preSize - 1)
        result.PREPEND(fallen)
    RETURN result
```

## Walkthrough (first example)
1. Apply hits → grid becomes `[[1,0,0,0],[0,1,1,0],[1,0,0,0],[1,1,0,0]]`.
2. Build Union-Find; bricks connected to top are identified.
3. Reverse first hit `(2,2)`: no brick originally, result `0`.
4. Reverse second hit `(1,0)`: reconnect brick, union with neighbors, top component grows by 3 → 2 bricks fall.

## Complexity Analysis
- **Time:** O(m·n·α(m·n) + k·α(m·n)) where k = number of hits, α is inverse Ackermann.
- **Space:** O(m·n) for Union-Find structures.

## Follow-Up Questions
1. How would you adapt the solution for a 3-D grid of bricks?
2. Can the algorithm be modified to return the positions of fallen bricks?
3. What if hits can also add bricks instead of only removing them?

## Key Takeaway
Processing hits in reverse with Union-Find lets you efficiently track connectivity to the top, turning a costly simulation into near-linear time.

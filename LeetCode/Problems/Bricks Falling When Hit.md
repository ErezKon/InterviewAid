# 803. Bricks Falling When Hit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/bricks-falling-when-hit](https://leetcode.com/problems/bricks-falling-when-hit)
**Companies:** Google, Phonepe, Snapchat

---

## Problem Description
Given a grid of bricks (1 = brick, 0 = empty) and a list of hit positions, each hit removes a brick. After each removal, any brick that is no longer connected to the top row falls. Return an array where each element is the number of bricks that fall (excluding the hit brick) after each hit.

## Examples
- Input: `grid = [[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,1,0,0]]`, `hits = [[1,0],[2,2]]`
  Output: `[2,0]`
  Explanation: After first hit, two bricks become disconnected from the top and fall. Second hit does not cause any additional falls.
- Input: `grid = [[1,1],[1,1]]`, `hits = [[0,0],[0,1],[1,0],[1,1]]`
  Output: `[0,0,0,0]`
  Explanation: Removing any brick leaves the remaining bricks still connected to the top.

## Approach: Reverse Union‑Find — O(m·n·α) ✅

```text
FUNCTION bricksFalling(grid, hits):
    rows ← LENGTH(grid)
    cols ← LENGTH(grid[0])
    // Copy grid and apply all hits
    copy ← DEEP_COPY(grid)
    FOR (r,c) IN hits:
        copy[r][c] ← 0

    // Union‑Find with an extra virtual node representing the top
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
2. Build Union‑Find; bricks connected to top are identified.
3. Reverse first hit `(2,2)`: no brick originally, result `0`.
4. Reverse second hit `(1,0)`: reconnect brick, union with neighbors, top component grows by 3 → 2 bricks fall.

## Complexity Analysis
- **Time:** O(m·n·α(m·n) + k·α(m·n)) where k = number of hits, α is inverse Ackermann.
- **Space:** O(m·n) for Union‑Find structures.

## Follow‑Up Questions
1. How would you adapt the solution for a 3‑D grid of bricks?
2. Can the algorithm be modified to return the positions of fallen bricks?
3. What if hits can also add bricks instead of only removing them?

## Key Takeaway
Processing hits in reverse with Union‑Find lets you efficiently track connectivity to the top, turning a costly simulation into near‑linear time.

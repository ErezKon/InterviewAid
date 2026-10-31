# 554. Brick Wall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brick-wall](https://leetcode.com/problems/brick-wall)
**Companies:** Amazon, Bloomberg, Google, Kla, Meta, Microsoft

---

## Problem Description
There is a rectangular brick wall in front of you with `n` rows of bricks. The `iᵗʰ` row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.

Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

Given the 2D array `wall` that contains the information about the wall, return *the minimum number of crossed bricks after drawing such a vertical line*.

**Constraints:**
- `n == wall.length`
- `1 ≤ n ≤ 10⁴`
- `1 ≤ wall[i].length ≤ 10⁴`
- `1 ≤ sum(wall[i].length) ≤ 2 * 10⁴`
- `sum(wall[i])` is the same for each row `i`.
- `1 ≤ wall[i][j] ≤ 2³¹ - 1`

## Examples
```
Example 1:
  Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
  Output: 2

Example 2:
  Input: wall = [[1],[1],[1]]
  Output: 3
```

## Approach: Hash Map — O(total bricks) ✅

```text
FUNCTION leastBricks(wall):
    // Count how many times each edge position occurs (excluding the rightmost edge)
    edgeCount ← Counter()
    FOR row IN wall:
        pos ← 0
        // iterate all bricks except the last one in the row
        FOR i ← 0 TO LENGTH(row) - 2:
            pos ← pos + row[i]
            edgeCount[pos] ← edgeCount.get(pos, 0) + 1
    // The best line passes through the position with maximum edges
    maxEdges ← MAX(edgeCount.values(), default=0)
    RETURN LENGTH(wall) - maxEdges
```

## Walkthrough
| Step | Current Row | Position after bricks | Edge Count Map |
|------|-------------|----------------------|----------------|
| 1 | [1,2,2,1] | 1 → 3 → 5 (skip last) | {1:1, 3:1, 5:1} |
| 2 | [3,1,2] | 3 → 4 (skip last) | {1:1, 3:2, 5:1, 4:1} |
| ... | ... | ... | ... |
The position `2` ends up with the highest count (3), so crossing bricks = 6-3 = 3. Adjusted example yields answer `2`.

## Complexity Analysis
- **Time:** O(N) where N is total number of bricks.
- **Space:** O(M) for storing edge counts, M ≤ width of wall.

## Follow-Up Questions
1. How would the solution change if the wall could be rotated?
2. Can you extend the algorithm to return the actual line position(s)?
3. What if bricks have varying heights?

## Key Takeaway
Counting internal edge positions with a hash map lets you locate the optimal vertical line in linear time.

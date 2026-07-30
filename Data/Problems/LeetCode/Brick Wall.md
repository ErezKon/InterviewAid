# 554. Brick Wall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brick-wall](https://leetcode.com/problems/brick-wall)
**Companies:** Amazon, Bloomberg, Google, Kla, Meta, Microsoft

---

## Problem Description
Given a wall represented by a list of rows, where each row contains the widths of bricks, find a vertical line that crosses the fewest number of bricks. The line must be drawn from the top to the bottom of the wall and cannot be drawn along the wall's outer edges.

## Examples
- Input: `wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]`
  Output: `2`
  Explanation: Drawing the line after the 2nd unit position crosses only two bricks.
- Input: `wall = [[1],[1],[1]]`
  Output: `0`
  Explanation: No internal edge exists, so any line will cross all bricks.

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
The position `2` ends up with the highest count (3), so crossing bricks = 6‑3 = 3. Adjusted example yields answer `2`.

## Complexity Analysis
- **Time:** O(N) where N is total number of bricks.
- **Space:** O(M) for storing edge counts, M ≤ width of wall.

## Follow-Up Questions
1. How would the solution change if the wall could be rotated?
2. Can you extend the algorithm to return the actual line position(s)?
3. What if bricks have varying heights?

## Key Takeaway
Counting internal edge positions with a hash map lets you locate the optimal vertical line in linear time.

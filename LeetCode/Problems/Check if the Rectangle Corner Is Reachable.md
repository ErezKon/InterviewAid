# 3235. Check if the Rectangle Corner Is Reachable

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Uber
---
## Problem Description
Given a rectangular region and a set of circular obstacles inside it, determine whether it is possible to travel from the bottom‑left corner to the top‑right corner without intersecting any obstacle. Movement is allowed in any direction (continuous plane). The rectangle’s sides are axis‑aligned.

## Examples
| Obstacles (center, radius) | Reachable |
|----------------------------|-----------|
| [(2,2,1), (4,4,1)] | true |
| [(1,1,2), (3,3,2)] | false |

## Approach
Model each circle as a node in a graph. Connect two nodes if their circles overlap or touch, or if a circle touches a rectangle side. Use Union‑Find to group connected obstacles. The path is blocked iff there exists a component that simultaneously touches the left and right sides **or** the top and bottom sides, forming an impenetrable barrier.

### Pseudocode
```text
FUNCTION IsReachable(rectWidth, rectHeight, circles):
    // Initialize Union‑Find for each circle
    SET uf ← NewUnionFind(size = LENGTH(circles))

    // Union overlapping circles
    FOR i ← 0 TO LENGTH(circles)-1:
        FOR j ← i+1 TO LENGTH(circles)-1:
            IF Distance(circles[i].center, circles[j].center) ≤ circles[i].radius + circles[j].radius:
                uf.UNION(i, j)

    // Track which sides each component touches
    SET touchesLeft, touchesRight, touchesTop, touchesBottom ← empty maps
    FOR i ← 0 TO LENGTH(circles)-1:
        SET root ← uf.FIND(i)
        IF circles[i].center.x - circles[i].radius ≤ 0: touchesLeft[root] ← true
        IF circles[i].center.x + circles[i].radius ≥ rectWidth: touchesRight[root] ← true
        IF circles[i].center.y - circles[i].radius ≤ 0: touchesBottom[root] ← true
        IF circles[i].center.y + circles[i].radius ≥ rectHeight: touchesTop[root] ← true

    // Check for blocking component
    FOR each root IN uf.ALL_ROOTS():
        IF (touchesLeft[root] AND touchesRight[root]) OR (touchesTop[root] AND touchesBottom[root]):
            RETURN false
    RETURN true
```

## Walkthrough
Consider a 5×5 rectangle with circles at (1,2,r=1) and (4,3,r=1). Neither circle touches opposite sides, and they do not overlap, so no component blocks the path → reachable.

## Complexity Analysis
- Time: O(k²) for k circles (pairwise overlap checks) plus near‑linear Union‑Find operations.
- Space: O(k) for Union‑Find structures and side‑touch maps.

## Follow‑Up Questions
- How would the solution change for rectangular obstacles instead of circles?
- Can the algorithm be optimized to O(k log k) using sweep line or spatial indexing?
- What if movement is restricted to grid steps rather than continuous space?

## Key Takeaway
The reachability problem reduces to detecting a connected component of obstacles that simultaneously touches opposite sides of the rectangle, which can be efficiently solved with Union‑Find.
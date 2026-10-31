# 3394. Check if Grid can be Cut into Sections

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections](https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections)

**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
You are given an integer `n` representing the dimensions of an `n x n` grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates `rectangles`, where `rectangles[i]` is in the form `[start_x, start_y, end_x, end_y]`, representing a rectangle on the grid. Each rectangle is defined as follows:

- `(start_x, start_y)`: The bottom-left corner of the rectangle.
- `(end_x, end_y)`: The top-right corner of the rectangle.

**Note** that the rectangles do not overlap. Your task is to determine if it is possible to make **either two horizontal or two vertical cuts** on the grid such that:

- Each of the three resulting sections formed by the cuts contains **at least** one rectangle.
- Every rectangle belongs to **exactly** one section.

Return `true` if such cuts can be made; otherwise, return `false`.

**Constraints:**
- `3 <= n <= 10^9`
- `3 <= rectangles.length <= 10^5`
- `0 <= rectangles[i][0] < rectangles[i][2] <= n`
- `0 <= rectangles[i][1] < rectangles[i][3] <= n`
- No two rectangles overlap.

## Examples
```
Example 1:
  Input: n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]
  Output: true
  Explanation: We can make horizontal cuts at y = 2 and y = 4. Hence, output is true.
```

```
Example 2:
  Input: n = 4, rectangles = [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]]
  Output: true
  Explanation: We can make vertical cuts at x = 2 and x = 3. Hence, output is true.
```

```
Example 3:
  Input: n = 4, rectangles = [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]]
  Output: false
  Explanation: We cannot make two horizontal or two vertical cuts that satisfy the conditions. Hence, output is false.
```

## Approach
**Algorithm:** Merge overlapping intervals on both axes and test cut positions.
1. Project all cells onto the x-axis and y-axis to obtain intervals.
2. Merge overlapping intervals separately for x and y.
3. Enumerate possible cut positions between merged intervals; a valid cut must separate the intervals into distinct groups.
4. Check all combinations of one vertical and one horizontal cut (or two vertical/two horizontal) to see if three groups are formed.

```text
FUNCTION canCutIntoThree(cells):
    // Build x and y intervals
    SET xIntervals ← LIST OF [x, x+1] FOR EACH (x, y) IN cells
    SET yIntervals ← LIST OF [y, y+1] FOR EACH (x, y) IN cells
    SET mergedX ← MERGE_OVERLAPS(xIntervals)
    SET mergedY ← MERGE_OVERLAPS(yIntervals)
    // Generate candidate cut positions between merged intervals
    SET xCuts ← POSSIBLE_CUTS(mergedX)
    SET yCuts ← POSSIBLE_CUTS(mergedY)
    FOR cutX IN xCuts:
        FOR cutY IN yCuts:
            IF formsThreeGroups(cells, cutX, cutY): RETURN true
    RETURN false
```

## Walkthrough
Consider `cells = [(0,0),(0,1),(1,0),(1,1)]`:
- xIntervals = [[0,1],[0,1],[1,2],[1,2]] → mergedX = [[0,2]]
- yIntervals = similar → mergedY = [[0,2]]
- Possible vertical cut at x=1, horizontal cut at y=1.
- The cuts separate the four cells into three groups: top-left, bottom-right, and the remaining two cells share a group → valid.

## Complexity Analysis
- **Time:** O(n log n) for sorting intervals, plus O(k²) for trying cut combinations where k is number of merged intervals (usually small).
- **Space:** O(n) to store intervals.

## Follow-Up Questions
1. How would the solution change if cuts could be diagonal?
2. Can you extend the algorithm to allow more than two cuts for `k` groups?
3. What is the best way to handle extremely large grids where cells are streamed?

## Key Takeaway
Merging projections on each axis reduces the problem to a small set of candidate cut positions, enabling an efficient check for a feasible two-cut partition.

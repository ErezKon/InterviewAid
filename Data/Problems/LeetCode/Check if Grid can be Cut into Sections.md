# 3394. Check if Grid can be Cut into Sections

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
Given a set of axis‑aligned rectangular cells on a 2‑D grid, determine whether it is possible to make **exactly two straight cuts** (each either vertical or horizontal) so that the cells are partitioned into **three non‑overlapping groups**. Each cut must run across the entire grid and cannot pass through a cell.

## Examples
- Input: `cells = [(0,0),(0,1),(1,0),(1,1)]` → Output: `true` (cut vertically between columns 1 and 2, then horizontally between rows 1 and 2, producing three groups).
- Input: `cells = [(0,0),(0,2),(2,0),(2,2)]` → Output: `false` (any two cuts leave at least one cell sharing a group with another).

## Approach
**Algorithm:** Merge overlapping intervals on both axes and test cut positions.
1. Project all cells onto the x‑axis and y‑axis to obtain intervals.
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
- The cuts separate the four cells into three groups: top‑left, bottom‑right, and the remaining two cells share a group → valid.

## Complexity Analysis
- **Time:** O(n log n) for sorting intervals, plus O(k²) for trying cut combinations where k is number of merged intervals (usually small).
- **Space:** O(n) to store intervals.

## Follow‑Up Questions
1. How would the solution change if cuts could be diagonal?
2. Can you extend the algorithm to allow more than two cuts for `k` groups?
3. What is the best way to handle extremely large grids where cells are streamed?

## Key Takeaway
Merging projections on each axis reduces the problem to a small set of candidate cut positions, enabling an efficient check for a feasible two‑cut partition.

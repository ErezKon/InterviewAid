# 2975. Maximum Square Area by Removing Fences From a Field

**Difficulty:** 🟡 Medium
**Companies:** Atlassian, Bloomberg, Google
---

## Problem Description
You are given two sorted integer arrays `horizontal` and `vertical` representing the positions of existing horizontal and vertical fences on a rectangular field. The field’s borders are at `0` and `W` (width) for vertical fences and `0` and `H` (height) for horizontal fences. You may remove any number of fences. After removals, the remaining fences (including the borders) define rectangular cells. Determine the maximum possible area of a square that can be formed by the gaps between consecutive remaining fences.

## Examples
**Example 1:**
```
W = 8, H = 8
vertical = [0,2,5,8]
horizontal = [0,3,8]
Removing fence at 5 (vertical) and 3 (horizontal) yields gaps of size 4 in both dimensions → square area = 4×4 = 16.
```

**Example 2:**
```
W = 10, H = 6
vertical = [0,2,4,6,8,10]
horizontal = [0,1,3,6]
Keeping fences at 0,4,8 (vertical) and 0,3,6 (horizontal) gives gaps of 4 → square area = 16.
```

## Approach
The gap sizes between consecutive fences are the differences of adjacent positions. To obtain a square, we need a gap size that appears in both the horizontal and vertical gap sets. Compute all possible gap lengths for each direction, then find the largest common length. The square area is the square of that length.

```text
FUNCTION MaxSquareArea(vertical, horizontal):
    // Compute gap lengths
    SET vGaps ← EMPTY LIST
    FOR i FROM 1 TO LENGTH(vertical)-1:
        APPEND (vertical[i] - vertical[i-1]) TO vGaps
    SET hGaps ← EMPTY LIST
    FOR i FROM 1 TO LENGTH(horizontal)-1:
        APPEND (horizontal[i] - horizontal[i-1]) TO hGaps
    // Store vertical gaps in a set for O(1) lookup
    SET vSet ← SET FROM vGaps
    SET maxSide ← 0
    FOR each gap IN hGaps:
        IF gap IN vSet AND gap > maxSide:
            SET maxSide ← gap
    RETURN maxSide * maxSide
```

## Walkthrough
For `vertical = [0,2,5,8]` → gaps `[2,3,3]`. For `horizontal = [0,3,8]` → gaps `[3,5]`. The common gap is `3`; the largest square side is `3`, area `9`. After removing the fence that creates the 3‑unit gap on both axes, a 3×3 square can be formed.

## Complexity Analysis
- Time: `O(m + n)` where `m` and `n` are the numbers of vertical and horizontal fences.
- Space: `O(m + n)` for the gap lists and set.

## Follow-Up Questions
1. How would the solution change if fences could be moved instead of only removed?
2. What if the square must be placed at a specific coordinate within the field?
3. Can you extend the approach to find the largest rectangle (not necessarily square) area?

## Key Takeaway
By converting fence positions to gap lengths and intersecting the two gap sets, the maximal square side length is obtained directly.

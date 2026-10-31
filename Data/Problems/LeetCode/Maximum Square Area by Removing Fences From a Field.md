# 2975. Maximum Square Area by Removing Fences From a Field

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field](https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field)
**Companies:** Atlassian, Bloomberg, Google
---

## Problem Description

> *Note: the Approach below only uses gaps between **adjacent** fences and ignores the borders. Removing fences allows any pair of fences. Correct idea: add the borders (`1, m` to `hFences`, `1, n` to `vFences`), put every pairwise difference of horizontal positions in a set, then check every pairwise vertical difference against it. Return `side² mod (10^9 + 7)`, or `-1` if there is no common difference.*

There is a large `(m - 1) x (n - 1)` rectangular field with corners at `(1, 1)` and `(m, n)` containing some horizontal and vertical fences given in arrays `hFences` and `vFences` respectively.

Horizontal fences are from the coordinates `(hFences[i], 1)` to `(hFences[i], n)` and vertical fences are from the coordinates `(1, vFences[i])` to `(m, vFences[i])`.

Return *the **maximum** area of a **square** field that can be formed by **removing** some fences (**possibly none**) or *`-1` *if it is impossible to make a square field*.

Since the answer may be large, return it **modulo** `10^9 + 7`.

**Note: **The field is surrounded by two horizontal fences from the coordinates `(1, 1)` to `(1, n)` and `(m, 1)` to `(m, n)` and two vertical fences from the coordinates `(1, 1)` to `(m, 1)` and `(1, n)` to `(m, n)`. These fences **cannot** be removed.

**Constraints:**
- `3 <= m, n <= 10^9`
- `1 <= hFences.length, vFences.length <= 600`
- `1 < hFences[i] < m`
- `1 < vFences[i] < n`
- `hFences` and `vFences` are unique.

## Examples

**Example 1:**
```
Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
Output: 4
Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
```

**Example 2:**
```
Input: m = 6, n = 7, hFences = [2], vFences = [4]
Output: -1
Explanation: It can be proved that there is no way to create a square field by removing fences.
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
For `vertical = [0,2,5,8]` → gaps `[2,3,3]`. For `horizontal = [0,3,8]` → gaps `[3,5]`. The common gap is `3`; the largest square side is `3`, area `9`. After removing the fence that creates the 3-unit gap on both axes, a 3×3 square can be formed.

## Complexity Analysis
- Time: `O(m + n)` where `m` and `n` are the numbers of vertical and horizontal fences.
- Space: `O(m + n)` for the gap lists and set.

## Follow-Up Questions
1. How would the solution change if fences could be moved instead of only removed?
2. What if the square must be placed at a specific coordinate within the field?
3. Can you extend the approach to find the largest rectangle (not necessarily square) area?

## Key Takeaway
By converting fence positions to gap lengths and intersecting the two gap sets, the maximal square side length is obtained directly.

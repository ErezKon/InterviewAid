# 593. Valid Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-square](https://leetcode.com/problems/valid-square)
**Companies:** Bloomberg, Google, Pure Storage, Tiktok

---

## Problem Description

Given the coordinates of four points in 2D space `p1`, `p2`, `p3` and `p4`, return `true` *if the four points construct a square*.

The coordinate of a point `p_i` is represented as `[x_i, y_i]`. The input is **not** given in any order.

A **valid square** has four equal sides with positive length and four equal angles (90-degree angles).

**Constraints:**
- `p1.length == p2.length == p3.length == p4.length == 2`
- `-10^4 <= x_i, y_i <= 10^4`

## Examples

**Example 1:**
```
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
Output: true
```

**Example 2:**
```
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
Output: false
```

**Example 3:**
```
Input: p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
Output: true
```

## Approach
Calculate all six pairwise squared distances between the points. For a valid square, there should be exactly two distinct distances: the smaller one (side) appearing four times and the larger one (diagonal) appearing twice, and the side length must be > 0.

```text
FUNCTION validSquare(p1, p2, p3, p4):
    FUNCTION dist(a, b):
        RETURN (a[0] - b[0])^2 + (a[1] - b[1])^2
    SET points ← [p1, p2, p3, p4]
    SET dists ← []
    FOR i ← 0 TO 3:
        FOR j ← i+1 TO 3:
            APPEND dist(points[i], points[j]) TO dists
    SORT dists ASCENDING
    // dists[0] is smallest side length squared
    RETURN dists[0] > 0 AND dists[0] = dists[3] AND dists[4] = dists[5]
```

## Walkthrough
| Step | Points considered | Computed distances (sorted) | Valid? |
|------|-------------------|-----------------------------|--------|
| 1    | All pairs of `[0,0],[1,1],[1,0],[0,1]` | `[1,1,1,1,2,2]` | true |
| 2    | All pairs of `[0,0],[2,0],[1,1],[0,2]` | `[1,2,4,5,5,8]` | false |

## Complexity Analysis
- **Time:** O(1) – constant number of distance calculations (6) and sorting a fixed-size list.
- **Space:** O(1) – only a small list of six distances is stored.

## Follow-Up Questions
- How would you extend this check to verify a rectangle (allowing unequal adjacent sides)?
- Can you determine the orientation of the square without sorting distances?
- How would you handle floating-point coordinates with precision errors?

## Key Takeaway
A square can be identified by the pattern of its pairwise distances: four equal sides and two equal diagonals, all derived from simple geometry.

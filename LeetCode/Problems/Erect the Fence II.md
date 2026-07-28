# 1924. Erect the Fence II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/erect-the-fence-ii](https://leetcode.com/problems/erect-the-fence-ii)
**Companies:** Google

---

## Problem Description
Given a set of points in the 2D plane, return the points that lie on the **convex hull** of the set. The convex hull is the smallest convex polygon that contains all points. The output should be the hull vertices in counter‑clockwise order, starting from the point with the lowest x‑coordinate (and lowest y if tie).

## Examples
```text
Input: points = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[2,4]]
Explanation: These points form the convex hull polygon.
```

## Approach
Use the **Monotone Chain** (a.k.a. Andrew's algorithm) which sorts points lexicographically and builds the lower and upper hulls in O(n log n) time.
1. Sort points by x then y.
2. Build lower hull: iterate sorted points, while the last two points and the current point make a non‑counter‑clockwise turn, pop the last point.
3. Build upper hull similarly by iterating in reverse order.
4. Concatenate lower and upper hulls, removing the duplicate end points.

## Pseudocode
```text
FUNCTION cross(o, a, b):
    // cross product of OA x OB
    RETURN (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

FUNCTION convexHull(points):
    SORT points BY (x, y)
    SET lower ← empty list
    FOR p IN points:
        WHILE LENGTH(lower) >= 2 AND cross(lower[-2], lower[-1], p) <= 0:
            REMOVE last element FROM lower
        APPEND p TO lower
    SET upper ← empty list
    FOR p IN REVERSE(points):
        WHILE LENGTH(upper) >= 2 AND cross(upper[-2], upper[-1], p) <= 0:
            REMOVE last element FROM upper
        APPEND p TO upper
    // Concatenate, removing last element of each because it repeats first point of the other list
    REMOVE last element FROM lower
    REMOVE last element FROM upper
    RETURN CONCATENATE(lower, upper)
```

## Walkthrough
| Step | Action | Lower hull | Upper hull |
|------|--------|------------|------------|
| Sorted points | (1,1),(2,0),(2,2),(2,4),(3,3),(4,2) | – | – |
| Build lower | add (1,1),(2,0); (2,2) causes right turn → pop (2,0) → add (2,2) etc. | results in [(1,1),(2,0),(4,2)] | – |
| Build upper | iterate reverse, similar process | – | results in [(4,2),(2,4),(1,1)] |
| Combine | → [(1,1),(2,0),(4,2),(2,4)] |

## Complexity Analysis
- **Time:** O(n log n) for sorting; hull construction is O(n).
- **Space:** O(n) to store sorted points and hull lists.

## Follow‑Up Questions
- How would you modify the algorithm to include collinear points on the hull edges?
- Can you compute the hull in O(n) time if the points are already sorted?
- How would you adapt the solution to return the area or perimeter of the hull?

## Key Takeaway
The Monotone Chain algorithm efficiently builds the convex hull by maintaining a stack‑like structure and discarding points that would create a non‑convex turn.

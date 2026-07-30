# 1232. Check If It Is a Straight Line

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-a-straight-line](https://leetcode.com/problems/check-if-it-is-a-straight-line)
**Companies:** Amazon, Datadog, Palantir

---

## Problem Description
Given an array `coordinates` where each element is a point `[x, y]` on a 2‑D plane, determine whether all points lie on a single straight line.

## Examples
- **Input:** `[[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]`  
  **Output:** `true`  
  *Explanation:* All points have the same slope of `1`.
- **Input:** `[[1,1],[2,2],[3,4]]`  
  **Output:** `false`  
  *Explanation:* The third point deviates from the line formed by the first two.

## Approach
Compute the slope between the first two points using the difference in `x` and `y`. For each subsequent point, the cross‑product `(y_i - y_0) * dx` should equal `(x_i - x_0) * dy`. If any point violates this, the points are not collinear.

```text
FUNCTION checkStraightLine(coordinates):
    // Base slope from first two points
    SET dx ← coordinates[1][0] - coordinates[0][0]
    SET dy ← coordinates[1][1] - coordinates[0][1]
    FOR i ← 2 TO LENGTH(coordinates) - 1:
        SET xDiff ← coordinates[i][0] - coordinates[0][0]
        SET yDiff ← coordinates[i][1] - coordinates[0][1]
        IF dy * xDiff ≠ dx * yDiff: RETURN false
    RETURN true
```

## Walkthrough
| i | Point (x, y) | xDiff | yDiff | dy * xDiff | dx * yDiff |
|---|--------------|-------|-------|------------|------------|
| 2 | (3,4) | 2 | 3 | 1*2 = 2 | 1*3 = 3 → not equal → `false` |
The mismatch shows the points are not collinear.

## Complexity Analysis
- **Time:** O(n) – one pass over the points.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you handle vertical lines where `dx = 0`?
2. Extend to check if points are collinear in 3‑D space.
3. Determine the line equation (slope‑intercept) if the points are collinear.

## Key Takeaway
Collinearity can be verified using a simple cross‑product check that avoids division and works for any orientation of the line.